import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import vs from "./vs.jpg";
import ModalMasInfo from './ModalMasInfo'
import DialogAceptarActividad from './DialogAceptarActividad';

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
          <DialogAceptarActividad  props={props}/>
          <ModalMasInfo props={props} />
          <IconButton />

        </CardActions>

      </Card>
      
    </div>
  );

}

