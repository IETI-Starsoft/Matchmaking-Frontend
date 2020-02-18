import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './participants.css'


export class Participants extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>

        </Typography>
        <Grid container spacing={1}>
          <Grid item sm={4}>

            <FormControlLabel className="checkbox"
              control={<Checkbox checked={this.props.checkParticipants} size="medium" color="secondary" onChange={this.props.changeCheckParticipants} name="participantes" value="yes" />}
              label="Agregar Participantes" labelPlacement="start"
            />
            <FormControl margin="normal" fullWidth>
              {this.props.checkParticipants ?
                <List className="list" >
                  {[0, 1, 2].map(value => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem key={value} button>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${value + 1}`}
                            src={`/static/images/avatar/${value + 1}.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`Amigo ${value + 1}`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={() => this.props.changeChecked(value)}
                            checked={this.props.checked.indexOf(value) != -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                : null}
            </FormControl>
          </Grid>
          <Grid item sm={4}>

            <FormControlLabel className="checkbox"
              control={<Checkbox checked={this.props.checkTeams} size="medium" color="secondary" onChange={this.props.changeCheckTeams} name="Equipo" value="yes" />}
              label="Agregar Equipo" labelPlacement="start"
            />

            <FormControl margin="normal" fullWidth>
              {this.props.checkTeams ?
                <List className="list" >
                  {[0, 1, 2].map(value => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                      <ListItem key={value} >
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${value + 1}`}
                            src={`/static/images/avatar/${value + 1}.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`Equipo ${value + 1}`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={() => this.props.changeChecked(value)}
                            checked={this.props.checked.indexOf(value) != -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                : null}
            </FormControl>
           
          </Grid>
          <Grid item sm={4}>
            <FormControlLabel className="checkbox"
              control={<Checkbox checked={this.props.checkIndividual} size="medium" color="secondary" onChange={this.props.changeCheckIndividual} name="Individual" value="yes" />}
              label="Individual" labelPlacement="start"
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}