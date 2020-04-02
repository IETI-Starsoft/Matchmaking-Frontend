import React, { Fragment } from 'react';
import { ActividadCard } from './ActividadCard';
import Grid from '@material-ui/core/Grid';
import Menu from "../menu/NavBar";
import Filtros from './Filtros'; 
import ModalMasInfo from './ModalMasInfo'
import axiosHeader from '../../api/axiosHeader';

export class ListaDeActividades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activities: []};
        this.getAllActivities = this.getAllActivities.bind(this);
        this.getAllActivities();
    }

    getAllActivities(){
        var temp = []
        let user = JSON.parse(localStorage.getItem("user"));
        axiosHeader.get("/activities/available/"+ user.userId + "/Available")
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
                <Grid container spacing={32} justify="center">
                    {this.state.activities.map((actividad, i) => {
                        return (
                            <ActividadCard props={actividad} />
                        );
                    })}
                </Grid>
            </Fragment>
        ); 


    }

}