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
import Input from '@material-ui/core/Input';


export class ChooseActivity extends React.Component {

  constructor(props){
    super(props);     
  }  


  render(){
    const FormNotFilled = {
      background: 'linear-gradient(45deg, #CB3234 30%, #CB3234 90%)',
      
    };

    return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
            <InputLabel htmlFor="age-native-helper">Actividad</InputLabel>
            {this.props.activity == ""  ? 
            <NativeSelect error
            value={this.props.activity}
            onChange={this.props.changeActivity}
              >  <option value="" />
              <option value={"futbol"}>futbol</option>
              <option value={"basketball"}>basketball</option>
              <option value={"volleyball"}>volleyball</option>
            </NativeSelect> :
             <NativeSelect 
                value={this.props.activity}
                onChange={this.props.changeActivity}
                >  <option value="" />
                <option value={"futbol"}>futbol</option>
                <option value={"basketball"}>basketball</option>
                <option value={"volleyball"}>volleyball</option>
            </NativeSelect>
            }
            <FormHelperText>Elija la actividad que desea crear</FormHelperText>
            </FormControl>

            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker disablePast
                        id="date-picker-dialog"
                        label="Fecha"
                        format="MM/dd/yyyy"
                        value={this.props.date}
                        onChange={this.props.changeDate}
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
            <FormControl required fullWidth>  
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardTimePicker 
                id="time-picker"
                label="Hora"
                value={this.props.time}
                onChange={this.props.changeTime}
                KeyboardButtonProps={{
                    'aria-label': 'change time',
                }}
                />
            </MuiPickersUtilsProvider>
            </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl required fullWidth>
            {this.props.location == "" ? 
            <TextField error
              id="ubicacion"
              name="Ubicacion"
              label="Ubicacion de la actividad"
              value={this.props.location}
              onChange={this.props.changeLocation}
            />: <TextField 
                  id="ubicacion"
                  name="Ubicacion"
                  label="Ubicacion de la actividad"
                  value={this.props.location}
                  onChange={this.props.changeLocation}
            />}
            <FormHelperText>Ingrese link google maps de la ubicacion deseada</FormHelperText>
            </FormControl>
            

            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl  margin="normal" fullWidth>
                { this.props.stateBet ? 
                this.props.bet == 0  ?  
                      <Input error
                        label="Cantidad"
                        value={this.props.bet}
                        onChange={this.props.changeBet}
                        id="CantidadApuesta"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      /> :
                      <Input 
                        label="Cantidad"
                        value={this.props.bet}
                        onChange={this.props.changeBet}
                        id="CantidadApuesta"
                        startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      /> 
                  : null }  
              </FormControl>
          
            <FormControlLabel className="checkbox"
                control={<Checkbox size="medium" checked={this.props.stateBet} color="secondary" onChange={this.props.changeStateBet} name="saveAddress" value="yes" />}
                label="¿Desea apostar?" labelPlacement ="start" 
            />
            </Grid>
          </Grid>
        </React.Fragment>
      );
  }  
  }