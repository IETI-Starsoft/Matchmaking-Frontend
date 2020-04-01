import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/login/Login";
import SignUp from "./components/login/SignUp";
import Perfil from "./components/Perfil/usuario/PerfilUsuario";

import CreateActivity from "./components/crear_actividad/createActivity";
import CrearEquipo from "./components/Equipo/CreacionEquipo";
import { ListaDeActividades } from "./components/actividad/ListaDeActividades";
import PerfilEquipo from "./components/Perfil/equipo/PerfilEquipo";
import TransferCredits from "./components/payments/TransferCredits";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const LoginView = () => <Login />;
    const SignUpView = () => <SignUp />;
    const HomeView = () => <Perfil />;

    const CrearMatchHomeView = () => <CreateActivity />;
    const CrearEquipoView = () => <CrearEquipo />;
    const BuscarMatchView = () => <ListaDeActividades />;

    const PerfilEquipoView = () => <PerfilEquipo />;
    const TransferirCreditos = () => <TransferCredits />;
    //<Route exact path="/amigos" component={HomeView} />
    //<Route exact path="/mis-equipos" component={HomeView} />
    //<Route exact path="/mis-matches" component={HomeView} />
    return (
      <Router>
        <div className="App">
          <div>
            <Route exact path="/" component={LoginView} />
            <Route exact path="/sign-up" component={SignUpView} />
            <Route exact path="/perfil" component={HomeView} />

            <Route exact path="/crear-match" component={CrearMatchHomeView} />
            <Route exact path="/crear-equipo" component={CrearEquipoView} />
            <Route exact path="/buscar-match" component={BuscarMatchView} />

            <Route exact path="/perfil-equipo" component={PerfilEquipoView} />
            <Route exact path="/transfer" component={TransferirCreditos} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
