import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import axiosHeader from "../../../api/axiosHeader";
import Navbar from "../../menu/NavBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { EquipoList } from "../usuario/EquipoList";

export default function MisEquipos() {
  const [page, setPage] = React.useState(1);
  const [teams, setTeams] = React.useState(null);
  const [length, setLength] = React.useState(0);
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    axiosHeader.get(`/users/id/${userId}/teams`)
    .then( response => {
        let teams = response.data;
        setLength(Math.ceil(teams.length / 10));
        axiosHeader
          .get(`/users/id/${userId}/teams/page/${page}`)
          .then((response) => {
            setTeams(response.data);
          })
          .catch((error) => {
            alert(error);
          });}
    ).catch(error => {
        alert(error);
    });
    
  }, [page]);

  return (
    <>
      <Navbar />
      <Container>
        <Box p={2}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">Mis Equipos</Typography>
            <hr />
          </div>
          <div
            style={{ margin: "auto", width: "70%", justifyContent: "center" }}
          >
            <Pagination
              showFirstButton
              showLastButton
              count={length}
              page={page}
              onChange={handleChange}
            />

            {teams ? (
              teams.length > 0 ? (
                <EquipoList teams={teams} />
              ) : (
                <div style={{ textAlign: "center", paddingTop: "30px" }}>
                  <Typography variant="h6">
                    Aún no tienes equipos, agrega algunos en "Crear Equipos"
                    desde el menú.
                  </Typography>
                </div>
              )
            ) : (
              <div style={{ textAlign: "center" }}>
                <CircularProgress />
                Cargando...
              </div>
            )}
          </div>
        </Box>
      </Container>
    </>
  );
}
