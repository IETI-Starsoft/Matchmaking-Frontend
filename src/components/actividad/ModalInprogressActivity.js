import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { updateWinner, updateLoser } from "../../api/activity";
import Rating from '@material-ui/lab/Rating';
import {upDateRatingTeams} from "../../api/team";
import {upDateRatingUser} from "../../api/user";
export default function ModalInprogressActivity(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, setValue] = React.useState(1);
  const handleSubmitWin = () => {
    let actividad = props.actividad;
    let type;
    let idContrincante;
    let idUser = JSON.parse(localStorage.getItem("user")).userId;
    let winner;
    if (idUser == actividad.owner) {
      if (actividad.idTeam1 != null) {
        type="team";
        idContrincante=actividad.idTeam2;
        winner = actividad.idTeam1;
      } else {
        idContrincante=actividad.idPlayer2;
        type="user";
        winner = actividad.idPlayer1;
      }
    } else {
      if (actividad.idTeam1 != null) {
        type="team";
        idContrincante=actividad.idTeam1;
        winner = actividad.idTeam2;
      } else {
        idContrincante=actividad.idPlayer1;
        type="user";
        winner = actividad.idPlayer2;
      }
    }
    handlerRating(type,idContrincante);
    updateWinner(actividad.id, winner).then(() => {
      
      props.callback(props.filtro);
    });
  };
  const handleSubmitLoser = () => {
    let actividad = props.actividad;
    let idUser = JSON.parse(localStorage.getItem("user")).userId;
    let loser;
    let type;
    let idContrincante;
    if (idUser == actividad.owner) {
      if (actividad.idTeam1 != null) {
        type="team";
        idContrincante=actividad.idTeam2;
        loser = actividad.idTeam1;
      } else {
        idContrincante=actividad.idPlayer2;
        type="user";
        loser = actividad.idPlayer1;
      }
    } else {
      if (actividad.idTeam1 != null) {
        type="team";
        idContrincante=actividad.idTeam1;
        loser = actividad.idTeam2;
      } else {
        idContrincante=actividad.idPlayer1;
        type="user";
        loser = actividad.idPlayer2;
      }
    }
    handlerRating(type,idContrincante);
    updateLoser(actividad.id, loser).then(() => {
      props.callback(props.filtro);
    });
    
  };
  const handlerRating =(type,idContrincante) =>{
    
    if(type=="team"){
      upDateRatingTeams(idContrincante,value);
    }else{
      upDateRatingUser(idContrincante,value);
    }
  }
  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        Resultado
      </Button>

      <Modal show={show} onHide={handleClose} centered="true">
        <Modal.Header closeButton>
          <Modal.Title>Resultado Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Cual fue su resultado en el encuentro, marque la casilla adecuada.
          Recuerde que la plataforma se lleva el 15% del valor del torneo.
          ADVERTENCIA: En caso de que ambos participantes marquen que ganaron o
          perdieron se les descontara 30%.
          <br></br>
          <h3>Califica a tu oponente:</h3>
          <Rating           
          name="simple-controlled"           
          value={value}           
          onChange={(event, newValue) => {             
            setValue(newValue);           
            }}         
            />
        </Modal.Body>
        <Modal.Footer>
          <Button id="win" variant="success" onClick={handleSubmitWin}>
            Gane
          </Button>
          <Button id="loser" variant="danger" onClick={handleSubmitLoser}>
            Perdi
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
