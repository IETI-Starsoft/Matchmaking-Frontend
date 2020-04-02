import React from "react";
import { Container, Avatar, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ModalTransfer from "../../payments/transfer/ModalTransfer";

export default function Integrante(props) {
  return (
    <Container>
      <Box
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Avatar size="medium" />
        <Box>
          <p>{props.name}</p>
          <Rating value={props.stars} readOnly />
          <ModalTransfer
            name={props.name}
            id={props.userId}
            type="teamUser"
            teamId={props.teamId}
          />
        </Box>
      </Box>
    </Container>
  );
}
