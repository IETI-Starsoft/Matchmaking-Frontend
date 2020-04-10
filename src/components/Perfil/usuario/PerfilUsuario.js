import React, { useEffect } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { Card, CardContent, Container, Grid } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import SwipeableViews from "react-swipeable-views";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core";
import TabPanel from "./TabPanel";
import { AmigoList } from "./AmigoList";
import { EquipoList } from "./EquipoList";
import NavBar from "../../menu/NavBar";
import axiosHeader from "../../../api/axiosHeader";
import "../../../resources/css/animation.css";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import ContactsIcon from "@material-ui/icons/Contacts";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import GradeIcon from "@material-ui/icons/Grade";
import DarkBackground from "../../../resources/images/dark.jpg";

const userProfileStyles = makeStyles((theme) => ({
  top: {
    //backgroundImage: `url(${DarkBackground})`,
    backgroundColor: "#a0bceb",
    borderColor: "black",
    borderBottomWidth: "1px",
  },
  topContent: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: 20,
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15),
  },
  nameTop: {
    fontSize: 20,
    //color: "#FFFFFF",
    fontWeight: "600",
  },
  centerContainer: {
    textAlign: "center",
    paddingBottom: "10px",
  },
  tabs: {
    flexGrow: 1,
    width: "65%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: "20px",
    margin: "auto",
  },
  center: {
    justifyContent: "center",
    textAlign: "center",
  },
}));

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const labels = {
  0: "No tienes calificación",
  1: "!No te desanimes¡",
  2: "¡Sigue ganando actividades!",
  3: "¡Vas bien!",
  4: "¡Excelente!",
  5: "¡Increíble!",
};

const tmpImage =
  "data:image/png;base64,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   ";
const teamImage =
  "https://www.pinclipart.com/picdir/middle/14-148399_employee-self-serve-portal-transparent-team-icon-png.png";

export default function PerfilUsuario() {
  const classes = userProfileStyles();
  const [value, setValue] = React.useState(0);
  const [name, setName] = React.useState(null);
  const [bio, setBio] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [friends, setFriends] = React.useState([]);
  const [teams, setTeams] = React.useState([]);
  const [image, setImage] = React.useState(tmpImage);

  useEffect(() => {
    let user = JSON.parse(localStorage.getItem("user"));
    setName(user.firstName.toUpperCase() + " " + user.lastName.toUpperCase());
    setRating(user.rating);
    setBio(user.bio);
    axiosHeader.get("/users/id/" + user.userId).then(function (response) {
      if (
        response.data.imageFileURL != "" ||
        response.data.imageFileURL != null
      ) {
        axiosHeader
          .get("/files/" + user.userId + "/" + response.data.imageFileURL, {
            responseType: "arraybuffer",
          })
          .then((response) => {
            let data = new Uint8Array(response.data);
            let raw = String.fromCharCode.apply(null, data);
            let base64 = btoa(raw);
            setImage("data:image;base64," + base64);
          });
      }
    });

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

  return (
    <div>
      <NavBar />
      <Box
        className={[classes.top, "animated", "fadeIn", "fast"]}
        borderBottom={1}
      >
        <Box className={classes.topContent}>
          <Avatar className={classes.avatar} src={image} />
        </Box>
        <Box className={classes.centerContainer}>
          <Typography className={classes.nameTop}>{name}</Typography>
        </Box>
      </Box>

      <Container>
        <div className={classes.tabs}>
          <AppBar
            className="animated fadeIn fast"
            position="static"
            color="default"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Bio" icon={<PermIdentityIcon />} {...a11yProps(0)} />
              <Tab
                label="Mi Calificación"
                icon={<GradeIcon />}
                {...a11yProps(1)}
              />
              <Tab label="Amigos" icon={<ContactsIcon />} {...a11yProps(2)} />
              <Tab label="Equipos" icon={<GroupWorkIcon />} {...a11yProps(3)} />
            </Tabs>
          </AppBar>
          <TabPanel className="animated fadeIn fast" value={value} index={0}>
            <div className={classes.center}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  Sobre <b>{name}</b>
                </Grid>
                <Grid item xs={8}>
                    {bio ? bio: "¡Agrega información sobre tí editando tu perfil!"}
                </Grid>
              </Grid>
            </div>
          </TabPanel>
          <TabPanel className="animated fadeIn fast" value={value} index={1}>
            <div className={classes.center}>
              <Rating name="hover-feedback" value={rating} readOnly size="large" />
              {rating !== null && <Box ml={2}>{labels[rating]}</Box>}
            </div>
          </TabPanel>
          <TabPanel className="animated fadeIn fast" value={value} index={2}>
            <div className={classes.center}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  Tienes <b>{friends.length}</b> amigo(s)
                </Grid>
                {friends.length == 0 ? 
                  <Grid item xs={8}> 
                    Aún no tienes amigos, ¡agrega algunos!
                    <Button variant="contained" color="primary" fullWidth>
                      Agregar amigos
                    </Button>
                  </Grid> 
                  :
                  <Grid item xs={8}>
                    Algunos de tus amigos ...
                    <AmigoList friends={friends.slice(0,4)}/>
                    <Button variant="contained" color="primary" fullWidth>
                      Ver más ...
                    </Button>
                  </Grid>
                }
              </Grid>
            </div>
          </TabPanel>
          <TabPanel className="animated fadeIn fast" value={value} index={3}>
          <div className={classes.center}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  Estas en <b>{teams.length}</b> equipo(s)
                </Grid>
                {
                  teams.length == 0 ? 
                  <Grid item xs={8}>
                    No estas en ningún equipo, ¡crea uno!
                    <Button variant="contained" color="primary" href="/crear-equipo" fullWidth style={{color: "white", textDecoration:"none"}}>
                      Crear equipo
                    </Button>
                  </Grid>
                  :
                  <Grid item xs={8}>
                    Algunos de tus equipos ...
                    <EquipoList teams={teams.slice(0,4)}/>
                    <Button variant="contained" color="primary" fullWidth>
                      Ver más ...
                    </Button>
                  </Grid>
                }
              </Grid>
            </div>
          </TabPanel>
        </div>
      </Container>
    </div>
  );
}
