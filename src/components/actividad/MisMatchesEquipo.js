import React, { Fragment } from "react";
import { ActividadCard } from "./ActividadCard";
import Grid from "@material-ui/core/Grid";
import Menu from "../menu/NavBar";
import FiltrosEstados from "./FiltrosEstadosMisMatchs";
import ModalMasInfo from "./ModalMasInfo";
import axiosHeader from "../../api/axiosHeader";
import CircularProgress from "@material-ui/core/CircularProgress";
import ModalStartActivity from "./ModalStartActivity";
import ModalInproActivity from "./ModalInprogressActivity";
import NoActivities from "./NoActivitiesText";
import { getTeams } from "../../api/team";
import Pagination from '@material-ui/lab/Pagination';
export class MisMatchesEquipo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activities: null,
      teams: [],
      filtro: {
        name: "none",
        userConsulting: JSON.parse(localStorage.getItem("user")).userId,
        labels: [],
        stateActiviti: "Finished",
        participants: "GroupActivity",
        pag: 0,
        team:"All"
      },
      load: true,
      count: 0,
      load: true,
    };
    
    this.handleChangeFiltros = this.handleChangeFiltros.bind(this);
    this.handleChangePaginator = this.handleChangePaginator.bind(this);
    this.load = this.load.bind(this);
    this.fecthTeams = this.fecthTeams.bind(this);
    this.handleChangeFiltros(this.state.filtro);
    this.fecthTeams();
  }
  handleChangeFiltros(props) {
    console.log(props);
    console.log(this.state);
    this.setState((state) => {
      return {
        filtro: {
          name: props.name,
          userConsulting: props.userConsulting,
          labels: props.labels,
          rangeCredrits: props.rangeCredrits,
          participants: "GroupActivity",
          stateActiviti: props.stateActiviti,
          team:props.team,
          pag: 0
        }


      }
    }, () => {
      var temp = [];
      console.log(this.state.filtro.name);
      console.log(this.state.filtro);
      axiosHeader.post(`/team/filters/${this.state.filtro.name}`, this.state.filtro
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
  fecthTeams() {
    let user = JSON.parse(localStorage.getItem("user"));
    getTeams(user.userId).then((response) => {
        this.setState({ teams: response });
        //this.load(); 
    });

  }
  
  getModalButton(actividad) {
    let modal;
    switch (actividad.state) {
      case "Available":
        modal = (
          <>
            <CircularProgress size={30} color="secondary" />
            Esperando Rival
          </>
        );
        break;
      case "Accepted":
        modal = (
          <ModalStartActivity
            actividad={actividad}
            callback={this.handleChangeFiltros}
            filtro = {this.state.filtro}
          />
        );
        break;
      case "Inprogress":
        modal = (
          <ModalInproActivity
            actividad={actividad}
            callback={this.handleChangeFiltros}
            filtro = {this.state.filtro}
          />
        );
        break;
      case "Waiting":
        modal = (
          <>
            <CircularProgress size={30} color="secondary" />
            Esperando Confirmación
          </>
        );
        break;
    }
    return modal;
  }
  handleChangePaginator(event, value) {

    this.setState((state) => {
      console.log(state);
      return {
        filtro: {
          name: state.filtro.name,
          userConsulting: state.filtro.userConsulting,
          labels: state.filtro.labels,
          stateActiviti: state.filtro.stateActiviti,
          pag: value - 1,
          rangeCredrits: state.filtro.rangeCredrits,
          team: state.filtro.team,
          participants: state.filtro.participants,
        }
      }
    }, () => {
      var temp = [];
      console.log(this.state.filtro);
      axiosHeader.post(`/team/filters/${this.state.filtro.name}`, this.state.filtro
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
  load() {
    if (this.state.load) {

      this.handleChangeFiltros(this.state.filtro)
      this.setState({ load: false })
    }

  };
  render() {
    return (
      <Fragment>
        
        <Menu />
        <FiltrosEstados props={this.handleChangeFiltros} typeActivity="GroupActivity"/>
        <div style={{ position: "relative", left: "0%",top:"90%",with:"30%"}}>       
          <Pagination size="small" style={{ position: "relative", "margin-left": "40%",top:"90%",}} count={this.state.count} page={this.state.filtro.pag + 1} onChange={this.handleChangePaginator} color="primary" />
        </div>
        {this.state.activities ? (
          this.state.activities.length > 0 ? (
            <Grid style={{ marginTop: "10px" }} container spacing={0} justify="center">
              {this.state.activities.map((actividad, i) => {
                console.log(actividad);
                return (
                  <ActividadCard
                    activity={actividad}
                    key={i}
                    ModalAceptar={this.getModalButton(actividad)}
                  />
                );
              })}
            </Grid>
          ) : (
              <NoActivities />
            )
        ) : (
            <div style={{ textAlign: "center", marginTop: "8%" }}>
              <CircularProgress />
            Cargando...
            </div>
          )}
      </Fragment>
    );
  }
  
}
