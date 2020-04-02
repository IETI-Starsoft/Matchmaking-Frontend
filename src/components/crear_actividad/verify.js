import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,KeyboardTimePicker } from '@material-ui/pickers'
import 'react-datepicker/dist/react-datepicker.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './participants.css'
import './verify.css'


export class Verify extends React.Component {

  constructor(props){
    super(props);
  }  
  //<FormControl  margin="normal" fullWidth>



  render(){
    return (
        <React.Fragment>
         
          <Grid container spacing={1} > 
          <Grid item xs={12}  sm={6}>   
          <center>
            <Typography variant="h6" gutterBottom>
              Participantes 
            </Typography>
          </center>
                      <List   className="list" >
                      {this.props.checked.map(value => {
                        const labelId = `checkbox-list-secondary-label-${value}`;
                        return (
                          <ListItem key={value} button>
                            <ListItemAvatar>
                              <Avatar
                                alt={`Avatar n°${value + 1}`}
                                    src={`/static/images/avatar/${value + 1}.jpg`}
                              />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={this.props.checkIndividual || this.props.checkParticipants ? `${value}`: `${value.name}`}  />
                          </ListItem>
                        );
                      })}
                    </List> 
          </Grid>
          <Grid item xs={12} sm={6}>            
                  <center>
                    <Typography variant="h6" gutterBottom>
                      Detalles
                    </Typography>
                  </center> 
                  <Grid container>
                        <Grid item xs={5} className="casilla_actividad">
                        <Typography variant="h6" gutterBottom >
                          <Typography gutterBottom>Actividad</Typography>
                        </Typography>
                        </Grid>
                        <Grid item xs={7} className="casilla_actividad">
                          <Typography gutterBottom>{this.props.activity}</Typography>
                        </Grid>
                        <Grid item xs={5} className="casilla">
                  <Typography gutterBottom>Hora</Typography>
                        </Grid>
                        <Grid item xs={7} className="casilla">
                        <FormControl required fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <KeyboardTimePicker disabled
                              id="time-picker"
                              label=""
                              value={this.props.time}
                              onChange={this.props.changeTime}
                              KeyboardButtonProps={{
                                  'aria-label': 'change time',
                              }}
                              />
                          </MuiPickersUtilsProvider>
                          </FormControl>
                        </Grid>
                        <Grid item xs={5} className="casilla">
                  <Typography gutterBottom>Fecha</Typography>
                        </Grid>
                        <Grid item xs={7} className="casilla">
                        <FormControl required fullWidth>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker disabled
                                    id="date-picker-dialog"
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
                        <Grid item xs={5} className="casilla">
                  <Typography gutterBottom>Lugar</Typography>
                        </Grid>
                        <Grid item xs={7} className="casilla">
                          <Typography gutterBottom>{this.props.location}</Typography>
                        </Grid> 
                      <Grid item xs={5} className="casilla_apuesta">
                        <Typography gutterBottom>Apuesta</Typography>
                      </Grid> 
                  {this.props.stateBet ?  
                      <Grid item xs={7} className="casilla_apuesta">
                        <Typography gutterBottom> ${this.props.bet}</Typography>
                      </Grid> 
                      : <Grid item xs={7} className="casilla_apuesta">
                        <Typography  gutterBottom>No realiza apuesta</Typography>
                        </Grid>}    
                </Grid>
                </Grid>
                </Grid>
        </React.Fragment>
      );
  }  
  }