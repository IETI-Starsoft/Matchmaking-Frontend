import React, { Fragment } from 'react';
import { ActividadCard } from './ActividadCard';
import Grid from '@material-ui/core/Grid';
import Menu from "../menu/NavBar";
import Filtros from './Filtros'; 
import ModalMasInfo from './ModalMasInfo'
import axiosHeader from '../../api/axiosHeader';
import CircularProgress from "@material-ui/core/CircularProgress";
import {getTeams} from "../../api/team"

export class ListaDeActividades extends React.Component {

    constructor(props) {
        super(props);
        this.state = {activities: [],teams:[]};
        this.getAllActivities = this.getAllActivities.bind(this);
        this.getAllActivities();
        this.fecthTeams = this.fecthTeams.bind(this);
        this.fecthTeams();
    }

    fecthTeams(){
        let user = JSON.parse(localStorage.getItem("user"));
        getTeams(user.userId).then(response => {this.setState({teams:response})})
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
                {this.state.activities.length > 0  
                ? <Grid container spacing={32} justify="center">
                    {this.state.activities.map((actividad, i) => {
                        return (
                            <ActividadCard activity={actividad} teams={this.state.teams} />
                        );
                    })}
                </Grid>
                : <div style={{ textAlign: "center", marginTop:"8%" }}>
                    <CircularProgress />
                     Cargando...
                    </div>
                 }
            </Fragment>
        ); 


    }

}