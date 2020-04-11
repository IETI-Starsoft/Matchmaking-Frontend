import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import { updateIndividualActivity } from "../../api/activity"
import { updateActivitiesUser, validateCreditsUser } from "../../api/user"
import { betUserToActivity } from "../../api/payments"
import GroupIcon from '@material-ui/icons/Group';

const useStyles = makeStyles(theme => ({
    root: {
        maxWidth: "300px",
        minWidth: "30px",
        margin: "1em",
        boxSizing: "border-box"
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: red[500],
    },
}));

export default function DialogAceptarActividadIndividual({ props }) {
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
        setOpen(false)
        validateIndividualActivity();
    }
    
    const validateIndividualActivity = () => {
        if (props.bet != 0) {
            validateCreditsUser(props.bet, JSON.parse(localStorage.getItem("user")).userId, makePaymentUserActivity)
        }
        else {
            matchIndividualActivity(); //Actualiza el player 2 de la actividad
            updateActivitiesUser(props.id).then(() => {//Actualiza la lista de actividades del usuario
                confirmActivity();                   
            });
        }
    }

    const matchIndividualActivity = () =>{
        props.idPlayer2 =  JSON.parse(localStorage.getItem("user")).userId;
        updateIndividualActivity(props);//Actualiza el player2 de la actividad
    }

    const makePaymentUserActivity = userId => {
        matchIndividualActivity();
        betUserToActivity(props.bet, props.id).then//Realiza el pago 
            (() => {
                updateActivitiesUser(props.id).then(() => {//Actualiza la lista de actividades
                    confirmActivity();                   
                });
            });
    }

    const confirmActivity = () =>{
        alert("Ha aceptado el match con exito.");
        window.location.href = "/buscar-match";
    }

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
                <DialogTitle id="alert-dialog-title">{"¿Esta seguro que desea aceptar este match?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Descripcion:{props.description}<br />
                Apuesta: {props.bet}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleAccept} color="primary" >
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
            >
            </IconButton>

        </div>
    )

}
