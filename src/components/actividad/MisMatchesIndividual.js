import React, { Fragment } from 'react';
import { ActividadCard } from './ActividadCard';
import Grid from '@material-ui/core/Grid';
import Menu from "../menu/NavBar";
import Filtros from './Filtros'; 
import ModalMasInfo from './ModalMasInfo'
import axiosHeader from '../../api/axiosHeader';
import CircularProgress from "@material-ui/core/CircularProgress";

export class MisMatchesIndividual extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activities: []};
        this.getAllActivities = this.getAllActivities.bind(this);
        this.getAllActivities();
    }

    getAllActivities(){
        var temp = []
        let user = JSON.parse(localStorage.getItem("user"));
        axiosHeader.get("users/id/" + user.userId + "/activities")
          .then(response => {
            response.data.map(value => {
              temp.push(value);
            })
            this.setState({activities:temp})
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    render() {
        return (
        
           <Fragment>
                <Menu />
                <Filtros />  
                {this.state.activities.length > 0  
                ? <Grid container spacing={32} justify="center">
                    {this.state.activities.map((actividad, i) => {
                        return (
                            <ActividadCard activity={actividad}/>
                        );
                    })}
                </Grid>
                 : <div style={{ textAlign: "center" , marginTop:"8%"}}>
                     <CircularProgress />
                     Cargando...
                 </div>
                 }
            </Fragment>
        ); 


    }

}