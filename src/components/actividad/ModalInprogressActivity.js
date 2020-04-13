import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function ModalInprogressActivity(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
          <Button variant="success">Gane</Button>
          <Button variant="danger">Perdi</Button>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
