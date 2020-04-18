import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import axiosHeader from "../../../api/axiosHeader";
import { AmigoList } from "../usuario/AmigoList";
import Navbar from "../../menu/NavBar";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function MisAmigos() {
  const [page, setPage] = React.useState(1);
  const [friends, setFriends] = React.useState(null);
  const [length, setLength] = React.useState(0);

  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setLength(Math.ceil(user.friends.length / 10));
    setFriends(null);
    axiosHeader
      .get(`/users/id/${user.userId}/friends/page/${page}`)
      .then((response) => {
        setFriends(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [page]);

  return (
    <>
      <Navbar />
      <Container>
        <Box p={2}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">Mis Amigos</Typography>
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

            {friends ? (
              friends.length > 0 ? (
                <AmigoList friends={friends}></AmigoList>
              ) : (
                <div style={{ textAlign: "center", paddingTop: "30px" }}>
                    <Typography variant="h6">Aún no tienes amigos, agrega algunos en "Añadir amigos" desde el menú.</Typography>
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
