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
                    <Button onClick={handleClose} color="primary" autoFocus>
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
