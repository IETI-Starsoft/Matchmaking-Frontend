import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import EquipoForm from "./EquipoForm";
import ParticipantesForm from "./ParticipantesForm";
import Menu from "../menu/NavBar";
import axios from "axios";
import axiosHeader from "./../../api/axiosHeader";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const team = {
  name: "",
  Captain: "",
  members:[]
};


const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3)
    }
  },
  stepper: {
    padding: theme.spacing(3, 0, 5)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1)
  }
}));

const steps = [
  "Nombre Equipo",
  "Invitacion Participantes"
];


function getStepContent(step) {
  switch (step) {
    case 0:
      return <EquipoForm props={handleNameTeam} />;
    case 1:
      return <ParticipantesForm handleAddMemberTeam={handleAddMemberTeam} />;
    default:
      throw new Error("Unknown step");
  }
}


function handleAddMemberTeam(member, seleccionado) {
  if (seleccionado) {
    team.members.push(member.userId);
    console.log(team.members);
  } else {
    var i = team.members.indexOf(member.userId);
    if (i !== -1) {
      team.members.splice(i, 1);
    }
    console.log(team.members);
  }
}
function handleNameTeam(n) {
  team.name = n;
}

export default function Checkout() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {

    if (activeStep == 1) {
      console.log(JSON.parse(localStorage.getItem("user")).userId)
      axiosHeader.post("/team", {
        members: team.members,
        captainId: JSON.parse(localStorage.getItem("user")).userId,
        credits: 0,
        name: team.name,
        activities: [],
        nRating:0,
        rating:0.0
      })
        .then(function (response) {
          console.log(response.data);
          setActiveStep(activeStep + 1);
          let user=JSON.parse(localStorage.getItem("user"));
          user.teams.push(response.data.teamId);
          localStorage.setItem("user",JSON.stringify(user));

        })
        .catch(function (error) {
          alert("Error in registering user " + error);
        });
    } else {
      setActiveStep(activeStep + 1);
    }

    //console.log(team)
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <React.Fragment>
      <CssBaseline />

      <Menu />

      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Crear Equipo
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel
                  id={label}
                >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Equipo creado
                </Typography>
                <Typography variant="subtitle1">
                  Tu equipo esta ahora en "mis equipos", podras ir a editarlo
                  cuando lo necesites y participar en los match team.
                </Typography>
              </React.Fragment>
            ) : (
                <React.Fragment>
                  {getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Crear Equipo" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </React.Fragment>
  );
}
