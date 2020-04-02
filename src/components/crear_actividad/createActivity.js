import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { ChooseActivity } from './chooseActivity';
import { Participants } from './participants';
import { Verify } from './verify';
import Menu from "../menu/NavBar";
import { withStyles } from '@material-ui/core/styles';
import axiosHeader from '../../api/axiosHeader';


class CreateActivity extends React.Component {

  constructor(props) {
    super(props)
    this.state = { activity: "", date: new Date(), time: new Date(), location: "", bet: "", description: "", stateBet: false, checkParticipants: false, checkTeams: false, checked: [], count: 0, checkIndividual: false };
    //metodos para chooseActivity 
    this.handleChangeActivity = this.handleChangeActivity.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
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


  render() {
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


    const steps = ['Actividad', 'Jugadores', 'Verificar'];


    return (
      <React.Fragment>
        <CssBaseline />
        <Menu />
        <main className={this.props.classes.layout}>
          <Paper className={this.props.classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Crear actividad
                </Typography>
            <Stepper activeStep={this.state.count} className={this.props.classes.stepper}>
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
                    Seras informado cuando alguien
                    decida aceptar tu reto/juego.
                      </Typography>
                </React.Fragment>
              ) : (
                  <React.Fragment>
                    {this.getStepContent(this.state.count)}
                    <div className={this.props.classes.buttons}>
                      {this.state.count !== 0 && (
                        <Button onClick={this.handleBack} className={this.props.classes.button}>
                          Atras
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={this.props.classes.button}
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
    this.setState({ activity: e.target.value })
  }

  handleChangeDescription(e) { this.setState({ description: e.target.value }) }

  handleDateChange(datee) { this.setState({ date: datee }) }

  handleTimeChange(datee) { this.setState({ time: datee }) }

  handleChangeLocation(e) { this.setState({ location: e.target.value }) }

  handleChangeBet(e) { this.setState({ bet: e.target.value }) }

  handleChangeStateBet() { this.setState({ stateBet: !(this.state.stateBet) }) }

  //participants 
  handlecheckParticipants() {
    const newChecked = [];
    this.setState({ checked: newChecked });
    this.setState({ checkParticipants: !(this.state.checkParticipants) })
    if (this.state.checkTeams) this.setState({ checkTeams: false })
    if (this.state.checkIndividual) this.setState({ checkIndividual: false })
  }

  handlecheckTeams() {
    const newChecked = [];
    this.setState({ checked: newChecked });
    this.setState({ checkTeams: !(this.state.checkTeams) })
    if (this.state.checkParticipants) this.setState({ checkParticipants: false })
    if (this.state.checkIndividual) this.setState({ checkIndividual: false })
  }

  handlecheckIndividual() {
    if (!this.state.checkIndividual) {
      var name = JSON.parse(localStorage.getItem("user")).firstName+" "+JSON.parse(localStorage.getItem("user")).lastName  
      const newChecked = [name];
      this.setState({ checked: newChecked });
    }
    else {
      const newChecked = [];
      this.setState({ checked: newChecked });
    }
    this.setState({ checkIndividual: !(this.state.checkIndividual) })
    if (this.state.checkTeams) this.setState({ checkTeams: false })
    if (this.state.checkParticipants) this.setState({ checkParticipants: false })
  }

  handleToggle(value) {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];
    if (this.state.checkTeams) {
      if (currentIndex === -1) {
        if (this.state.checked.length === 0) {
          newChecked.push(value);
          this.setState({ checked: newChecked });
        }
      }
      else {
        newChecked.splice(currentIndex, 1);
        this.setState({ checked: newChecked });
      }
    }
    else {
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
      this.setState({ checked: newChecked });
    };
  }

  // create activity 
  handleNext() {
    if (this.state.count === 0) {
      this.validateChoose(this.nextStep)
    }
    else if (this.state.count === 1) {
      this.validateParticipants(this.nextStep)
    }
    else {
      if (this.state.checkIndividual) this.validateCreditsUser();
      else this.validateCreditsTeam();
    }
  }

  validateCreditsUser(){
    if (this.state.stateBet === true){
      let userId = JSON.parse(localStorage.getItem("user")).userId;
      axiosHeader.get("/users/id/" + userId)
        .then(response => {
          let credits = response.data.credits
          if (this.state.bet <= credits ) {
            this.postIndividual();
          }
          else alert("Su saldo es insuficiente para realizar la apuesta.");
        })
        .catch(function (error) {
          alert("error validate credits")
          console.log(error);
          return false;
        });
    }
    else {
      this.postIndividual();
    }
  }

  validateCreditsTeam(){
    if (this.state.stateBet === true){
      let teamId = this.state.checked[0].teamId;
      axiosHeader.get("/team/" + teamId)
        .then(response => {
          let credits = response.data.credits
          if (this.state.bet <= credits ) {
             this.postGroup();
          }
          else alert("Su saldo es insuficiente para realizar la apuesta.");
        })
        .catch(function (error) {
          alert("error validate credits")
          console.log(error);
          return false;
        });
    }
    else {
      this.postGroup();
    }
  }

 handleCredit = value => {
    let user = JSON.parse(localStorage.getItem("user"));
    let creditosAct = user.credits;
    user.credits = creditosAct - value;
    localStorage.setItem("user", JSON.stringify(user));
  };

  betUserToActivity(credits,activityId){
    let userId =  JSON.parse(localStorage.getItem("user")).userId
    axiosHeader.put("/payments/user/"+ userId
    + "/activity/" + activityId + "/amount/" + credits)
        .then(response =>{
          this.handleCredit(credits)
          this.nextStep();
        })
        .catch(function (error) {
          alert("error bet activity")
          console.log(error);
        });
  }


  betTeamToActivity(credits,activityId){
    let teamId =  this.state.checked[0].teamId;
    axiosHeader.put("/payments/team/"+ teamId
    + "/activity/" + activityId + "/amount/" + credits)
        .then(response =>{
          this.nextStep();
        })
        .catch(function (error) {
          alert("error bet activity")
          console.log(error);
        });    
  }

  postIndividual() {
    var today = new Date();
    axiosHeader.post("/activities", {
      typ: "IndividualActivity",
      date: this.state.date.getFullYear() + "-" + this.state.date.getMonth() + 1 + "-" + this.state.date.getDate() + "T" + this.state.time.getHours() + ":" + this.state.time.getMinutes() + ":" + this.state.time.getSeconds(),
      publicationDate: today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      bet: this.state.bet == "" ? null : this.state.bet,
      description: this.state.description,
      type: this.state.activity,
      location: this.state.location,
      credits:  0,
      idPlayer1: JSON.parse(localStorage.user).userId,
    })
      .then(response =>{
        if (this.state.stateBet) this.betUserToActivity(this.state.bet,response.data.id);
        else {
          this.nextStep();
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  postGroup() {
    var today = new Date();
    console.log(this.state.checked[0].teamId)
    axiosHeader.post("/activities", {
      typ: "GroupActivity",
      date: this.state.date.getFullYear() + "-" + this.state.date.getMonth() + 1 + "-" + this.state.date.getDate() + "T" + this.state.time.getHours() + ":" + this.state.time.getMinutes() + ":" + this.state.time.getSeconds(),
      publicationDate: today.getFullYear() + "-" + today.getMonth() + 1 + "-" + today.getDate() + "T" + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
      bet: this.state.bet == "" ? null : this.state.bet,
      description: this.state.description,
      type: this.state.activity,
      location: this.state.location,
      credits:  this.state.bet == "" ? null : this.state.bet/2,
      idTeam1: this.state.checked[0].teamId,
    })
      .then(response => {
        if (this.state.stateBet) this.betTeamToActivity(this.state.bet,response.data.id);
        else {
          this.nextStep();
        } 
      })
      .catch(function (error) {
        console.log( error);
      });
  }
  nextStep() {
    this.setState({ count: this.state.count + 1 })
  }

  validateChoose(callback) {
    if (this.state.activity !== "" && this.state.location !== "") {
      if (this.state.stateBet === true) {
        if (this.state.bet !== "" && this.state.bet > 0) {
          callback()
        }
      }
      else {
        callback()
      }
    }
  }

  validateParticipants(callback) {
    if (this.state.checked.length !== 0) {
      callback();
    }
  }

  handleBack() { this.setState({ count: this.state.count - 1 }) };

  getStepContent(step) {

    switch (step) {
      case 0:
        return <ChooseActivity activity={this.state.activity} changeActivity={this.handleChangeActivity}
          date={this.state.date} changeDate={this.handleDateChange}
          description={this.state.description} changeDescription={this.handleChangeDescription}
          time={this.state.time} changeTime={this.handleTimeChange}
          location={this.state.location} changeLocation={this.handleChangeLocation}
          bet={this.state.bet} changeBet={this.handleChangeBet}
          stateBet={this.state.stateBet} changeStateBet={this.handleChangeStateBet} />;


      case 1:
        return <Participants checkParticipants={this.state.checkParticipants} changeCheckParticipants={this.handlecheckParticipants}
          checkTeams={this.state.checkTeams} changeCheckTeams={this.handlecheckTeams}
          checkIndividual={this.state.checkIndividual} changeCheckIndividual={this.handlecheckIndividual}
          checked={this.state.checked} changeChecked={this.handleToggle} classes={this.props.classes}/>;


      case 2:
        return <Verify checkParticipants={this.state.checkParticipants} checked={this.state.checked}
          checkIndividual={this.state.checkIndividual}
          time={this.state.time} date={this.state.date} activity={this.state.activity}
          location={this.state.location} bet={this.state.bet} stateBet={this.state.stateBet}

        />;


      default:
        throw new Error('Unknown step');
    }
  }
}

const styles = theme => ({

  divTeams: {
    backgroundColor: theme.palette.background.paper,
    border: 'groove',
    borderRadius: '5px'
    },

  labelEquipo:{
    marginLeft:   "22%",
    [theme.breakpoints.up(600)]:{
      marginLeft:   "18%"
    },
  },

  teamIcon: {
    width: '30%',
    height: '10%',
    marginLeft:"35%",
    marginTop:"2%"
  },

  list:{
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 230,
  },

  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 3),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },

});

export default withStyles(styles)(CreateActivity);
