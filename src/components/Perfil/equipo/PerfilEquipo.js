import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Box,
  Typography,
  Avatar
} from "@material-ui/core";
import NavBar from "../../menu/NavBar";
import Rating from "@material-ui/lab/Rating";
import Integrante from "./Integrante";
import axiosHeader from "../../../api/axiosHeader";

const teamImage =
  "https://www.pinclipart.com/picdir/middle/14-148399_employee-self-serve-portal-transparent-team-icon-png.png";

const teamProfileStyles = makeStyles(theme => ({
  top: {
    backgroundColor: "#333333",
    borderColor: "black",
    borderBottomWidth: "1px"
  },
  topContent: {
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
    padding: 20
  },
  avatar: {
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  nameTop: {
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "600"
  },
  centerContainer: {
    textAlign: "center"
  }
}));

export default function PerfilEquipo(props) {
  const classes = teamProfileStyles();
  const [team, setTeam] = React.useState({});
  const teamId = window.location.pathname.split("/")[2];
  const [teamMembers, setTeamMembers] = React.useState([]);
  const [rating,setRating]=React.useState(0);
  useEffect(() => {
    axiosHeader
      .get(`/team/${teamId}`)
      .then(function(response) {
        console.log(response.data.rating);
        setTeam(response.data);
        setRating(response.data.rating);
      })
      .catch(function(error) {
        console.log(error);
      });
    axiosHeader
      .get(`/team/${teamId}/members`)
      .then(function(response) {
        setTeamMembers(response.data);
        console.log(response.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <Box className={classes.top} borderBottom={1}>
        <Box className={classes.topContent}>
          <Avatar className={classes.avatar} src={teamImage} />
        </Box>
        <Box className={classes.centerContainer}>
          <Typography className={classes.nameTop}>{team.name}</Typography>
          <Rating value={rating} readOnly />
          <Typography variant="body1" style={{color: "#FFFFFF"}}>Créditos: {team.credits}</Typography>
        </Box>
      </Box>
      <Container>
        <Box p={2} textAlign="center">
          <Typography variant="h4">Integrantes</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justify="center" spacing={1}>
                {teamMembers.map((member, i) => (
                  <Grid key={i} item>
                    <Paper>
                      <Integrante
                        teamId={teamId}
                        userId={member.userId}
                        name={
                          member.firstName.toUpperCase() +
                          " " +
                          member.lastName.toUpperCase()
                        }
                        stars={member.rating}
                      />
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}
