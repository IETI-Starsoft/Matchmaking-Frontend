import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import { updateGroupActivity } from "../../api/activity"
import { updateActivitiesUser, validateCreditsUser } from "../../api/user"
import {updateActivitiesTeam,validateCreditsTeam} from "../../api/team"
import { betTeamToActivity } from "../../api/payments"
import SeleccionarEquipo from "../crear_actividad/seleccionarEquipo"

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
    list: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        maxHeight: 230,
        border: 'groove',
        borderRadius: '5px' 
    },
    labelEquipo: {
        marginLeft: "22%",
        [theme.breakpoints.up(600)]: {
            marginLeft: "18%"
        },
    },
}));


export default function DialogAceptarActividadGrupo(props) {
    let user = JSON.parse(localStorage.getItem("user"));
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [checked, setChecked] = React.useState([]);

    const changeChecked = (value) => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            if (checked.length === 0) {
                newChecked.push(value);
                setChecked(newChecked);
            }   
        }
        else {
            newChecked.splice(currentIndex, 1);
            setChecked(newChecked);
        }
    }

    const handleClickOpen = () => {
        if (props.teams.length == 0) alert("Debes tener al menos un team para poder aceptar esta actividad")
        else setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () => {
        if (checked.length==1) {
            setOpen(false)
            validateActivity();
        }
        else alert("Debes seleccionar un equipo para poder aceptar el match")
        
    }

    const validateActivity = () => {
        if (props.activity.bet != 0) {
            validateCreditsTeam(props.activity.bet,checked[0].teamId, makePayment)
        }
        else {
            matchActivity(); //Actualiza el team 2 de la actividad
            updateActivitiesTeam(props.activity.id,checked[0]).then(() => {//Actualiza la lista de actividades del team
                confirmActivity();
            });
        }
    }

    const matchActivity = () => {
        props.activity.idTeam2 = checked[0].teamId;
        props.activity.state = "Aceppted"
        updateGroupActivity(props.activity);//Actualiza el team2 de la actividad
    }

    const makePayment = userId => {
        matchActivity();
        betTeamToActivity(props.activity.bet, props.activity.id,checked[0].teamId).then//Realiza el pago 
            (() => {
                checked[0].credits -= props.activity.bet;
                updateActivitiesTeam(props.activity.id,checked[0]).then(() => {//Actualiza la lista de actividades
                    confirmActivity();
                });
            });
    }

    const confirmActivity = () => {
        props.getAllActivities();
        alert("Ha aceptado el match con exito.");
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
                <SeleccionarEquipo checked={checked} changeChecked={changeChecked} classes={classes} teams={props.teams} label="Selecciona el equipo para el match" />
               
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
