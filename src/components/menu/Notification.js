import React from "react";
import cancel from "../../resources/cancel.webp";
import aceppt from "../../resources/aceppt.webp";
import timer from "../../resources/timer.webp";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Popper from '@material-ui/core/Popper';
import Avatar from '@material-ui/core/Avatar';
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Badge from '@material-ui/core/Badge';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

export default function Notification({mobile}) {

  const [openNotification, setOpenNotification] = React.useState(null);
  var notifications = [{ img: cancel, text: "El match ha sido cancelado" }
    , { img: timer, text: "Falta 1h para tu que inicie tu match" },
  { img: aceppt, text: "Alguien ha aceptado tu reto" }];
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

  return (
    <div>
      {mobile ?
        <ListItem button key="notifications" component={Link} to="/perfil">
          <ListItemIcon> <NotificationsNoneIcon /></ListItemIcon>
          <ListItemText primary="Notificaciones" />
        </ListItem>
        :
        <div>
          <IconButton aria-label="show 11 new notifications" color="inherit" onClick={handleClickNotification}>
            <Badge badgeContent={notifications.length} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Popper open={Boolean(openNotification)} anchorEl={openNotification} transition
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="notification-menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseNotification}>
                    <MenuList role="menu">
                      {notifications.map(not => (
                        <div>
                          <MenuItem >
                            <a href="/perfil"> <Avatar src={not.img} style={{ paddingRight: 10 }}
                            /> </a>

                            <Typography> {not.text} </Typography>
                          </MenuItem>
                          {notifications.indexOf(not) + 1 != notifications.length ? <Divider /> : null}
                        </div>
                      ))
                      }

                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>)}
          </Popper>
        </div>
      }

    </div>
  )
}