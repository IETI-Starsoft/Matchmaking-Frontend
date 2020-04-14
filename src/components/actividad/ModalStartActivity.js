import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import {
  updateIndividualActivity,
  updateGroupActivity,
} from "../../api/activity";

export default function ModalStartActivity(props) {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    let actividad = props.actividad;
    actividad.state = "Waiting";
    if (actividad.idTeam1 != null) {
      updateGroupActivity(actividad).then(() => {
        alert("Actividad aceptada");
        props.callback();
      });
    } else {
      updateIndividualActivity(actividad).then(() => {
        alert("Actividad aceptada");
        props.callback();
      });
    }
    handleClose();
  };

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
          <Button variant="info" onClick={handleSubmit}>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
