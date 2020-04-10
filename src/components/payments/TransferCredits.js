import React, { useEffect } from "react";
import NavBar from "../menu/NavBar";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Grid,
  Button,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "../Perfil/usuario/TabPanel";
import { AmigoList } from "./transfer/AmigoList";
import { EquipoList } from "./transfer/EquipoList";
import { useTheme } from "@material-ui/core";
import ContactsIcon from "@material-ui/icons/Contacts";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import axiosHeader from "../../api/axiosHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../../resources/css/animation.css";


function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const userProfileStyles = makeStyles((theme) => ({
  tabs: {
    flexGrow: 1,
    width: "65%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "20px",
    margin: "auto",
  },
}));

export default function TransferCredits() {
  const theme = useTheme();
  const classes = userProfileStyles();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState(null);
  const [rating, setRating] = React.useState(0);
  const [friends, setFriends] = React.useState(null);
  const [teams, setTeams] = React.useState(null);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setName(user.firstName.toUpperCase() + " " + user.lastName.toUpperCase());
    setRating(user.rating);
    axiosHeader
      .get("/users/id/" + user.userId + "/friends")
      .then(function (response) {
        setFriends(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axiosHeader
      .get("/users/id/" + user.userId + "/teams")
      .then(function (response) {
        setTeams(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <NavBar />
      <Container>
        <div style={{ textAlign: "center" }}>
          <Typography variant="h2" className="animated fadeIn fast"> Transferir Créditos</Typography>
        </div>
        <Box p={1}>
          <div className={classes.tabs}>
            <AppBar position="static" color="default" className="animated fadeIn fast">
              <Tabs
                value={value}
                onChange={handleChange}
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
                centered
              >
                <Tab label="Amigos" icon={<ContactsIcon />} {...a11yProps(0)} />
                <Tab
                  label="Equipos"
                  icon={<GroupWorkIcon />}
                  {...a11yProps(1)}
                />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} className="animated fadeIn fast">
              {friends ? (
                friends.length != 0 ? (
                  <AmigoList friends={friends} />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    Necesitas al menos un amigo para transferir créditos,
                    ¡agrega uno!
                    <hr />
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Agregar amigo
                    </Button>
                  </div>
                )
              ) : (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                  Cargando...
                </div>
              )}
            </TabPanel>
            <TabPanel value={value} index={1} className="animated fadeIn fast">
              {teams ? (
                teams.length != 0 ? (
                  <EquipoList teams={teams} />
                ) : (
                  <div style={{ textAlign: "center" }}>
                    Necesitas al menos un equipo para transferir créditos, ¡crea
                    uno!
                    <hr />
                    <Button
                      variant="contained"
                      color="primary"
                      href="/crear-equipo"
                      fullWidth
                      style={{ color: "white", textDecoration: "none" }}
                    >
                      Crear equipo
                    </Button>
                  </div>
                )
              ) : (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress />
                  Cargando...
                </div>
              )}
            </TabPanel>
          </div>
        </Box>
      </Container>
    </>
  );
}
