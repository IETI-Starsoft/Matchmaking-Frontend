import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));

export default function ModalMasInfo({ props, onwerPlayer }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button  color="primary" onClick={handleClickOpen}>
                Mas Informacion
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="max-width-dialog-title"
            >
                <DialogTitle id="max-width-dialog-title"><b>{props.NombreActividad}</b></DialogTitle>
                <DialogContent >
                    
                    <DialogContentText>
                    <b>Retador:</b> {onwerPlayer} <br/>
                    <b>Tipo De Actividad:</b>{props.type}<br/>
                    <b>Descripcion:</b> {props.description}.<br/>
                    <b>Lugar:</b>  {props.location}<br/>
                    <b>Fecha:</b> {props.date}<br/>
                    <b>Fecha De Publicacion:</b> {props.publicationDate}<br/>
                    <b>Apuesta:</b> {props.bet}<br/>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
          </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}



