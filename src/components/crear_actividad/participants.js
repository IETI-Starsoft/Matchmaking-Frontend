import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './participants.css'
import axiosHeader from '../../api/axiosHeader';

export class Participants extends React.Component {

  constructor(props) {
    super(props);
    this.state = { teams: []}
    this.getTeams = this.getTeams.bind(this);
    this.getTeams();
  }

  getTeams(){
    var temp = []
    
   axiosHeader.post("http://localhost:8080/api/team/captain", {
      userId: JSON.parse(localStorage.user).userId,
      firstName: JSON.parse(localStorage.user).firstName,
      lastName: JSON.parse(localStorage.user).lastName,
      email: JSON.parse(localStorage.user).email,
      password: JSON.parse(localStorage.user).password,
      rating: JSON.parse(localStorage.user).rating,
      credits:JSON.parse(localStorage.user).credits,
      friends: JSON.parse(localStorage.user).friends,
      teams: JSON.parse(localStorage.user).teams,
    })
      .then(response => {
        console.log(response.data)
        response.data.map(value => {
          temp.push(value);
        })
        this.setState({teams:temp})
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>

        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12}  sm={6}>

            <FormControlLabel className="checkbox"
              control={<Checkbox checked={this.props.checkTeams} size="medium" color="secondary" onChange={this.props.changeCheckTeams} name="Equipo" value="yes" />}
              label="Agregar Equipo" labelPlacement="start"
            />

            <FormControl margin="normal" fullWidth>
              {this.props.checkTeams ?
                <List className="list" >
                  {this.state.teams.map(value => {
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
                            onChange={() => this.props.changeChecked(value)}
                            checked={this.props.checked.indexOf(value) !== -1}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
                : null}
            </FormControl>
           
          </Grid>
          <Grid item xs={12}  sm={6}>
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