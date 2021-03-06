import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import clsx from "clsx";
import { updateIndividualActivity } from "../../api/activity";
import { updateActivitiesUser, validateCreditsUser } from "../../api/user";
import { betUserToActivity } from "../../api/payments";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "300px",
    minWidth: "30px",
    margin: "1em",
    boxSizing: "border-box",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function DialogAceptarActividadIndividual(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAccept = () => {
    setOpen(false);
    validateActivity();
  };

  const validateActivity = () => {
    if (props.activity.bet != 0) {
      validateCreditsUser(
        props.activity.bet,
        JSON.parse(localStorage.getItem("user")).userId,
        makePayment
      );
    } else {
      matchActivity().then(() => {
        updateActivitiesUser(props.activity.id).then(() => {
          //Actualiza la lista de actividades del usuario
          confirmActivity();
        });  
      }); //Actualiza el player 2 de la actividad
    }
  };

  const matchActivity = async () => {
    props.activity.idPlayer2 = JSON.parse(localStorage.getItem("user")).userId;
    props.activity.state = "Accepted";
    return updateIndividualActivity(props.activity); //Actualiza el player2 de la actividad
  };

  const makePayment = (userId) => {
    matchActivity().then(() => {
      betUserToActivity(props.activity.bet, props.activity.id).then(
        //Realiza el pago
        () => {
          updateActivitiesUser(props.activity.id).then(() => {
            //Actualiza la lista de actividades
            confirmActivity();
          });
        }
      );
    });
  };

  const confirmActivity = () => {
    props.handleChangeFiltros(props.filtro);
    alert("Ha aceptado el match con exito.");
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Button size="small" color="primary" onClick={handleClickOpen}>
        Aceptar
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"¿Esta seguro que desea aceptar este match?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Descripcion:{props.activity.description}
            <br />
            Apuesta: {props.activity.bet}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleAccept} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton
        className={clsx(classes.expand, {
          [classes.expandOpen]: expanded,
        })}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      ></IconButton>
    </div>
  );
}
