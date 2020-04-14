import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import './participants.css'
import SeleccionarEquipo from "./seleccionarEquipo";
import {getTeams} from "../../api/team"

export class Participants extends React.Component {

  constructor(props) {
    super(props);
    this.state = { teams: []}
    this.fecthTeams = this.fecthTeams.bind(this);
    this.fecthTeams();
  }

  fecthTeams(){
    let user = JSON.parse(localStorage.getItem("user"));
    getTeams(user.userId).then(response => {this.setState({teams:response})})
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
                <SeleccionarEquipo changeChecked={this.props.changeChecked} 
                teams={this.state.teams} classes={this.props.classes} checked={this.props.checked}
                label="Seleccionar equipo"/> : null}
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