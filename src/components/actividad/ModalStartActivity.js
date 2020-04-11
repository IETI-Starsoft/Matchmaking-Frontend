import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";

export default function ModalStartActivity(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="info" onClick={handleShow}>
        Iniciar
      </Button>

      <Modal show={show} onHide={handleClose} centered="true">
        <Modal.Header closeButton>
          <Modal.Title>Iniciar Actividad</Modal.Title>
        </Modal.Header>
        <Modal.Body>Esta seguro de iniciar la actividad</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="info">Aceptar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
