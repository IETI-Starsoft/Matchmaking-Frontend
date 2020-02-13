import React from 'react';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import 'react-datepicker/dist/react-datepicker.css';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import './participants.css'


export class Verify extends React.Component {

  constructor(props){
    super(props); 
    this.state = {checkParticipants:false, checkTeams: false , checked: []};
    this.handlecheckParticipants = this.handlecheckParticipants.bind(this);
    this.handlecheckTeams = this.handlecheckTeams.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
  }  

  handlecheckParticipants(){
    this.setState({checkParticipants:!(this.state.checkParticipants)})
    if (this.state.checkTeams) this.setState({checkTeams:false})

  }

  handlecheckTeams(){
    this.setState({checkTeams:!(this.state.checkTeams)})
    if (this.state.checkParticipants) this.setState({checkParticipants:false})
  }

  handleToggle(value) {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    this.setState({checked:newChecked});
    console.log(this.state.checked);
  };
 

  render(){
    return (
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            
          </Typography>
          <Grid container spacing={3}> 
               
                 
          </Grid>
        </React.Fragment>
      );
  }  
  }