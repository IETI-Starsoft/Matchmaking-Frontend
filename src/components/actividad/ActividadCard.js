import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import vs from "./vs.jpg";
import ModalMasInfo from "./ModalMasInfo";
//import DialogAceptarActividad from "./DialogAceptarActividad";
import axiosHeader from "../../api/axiosHeader";

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
const useStyless = makeStyles({
  item: {
    minWidth: "350px",
    margin: "1em",
    boxSizing: "border-box",
  },
  media: {
    minWidth: "200px",
  },
});

export function ActividadCard({ props, ModalAceptar }) {
  const [onwerPlayer, setOnwerPlayer] = React.useState("");
  const owner = (userId, path) => {
    axiosHeader
      .get(path + userId)
      .then((response) => {
        var player = "";
        if (path == "/users/id/")
          player = response.data.firstName + " " + response.data.lastName;
        else player = response.data.name;
        setOnwerPlayer(player);
      })
      .catch(function (error) {
        console.log(error);
        return null;
      });
  };
  const classes = useStyles();
  owner(
    props.idPlayer1 != undefined ? props.idPlayer1 : props.idTeam1,
    props.idPlayer1 != undefined ? "/users/id/" : "/team/"
  );

  return (
    <div>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              {onwerPlayer[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="Activity"
          subheader={props.date}
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
            Descripcion:{props.description}
            <br />
            Apuesta: {props.bet}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {ModalAceptar}
          <ModalMasInfo props={props} onwerPlayer={onwerPlayer} />
          <IconButton />
        </CardActions>
      </Card>
    </div>
  );
}
