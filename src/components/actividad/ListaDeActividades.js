import React, { Fragment } from "react";
import { ActividadCard } from "./ActividadCard";
import Grid from "@material-ui/core/Grid";
import Menu from "../menu/NavBar";
import Filtros from "./Filtros";
import ModalMasInfo from "./ModalMasInfo";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getTeams } from "../../api/team";
import DialogAceptarActividadIndividual from "./DialogAceptarActividadIndividual";
import DialogAceptarActividadGrupo from "./DialogAceptarActividadGrupo";
import axiosHeader from '../../api/axiosHeader';
import Pagination from '@material-ui/lab/Pagination';
import { withStyles } from '@material-ui/styles';


export class ListaDeActividades extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      activities: null,
      teams: [],
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
    this.load = this.load.bind(this);

    this.fecthTeams = this.fecthTeams.bind(this);
    this.fecthTeams();
  }

  fecthTeams() {
    let user = JSON.parse(localStorage.getItem("user"));
    getTeams(user.userId).then((response) => {
      this.setState({ teams: response });
    });
  }

  load() {
    if (this.state.load) {
      this.handleChangeFiltros(this.state.filtro)
      this.setState({ load: false })
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
        <div style={{ position: "relative", left: "0%",top:"90%",with:"30%"}}>       
          <Pagination size="small" style={{ position: "relative", "margin-left": "40%",top:"90%",}} count={this.state.count} page={this.state.filtro.pag + 1} onChange={this.handleChangePaginator} color="primary" />
        </div>

        {this.state.activities ? (
          this.state.activities.length > 0 ? (
            <Grid style={{marginTop:"10px"}} container spacing={10} justify="center">
              {this.state.activities.map((actividad, i) => {
                return (
                  <ActividadCard
                    key={i}
                    activity={actividad}
                    ModalAceptar={
                      actividad.idTeam1 != null ? (
                        <DialogAceptarActividadGrupo
                          activity={actividad}
                          teams={this.state.teams}
                          handleChangeFiltros={this.handleChangeFiltros}
                          filtro = {this.state.filtro}
                        />
                      ) : (
                          <DialogAceptarActividadIndividual
                            activity={actividad}
                            handleChangeFiltros={this.handleChangeFiltros}
                            filtro = {this.state.filtro}
                          />
                        )
                    }
                  />
                );
              })}
            </Grid>
            )
            : (<div> No hay actividades actualmente </div>)
        ) : (
            <div style={{ textAlign: "center", marginTop: "8%" }}>
              <CircularProgress />
          Cargando...
            </div>
          )}
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
