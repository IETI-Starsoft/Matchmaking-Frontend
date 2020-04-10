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
import axiosHeader from '../../api/axiosHeader';


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

export default function DialogAceptarActividad({ props }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAccept = () =>{
        setOpen(false)
        axiosHeader.get("/activities/"+props.id)
        .then(response => {
            updateIndividualActivity(response.data);
        })
        .catch(function (error) {
            console.log(error);
          });
    }

    const handleCredit = value => {
        let user = JSON.parse(localStorage.getItem("user"));
        let creditosAct = user.credits;
        user.credits = creditosAct - value;
        localStorage.setItem("user", JSON.stringify(user));
      }; 

    const betUserToActivity = (credits,activityId) => {
        let userId =  JSON.parse(localStorage.getItem("user")).userId
        axiosHeader.put("/payments/user/"+ userId
        + "/activity/" + activityId + "/amount/" + credits)
            .then(response =>{
                handleCredit(credits);
            })
            .catch(function (error) {
              alert("error bet activity")
              console.log(error);
            });
      }

    const updateOwnerUser = (idActivity) =>{
        let user = JSON.parse(localStorage.getItem("user"));
        var act = user.activities; 
        act.push(idActivity);
        axiosHeader.put("/users", {
          userId: user.userId, firstName: user.firstName,
          lastName: user.lastName, email: user.email,
          password: user.password, imageFileURL: user.imageFileURL,
          rating: user.rating, credits: user.credits,
          friends: user.friends, teams: user.teams,
          activities: act
        }).then(response =>{
          localStorage.setItem("user", JSON.stringify(response.data));
        }).catch(function (error) {
          console.log(error);
        });
      }

    const updateIndividualActivity = (activity) => {
        axiosHeader.put("/activities", {
            typ: "IndividualActivity",id: activity.id,date: activity.date,
            publicationDate: activity.publicationDate, bet: activity.bet,
            description: activity.description, type: activity.type,
            location: activity.location, credits: activity.credits, 
            state: "Aceppted", owner: activity.owner,
            idPlayer1: activity.idPlayer1,
            idPlayer2:  JSON.parse(localStorage.getItem("user")).userId
        }).then(response => {
            console.log(response.data)
            betUserToActivity(activity.bet,response.data.id);
            updateOwnerUser(response.data.id);
        })
        .catch(function (error) {
            console.log(error);
        });
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
