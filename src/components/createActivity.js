import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
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
import './createActivity.css'

export class CreateActivity extends React.Component{

    constructor(props){
        super(props)
        this.state = {count:0};

        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
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
          
         
        const steps = ['Actividad', 'Participantes', 'Verificar'];
          
         
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
                        Thank you for your order.
                      </Typography>
                      <Typography variant="subtitle1">
                        Your order number is #2001539. We have emailed your order confirmation, and will
                        send you an update when your order has shipped.
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

    handleNext() {
        this.setState({count: this.state.count +1})
    };

    handleBack(){
        this.setState({count: this.state.count -1})
    };

    getStepContent(step) {
        switch (step) {
          case 0:
            return <ChooseActivity />;
          case 1:
            return <ChooseActivity />;    
          case 2: 
            return <ChooseActivity />;       
          default:
            throw new Error('Unknown step');
        }
      }
}