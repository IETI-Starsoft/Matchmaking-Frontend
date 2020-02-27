import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Popper from '@material-ui/core/Popper';
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import GroupIcon from "@material-ui/icons/Group";
import GroupWorkIcon from "@material-ui/icons/GroupWork";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventIcon from "@material-ui/icons/Event";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import GroupWorkOutlinedIcon from "@material-ui/icons/GroupWorkOutlined";
import Avatar from '@material-ui/core/Avatar';
import { BrowserRouter as Router, Link } from "react-router-dom";
import cancel from "../../resources/cancel.webp";
import aceppt from "../../resources/aceppt.webp";
import timer from "../../resources/timer.webp";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  list: {
    width: 250
  },
  fullList: {
    width: "auto"
  },
  perfilButton: {
    fontSize: 40
  },
  title: {
    flexGrow: 1
  }
}));

export default function DenseAppBar() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    icons: [
      [<GroupIcon />, <GroupWorkIcon />, <EventAvailableIcon />],
      [<EventIcon />, <GroupAddIcon />, <GroupWorkOutlinedIcon />]
    ]
  });
  const [openNotification, setOpenNotification] = React.useState(null);
  var notifications = [{img: cancel, text:"El match ha sido cancelado"}
                      ,{img: timer,text:"Falta 1h para tu que inicie tu match"},
                      {img: aceppt, text:"Alguien ha aceptado tu reto"}];
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [side]: open });
  };

  const sideList = side => (
    <div
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}
    >
      <List>
        {[
          ["Amigos", "/amigos"],
          ["Mis Equipos", "/mis-equipos"],
          ["Mis Matches", "/mis-matches"]
        ].map((array, index) => (
          <ListItem button key={array[0]} component={Link} to={array[1]}>
            <ListItemIcon>{state.icons[0][index]}</ListItemIcon>
            <ListItemText primary={array[0]} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          ["Crear Match", "/crear-match"],
          ["Crear Equipo", "/crear-equipo"],
          ["Buscar Match", "/buscar-match"]
        ].map((array, index) => (
          <ListItem button key={array[0]} component={Link} to={array[1]}>
            <ListItemIcon>{state.icons[1][index]}</ListItemIcon>
            <ListItemText primary={array[0]} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer("left", true)}
          >
            <MenuIcon />
          </IconButton>
          <SwipeableDrawer
            open={state.left}
            onClose={toggleDrawer("left", false)}
            onOpen={toggleDrawer("left", true)}
          >
            {sideList("left")}
          </SwipeableDrawer>

          <Typography variant="h6" color="inherit" className={classes.title}>
            MatchMaking
          </Typography>

          <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleClickNotification}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popper  open={Boolean(openNotification)} anchorEl={openNotification} transition
          disablePortal>
              <Paper>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                  <MenuList role="menu">
                    {notifications.map(not => ( 
                      <div>
                        <MenuItem > 
                        <a href="/perfil"> <Avatar src={not.img} style={{paddingRight:10}} 
                          /> </a>
                     
                        <Typography> {not.text} </Typography> 
                        </MenuItem>
                        {notifications.indexOf(not) + 1 != notifications.length ?<Divider /> : null }
                        </div>
                        ))
                    }
                   
                  </MenuList>
                </ClickAwayListener>
              </Paper>
        </Popper>
          <IconButton color="inherit" href="/perfil">
            <AccountCircleIcon className={classes.perfilButton} />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
