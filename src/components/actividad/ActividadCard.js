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
import DialogAceptarActividadIndividual from './DialogAceptarActividadIndividual';
import DialogAceptarActividadGrupo from "./DialogAceptarActividadGrupo";
import axiosHeader from '../../api/axiosHeader';
import PersonIcon from '@material-ui/icons/Person';
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
}));

export function ActividadCard(props) {
  const [onwerPlayer, setOnwerPlayer] = React.useState("");
  const owner = (userId,path) => {
    axiosHeader.get(path + userId)
      .then(response => {
        var player = ""; 
        if (path == "/users/id/") player= response.data.firstName + " " + response.data.lastName;  
        else player = response.data.name;
        setOnwerPlayer(player);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  const classes = useStyles();
  owner(props.activity.idPlayer1 != undefined ? props.activity.idPlayer1: props.activity.idTeam1
  ,props.activity.idPlayer1 != undefined ? "/users/id/": "/team/");

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" style={{backgroundColor: props.activity.idTeam1 != null ? "red" : "green"}}>
               {props.activity.idTeam1 != null ? <GroupIcon/>  :<PersonIcon />}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Activity"
          subheader={props.activity.date}
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
          {onwerPlayer} <br />
            Descripcion:{props.activity.description}<br />
            Apuesta: {props.activity.bet}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {props.activity.idTeam1 != null ? <DialogAceptarActividadGrupo activity={props.activity} teams={props.teams}/> 
          : <DialogAceptarActividadIndividual activity={props.activity} />}
          <ModalMasInfo activity={props.activity}  onwerPlayer = {onwerPlayer}/>
          <IconButton />

        </CardActions>

      </Card>

    </div>
  );

}

