import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import TextField from "@material-ui/core/TextField";
import { IconButton } from "@material-ui/core";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import axiosHeader from "../../../api/axiosHeader";

export default function ModalTransfer(props) {
  const [show, setShow] = React.useState(false);
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  const handleCredit = value => {
    let user = JSON.parse(localStorage.getItem("user"));
    let creditosAct = user.credits;
    user.credits = creditosAct - value;
    localStorage.setItem("user", JSON.stringify(user));
  };

  const handleSubmit = e => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const id = props.id;
    switch (props.type) {
      case "team":
        axiosHeader
          .put("/payments/user/" + userId + "/team/" + id + "/amount/" + amount)
          .then(
            function(response) {
              alert("Envio Exitoso");
              handleCredit(amount);
              window.location.reload(false);
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error);
            alert("Envio Fallido");
          });
        break;
      case "friend":
        axiosHeader
          .put("/payments/user/" + userId + "/user/" + id + "/amount/" + amount)
          .then(
            function(response) {
              alert("Envio Exitoso");
              handleCredit(amount);
              window.location.reload(false);
            }.bind(this)
          )
          .catch(function(error) {
            console.log(error);
          });
        break;
      case "teamUser":
        axiosHeader
          .put(
            "/payments/team/" +
              props.teamId +
              "/user/" +
              id +
              "/amount/" +
              amount
          )
          .then(
            function(response) {
              alert("Envio Exitoso");
              window.location.reload(false);
            }.bind(this)
          )
          .catch(function(error) {
            alert("Envio Fallido");
            console.log(error);
          });
        break;
    }

    handleClose();
  };

  return (
    <>
      <IconButton aria-label="settings" onClick={handleShow}>
        <AttachMoneyIcon />
      </IconButton>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enviar Creditos a {props.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            id="amount"
            label="Creditos"
            variant="outlined"
            onChange={handleAmount}
            value={amount}
            type="number"
          />
          <br />
          Cantidad a pasar: $ {amount} pesos a {props.name}.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
