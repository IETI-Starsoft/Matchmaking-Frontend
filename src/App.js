import React from 'react';
import logo from './logo.svg';
import './App.css';
import {CreateActivity} from "./components/crear_actividad/createActivity";
import {BrowserRouter as Router,Route} from "react-router-dom";

class App extends React.Component {
  constructor(props){
    super(props);
    
  }
  render(){
    const a = ()=><CreateActivity />;
    return (
      <Router>
            
         
        <div className="App">
        <Route exact path="/holo" component={a} />
          <header className="App-header">
            
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Router>
    );
  }
  
}

export default App;