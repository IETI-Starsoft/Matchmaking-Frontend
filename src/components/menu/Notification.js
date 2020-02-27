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


export default function Notification({openNotification, notifications,setOpenNotification,handleCloseNotification}){



return (
    <div>
<Popper  open={Boolean(openNotification)} anchorEl={openNotification} transition
          disablePortal>
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
              </Grow>)}
        </Popper>
        </div>
)
}