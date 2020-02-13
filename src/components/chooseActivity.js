import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,KeyboardTimePicker } from '@material-ui/pickers'
import moment from "moment";
import Input from '@material-ui/core/Input';


export class ChooseActivity extends React.Component {

  constructor(props){
    super(props); 
    this.state = {activity:"", date: moment(), time:  Date.now(), location:"",bet:0,stateBet: false};
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleChangeLocation = this.handleChangeLocation.bind(this);
    this.handleChangeBet = this.handleChangeBet.bind(this);
    this.handleChangeStateBet = this.handleChangeStateBet.bind(this);
  }  

  handleChangeActivity(e){
    this.setState({activity: e.target.value})
  }

  handleDateChange(datee){
    this.setState({date: datee})
  }

  handleTimeChange(datee){
    this.setState({time: datee})
  }

  handleChangeLocation(e){
    this.setState({location: e.target.value})
  }

  handleChangeBet(e){
    this.setState({bet:e.target.value})
  }

  handleChangeStateBet(){
    this.setState({stateBet:!(this.state.stateBet)})
  }

  render(){
    return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
            <InputLabel htmlFor="age-native-helper">Actividad</InputLabel>
            <NativeSelect
            value={this.state.activity}
            onChange={this.handleChangeActivity}
            >

            <option value="" />
            <option value={"futbol"}>futbol</option>
            <option value={"basketball"}>basketball</option>
            <option value={"volleyball"}>volleyball</option>
            </NativeSelect>
            <FormHelperText>Elija la actividad que desea crear</FormHelperText>
            </FormControl>

            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                        id="date-picker-dialog"
                        label="Fecha"
                        format="MM/dd/yyyy"
                        value={this.state.date}
                        onChange={this.handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                    />
                    </MuiPickersUtilsProvider>
                    </FormControl>
            </Grid>
            <Grid item xs={4} sm={6}>
            <FormControl required fullWidth>
            <TextField
              id="descripcion"
              name="descripcion"
              label="Descripcion de la actividad"
              multiline
              rowsMax="2"
            />
            </FormControl>
            
            </Grid>
            <Grid item xs={12} sm={6}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker
                id="time-picker"
                label="Hora"
                value={this.state.time}
                onChange={this.handleTimeChange}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12} sm={6}>
            
            <FormControl  required fullWidth>
                <InputLabel htmlFor="age-native-helper">Ubicacion</InputLabel>
                <Input
                label="Ubicacion"
                value={this.state.location}
                onChange={this.handleChangeLocation}
                id="ubicacion" />   
                <FormHelperText>Ingrese link google maps de la ubicacion deseada</FormHelperText>
            </FormControl>

            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl  margin="normal" fullWidth>
                { this.state.stateBet ? 
                      <Input 
                      label="Cantidad"
                      value={this.state.bet}
                      onChange={this.handleChangeBet}
                      id="CantidadApuesta"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      />  
                  : null }  
              </FormControl>
          
            <FormControlLabel className="checkbox"
                control={<Checkbox size="medium" color="secondary" onChange={this.handleChangeStateBet} name="saveAddress" value="yes" />}
                label="¿Desea apostar?" labelPlacement ="start" 
            />
            </Grid>
          </Grid>
        </React.Fragment>
      );
  }  
  }