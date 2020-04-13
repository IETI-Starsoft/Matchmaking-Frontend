import React, { Fragment } from 'react';
import { ActividadCard } from './ActividadCard';
import Grid from '@material-ui/core/Grid';
import Menu from "../menu/NavBar";
import Filtros from './Filtros';
import ModalMasInfo from './ModalMasInfo'
import axiosHeader from '../../api/axiosHeader';
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/styles';

  
export class ListaDeActividades extends React.Component {

    constructor(props) {
        super(props);
       
        this.state = {
            activities: [],
            filtro: {
                name: "none",
                userConsulting: JSON.parse(localStorage.getItem("user")).userId,
                labels: [],
                stateActiviti: "Available",
                participants: "GroupActivity",
                pag: 0
            },
            count: 0,
            load: true,
           
        };

        this.handleChangePaginator = this.handleChangePaginator.bind(this);
        this.handleChangeFiltros = this.handleChangeFiltros.bind(this);
        this.load=this.load.bind(this);

    }

    load(){
        if(this.state.load){
            this.handleChangeFiltros(this.state.filtro)
            this.setState({load:false})
        }
        
    }
    handleChangePaginator(event, value) {

        this.setState((state) => {
            console.log(state);
            return {
                filtro: {
                    name: state.filtro.name,
                    userConsulting: state.filtro.userConsulting,
                    labels: state.filtro.labels,
                    stateActiviti: "Available",
                    pag: value - 1,
                    rangeCredrits: state.filtro.rangeCredrits,
                    participants: state.filtro.participants,
                }
            }
        }, () => {
            var temp = [];
            console.log(this.state.filtro);
            axiosHeader.post(`/activities/filters/${this.state.filtro.name}`, this.state.filtro
            )
                .then(response => {
                    console.log(response.data);
                    response.data.map(value => {
                        temp.push(value);
                    })
                    this.setState({ activities: temp }, () => {
                        if (this.state.activities.length >= 4 && value >= this.state.count) {
                            this.setState((state) => {
                                return { count: state.count + 1 }
                            })
                        }
                    });
                })
                .catch(function (error) {
                    console.log(error);
                });
        });
    };
    render() {
        
        return (
            
            <Fragment>
                {
                    this.load()
                }
                <Menu />
                <Filtros props={this.handleChangeFiltros} />
                <Grid container spacing={32} justify="center">
                    {this.state.activities.map((actividad, i) => {
                        return (
                            <ActividadCard props={actividad} />
                        );
                    })}
                </Grid>
                <Pagination style={{position:"absolute", left:"43%"}} count={this.state.count} page={this.state.filtro.pag + 1} onChange={this.handleChangePaginator} color="primary" />

            </Fragment>
        );
    }   
    handleChangeFiltros(props) {
        console.log(props);
        this.setState((state) => {
            return {
                filtro: {
                    name: props.name,
                    userConsulting: props.userConsulting,
                    labels: props.labels,
                    rangeCredrits: props.rangeCredrits,
                    participants: props.participants,
                    stateActiviti: "Available",
                    pag: 0
                }


            }
        }, () => {
            var temp = [];
            console.log(this.state.filtro.pag);
            axiosHeader.post(`/activities/filters/${this.state.filtro.name}`, this.state.filtro
            ).then(response => {
                console.log(response.data);
                response.data.map(value => {
                    temp.push(value);
                })
                this.setState({ activities: temp }, () => {
                    if (this.state.activities.length >= 4) {
                        this.setState((state) => {
                            return { count: 2 }
                        })
                    } else {
                        this.setState((state) => {
                            return { count: 1 }
                        })
                    }
                });
            })
                .catch(function (error) {
                    console.log(error);
                });
        })


    };
}
