import React from "react"
import Avatar from '@material-ui/core/Avatar';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import teamIcon from "../../resources/teamIcon.webp";

export default function SeleccionarEquipo(props) {

  return (
    <div style={{ border: 'groove', borderRadius: '5px' }}>
      <Grid item xs={12} >
        <img src={teamIcon} style={{width: '30%',height: '10%',marginLeft: "35%",marginTop: "2%"}} />
      </Grid>
      <Grid item xs={12}  >
        <Typography variant="button" className={props.classes.labelEquipo} gutterBottom>
          Seleccione un equipo
         </Typography>
      </Grid>
      <Divider />
      <List className={props.classes.list} >

        {props.teams.map(value => {
          const labelId = `checkbox-list-secondary-label--`;
          return (
            <ListItem key={value.userId} >
              <ListItemAvatar>
                <Avatar
                  alt={`Avatar`}
                  src={`/static/images/avatar/5.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${value.name}`} />
              <ListItemSecondaryAction>
                <Checkbox
                  edge="end"
                  onChange={() => props.changeChecked(value)}
                  checked={props.checked.indexOf(value) !== -1}
                />
              </ListItemSecondaryAction>
            </ListItem>
          );
        })}
      </List>
    </div>
  )
}