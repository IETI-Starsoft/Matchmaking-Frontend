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
import axios from "axios"

export class Participants extends React.Component {

  constructor(props) {
    super(props);
    /*this.state = { teams: []}
    this.handleAddTeams = this.handleAddTeams.bind(this);
    this.getTeams = this.getTeams.bind(this);
    this.getTeams();*/
  }


 /* handleAddTeams(newTeams){
    this.setState({ teams: newTeams });
  }*/

  getTeams(){
    var temp = []
    
   /* axios.post("http://localhost:8080/api/team/captain", {
      userId: "5e7ce3d9560845423a39dd44",//JSON.parse(localStorage.user).userId,
      firstName: "Crespos",//JSON.parse(localStorage.user).firstName,
      lastName: "PRamirez",//JSON.parse(localStorage.user).lastName,
      email: "creposP@mail.com",//JSON.parse(localStorage.user).email,
      password: "+hVkDRCP7TUp4UOPXkZ5xIOvFpeNSHmvGeLXzfqNR7t2wJNgp5qElC8S+Yi9c2ns",//JSON.parse(localStorage.user).password,
      rating: 0,//JSON.parse(localStorage.user).rating,
      credits: 384,//JSON.parse(localStorage.user).credits,
      friends: ["5e7c6e667fb1f93b0c289cec"],//JSON.parse(localStorage.user).friends,
      teams: ["5e7ce41b560845423a39dd45","5e7d1f81c32e7c7f861f1e97"],//JSON.parse(localStorage.user).teams,
    })
      .then(function(response) {
        console.log(response.data)
        response.data.map(value => {
          console.log("entraaaaa");
          temp.push(value);
        })

        //console.log("teams " + JSON.stringify(teams));
      })
      .catch(function (error) {
        console.log(error);
      });
      console.log(temp.length)
      this.handleAddTeams(temp)*/
  }

  render() {
    const teams = ["team1", "team2", "team3"];

    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>

        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={12} sm={4}>

            <FormControlLabel className="checkbox"
              control={<Checkbox checked={this.props.checkParticipants} size="medium" color="secondary" onChange={this.props.changeCheckParticipants} name="participantes" value="yes" />}
              label="Agregar Participantes" labelPlacement="start"
            />
            <FormControl margin="normal" fullWidth>
              {this.props.checkParticipants ?
                <List className="list" >
                  {this.state.teams.map(value => {
                    const labelId = `checkbox-list-secondary-label-${value.name}`;
                    return (
                      <ListItem key={value.id} button>
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${value.name + 1}`}
                            src={`/static/images/avatar/${value.name}.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`Amigo ${value.name + 1}`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={() => this.props.changeChecked(value.name)}
                            checked={this.props.checked.indexOf(value.name) !== -1}
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
          <Grid item xs={12}  sm={4}>

            <FormControlLabel className="checkbox"
              control={<Checkbox checked={this.props.checkTeams} size="medium" color="secondary" onChange={this.props.changeCheckTeams} name="Equipo" value="yes" />}
              label="Agregar Equipo" labelPlacement="start"
            />

            <FormControl margin="normal" fullWidth>
              {this.props.checkTeams ?
                <List className="list" >
                  {teams.map(value => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                    <ListItem key={value} >
                        <ListItemAvatar>
                          <Avatar
                            alt={`Avatar n°${value}`}
                            src={`/static/images/avatar/${value}.jpg`}
                          />
                        </ListItemAvatar>
                        <ListItemText id={labelId} primary={`${value}`} />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={() => this.props.changeChecked(value)}
                            checked={this.props.checked.indexOf(value) !== -1}
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
          <Grid item xs={12}  sm={4}>
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