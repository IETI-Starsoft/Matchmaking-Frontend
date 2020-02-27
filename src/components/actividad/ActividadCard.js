import React from 'react';
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import vs from "./vs.jpg";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ModalMasInfo from './ModalMasInfo'

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
const useStyless = makeStyles({
  item: {
    minWidth: "350px",
    margin: "1em",
    boxSizing: "border-box"
  },
  media: {
    minWidth: "200px"
  }
});
export function ActividadCard({ props }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {props.Retador[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.NombreActividad}
          subheader={props.Fecha}
        />
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={vs}
          title="Contemplative Reptile"
        />

        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.Retador}<br />
            Descripcion:{props.Descripcion}<br />
            Apuesta: {props.Apuesta}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
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
                Descripcion:{props.Descripcion}<br />
                Apuesta: {props.Apuesta}
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
            <ModalMasInfo props={props} />
          <IconButton />

        </CardActions>

      </Card>
      
    </div>
  );

}

