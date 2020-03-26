import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Payment from "./Payments";
import TextField from "@material-ui/core/TextField";

export default function Example(props) {
  const [show, setShow] = React.useState(false);
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAmount = e => {
    setAmount(e.target.value);
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Recargar Creditos
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Recargar Creditos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TextField
            id="text"
            label="Creditos"
            variant="outlined"
            onChange={handleAmount}
            value={amount}
            type="number"
          />
          <br />
          Cantidad a pagar: $ {amount * 3000} pesos
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Payment
            amount={amount}
            value={amount * 3000}
            setCredits={props.setCredits}
            closeModal={handleClose}
          />
        </Modal.Footer>
      </Modal>
    </>
  );
}
