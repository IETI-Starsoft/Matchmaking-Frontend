import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import moment from "moment";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { ChooseActivity } from './chooseActivity';
import { Participants } from './participants';
import {Verify} from './verify';
import './createActivity.css'

export class CreateActivity extends React.Component{

    constructor(props){
        super(props)
        this.state = {activity: "", date: moment(),time:Date.now(), location:"",bet:"",stateBet: false,checkParticipants:false, checkTeams: false , checked: [],count:0, checkIndividual: false};
        //metodos para chooseActivity 
        this.handleChangeActivity = this.handleChangeActivity.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.handleChangeLocation = this.handleChangeLocation.bind(this);
        this.handleChangeBet = this.handleChangeBet.bind(this);
        this.handleChangeStateBet = this.handleChangeStateBet.bind(this);
        //metodos para participants
        this.handlecheckParticipants = this.handlecheckParticipants.bind(this);
        this.handlecheckTeams = this.handlecheckTeams.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handlecheckIndividual = this.handlecheckIndividual.bind(this);
        //metodos para createActivity 
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.nextStep = this.nextStep.bind(this);
    }
  
    
    render(){
       function Copyright() {
            return (
              <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                  Your Website
                </Link>{' '}
                {new Date().getFullYear()}
                {'.'}
              </Typography>
            );
          }
          
         
        const steps = ['Actividad', 'Participantes','Verificar'];
          
         
        return (
            <React.Fragment>
            <CssBaseline />
            <AppBar position="absolute" color="default" className="appBar">
              <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                  MatchMaking
                </Typography>
              </Toolbar>
            </AppBar> 
            <main className="layout">
              <Paper className="paper">
                <Typography component="h1" variant="h4" align="center">
                  Crear actividad
                </Typography>
                <Stepper activeStep={this.state.count} className="stepper">
                  {steps.map(label => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <React.Fragment>
                  {this.state.count === steps.length ? (
                    <React.Fragment>
                      <Typography variant="h5" gutterBottom>
                       ¡ Tu actividad se ha registrado con exito !
                      </Typography>
                      <Typography variant="subtitle1">
                        El identificador de tu actividad es #4512. Seras informado cuando alguien 
                        decida aceptar tu reto/juego. 
                      </Typography>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      {this.getStepContent(this.state.count)}
                      <div className="buttons">
                        {this.state.count !== 0 && (
                          <Button onClick={this.handleBack} className="button">
                            Atras
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className="button"
                        >
                          {this.state.count === steps.length - 1 ? 'Confirmar Actividad' : 'Siguiente'}
                        </Button>
                      </div>
                    </React.Fragment>
                  )}
                </React.Fragment>
              </Paper>
              <Copyright />
            </main>
          </React.Fragment>
        );
    }
   
    //choose activity 
    handleChangeActivity(e) { 
      this.setState({activity: e.target.value}) 
      if (this.state.activiy == ""){this.state.fieldsFull = false}
    }
  
    handleDateChange(datee) {this.setState({date: datee})}
  
    handleTimeChange(datee) {this.setState({time: datee})}
  
    handleChangeLocation(e) {this.setState({location: e.target.value})}
  
    handleChangeBet(e) {this.setState({bet:e.target.value})}
  
    handleChangeStateBet() {this.setState({stateBet:!(this.state.stateBet)})}

    //participants 
    handlecheckParticipants(){
      const newChecked = [];
      this.setState({checked:newChecked});
      this.setState({checkParticipants:!(this.state.checkParticipants)})
      if (this.state.checkTeams) this.setState({checkTeams:false})
      if (this.state.checkIndividual) this.setState({checkIndividual:false})
    }
  
    handlecheckTeams(){
      const newChecked = [];
      this.setState({checked:newChecked});
      this.setState({checkTeams:!(this.state.checkTeams)})
      if (this.state.checkParticipants) this.setState({checkParticipants:false})
      if (this.state.checkIndividual) this.setState({checkIndividual:false})
    }

    handlecheckIndividual(){
      if (!this.state.checkIndividual){
        const newChecked = ["user"];
        this.setState({checked:newChecked});
      }
      else {
        const newChecked = [];
        this.setState({checked:newChecked});
      }
      this.setState({checkIndividual:!(this.state.checkIndividual)})
      if (this.state.checkTeams) this.setState({checkTeams:false})
      if (this.state.checkParticipants) this.setState({checkParticipants:false})
    }
  
    handleToggle(value) {
      const currentIndex = this.state.checked.indexOf(value);
      const newChecked = [...this.state.checked];
      if (this.state.checkTeams){
        if (currentIndex === -1){
          if (this.state.checked.length == 0){
            newChecked.push(value);  
            this.setState({checked:newChecked});
          }
        }
        else{
            newChecked.splice(currentIndex, 1);
            this.setState({checked:newChecked});
          } 
      }
      else {
        if (currentIndex === -1) {
          newChecked.push(value);
        } else {
          newChecked.splice(currentIndex, 1);
        }
        this.setState({checked:newChecked});
      };
      }
    
    // create activity 
    handleNext() {
      if (this.state.count == 0){
        this.validateChoose(this.nextStep)    
      }
      else if (this.state.count ==1){
        this.validateParticipants(this.nextStep)
      } 
      else{
        this.nextStep(); 
      }
    };

    nextStep(){
      this.setState({count: this.state.count +1})
    }

    validateChoose(callback){
      if(this.state.activity != "" && this.state.location != "" ){
        if (this.state.stateBet == true) {
          if (this.state.bet != "" && this.state.bet > 0 ){
            callback()
          }
        }
        else{
          callback()
        }
      }
    }

    validateParticipants(callback){
      if(this.state.checked.length != 0){
        callback()
      }
    } 

    handleBack() {this.setState({count: this.state.count -1})};

    getStepContent(step) {
       
        switch (step) {
          case 0:
            return  <ChooseActivity activity={this.state.activity} changeActivity={this.handleChangeActivity}
            date={this.state.date} changeDate={this.handleDateChange}
            time={this.state.time} changeTime={this.handleTimeChange}
            location={this.state.location} changeLocation={this.handleChangeLocation}
            bet={this.state.bet} changeBet={this.handleChangeBet}
            stateBet={this.state.stateBet} changeStateBet={this.handleChangeStateBet}/>; 
    
          
          case 1:   
            return  <Participants checkParticipants={this.state.checkParticipants} changeCheckParticipants={this.handlecheckParticipants}
            checkTeams={this.state.checkTeams} changeCheckTeams={this.handlecheckTeams}
            checkIndividual={this.state.checkIndividual} changeCheckIndividual={this.handlecheckIndividual}
            checked={this.state.checked} changeChecked={this.handleToggle}/>; 

           
          case 2: 
            return  <Verify checkParticipants={this.state.checkParticipants} checked={this.state.checked}
            checkIndividual={this.state.checkIndividual}
            time={this.state.time} date={this.state.date} activity={this.state.activity}
            location={this.state.location}  bet={this.state.bet}  stateBet={this.state.stateBet}
            
            />;
            
                
          default:
            throw new Error('Unknown step');
        }
      }
    }
