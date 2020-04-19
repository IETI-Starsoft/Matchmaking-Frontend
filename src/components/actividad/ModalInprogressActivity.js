import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { updateWinner, updateLoser } from "../../api/activity";

export default function ModalInprogressActivity(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmitWin = () => {
    let actividad = props.actividad;
    let idUser = JSON.parse(localStorage.getItem("user")).userId;
    let winner;
    if (idUser == actividad.owner) {
      if (actividad.idTeam1 != null) {
        winner = actividad.idTeam1;
      } else {
        winner = actividad.idPlayer1;
      }
    } else {
      if (actividad.idTeam1 != null) {
        winner = actividad.idTeam2;
      } else {
        winner = actividad.idPlayer2;
      }
    }
    updateWinner(actividad.id, winner).then(() => {
      props.callback();
    });
  };
  const handleSubmitLoser = () => {
    let actividad = props.actividad;
    let idUser = JSON.parse(localStorage.getItem("user")).userId;
    let loser;

    if (idUser == actividad.owner) {
      if (actividad.idTeam1 != null) {
        loser = actividad.idTeam1;
      } else {
        loser = actividad.idPlayer1;
      }
    } else {
      if (actividad.idTeam1 != null) {
        loser = actividad.idTeam2;
      } else {
        loser = actividad.idPlayer2;
      }
    }
    updateLoser(actividad.id, loser).then(() => {
      props.callback();
    });
  };

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
