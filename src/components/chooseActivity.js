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
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,KeyboardTimePicker } from '@material-ui/pickers'
import moment from "moment";



export class ChooseActivity extends React.Component {

  constructor(props){
    super(props); 
    this.state = {activity:"", date: moment(), time:  Date.now(), city:"",bet:0};
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleChangeCity = this.handleChangeCity.bind(this);
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

  handleChangeCity(e){
    this.setState({city: e.target.value})
  }

  handleChangeBet(e){
    this.setState({bet:e.target.value})
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
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
                <FormControl  required fullWidth>
                <InputLabel htmlFor="age-native-helper">Ciudad</InputLabel>
                <NativeSelect
                value={this.state.city}
                onChange={this.handleChangeCity}
                >

                <option value="" />
                <option value={"futbol"}>opcion 1</option>
                <option value={"basketball"}>opcion 2</option>
                <option value={"volleyball"}>opcion 3</option>
                </NativeSelect>
                <FormHelperText>Elija el lugar donde se realizara la actividad</FormHelperText>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl  required fullWidth>
            <TextField  id="standard-disabled" label="Apuesta" defaultValue="Ingrese su apuesta" />
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="city"
                name="city"
                label="City"
                fullWidth
                autoComplete="billing address-level2"
              />
            </Grid>
           
            <Grid item xs={12}>
            <FormControlLabel
                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                label="¿Desea apostar?"
          />
        </Grid>
           
          </Grid>
        </React.Fragment>
      );
  }  
  }