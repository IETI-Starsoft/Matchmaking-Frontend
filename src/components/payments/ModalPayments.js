import React from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import Payment from "./Payments";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import ButtonM from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(45deg, #71db77 30%, #23f57e 90%)",
    border: 0,
    borderRadius: 15,
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#242424",
    height: 40,
    width: 100,
    padding: "0 30px",
  },
  buttonm: {
    //color: "#71db77",
    backgroundColor: "#23f57e",
  },
}));

export default function Example(props) {
  const [show, setShow] = React.useState(false);
  const [amount, setAmount] = React.useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  const classes = useStyles();

  return (
    <>
      <ButtonM onClick={handleShow} className={classes.root}>
        Recargar
      </ButtonM>
      {/* <Button
        variant="primary"
        onClick={handleShow}
        className={classes.buttonm}
      >
        Recargar Creditos
      </Button> */}

      <Modal show={show} onHide={handleClose} centered="true">
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
