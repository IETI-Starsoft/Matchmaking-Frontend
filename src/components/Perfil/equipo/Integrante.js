import React, { useEffect } from "react";
import { Container, Avatar, Box } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ModalTransfer from "../../payments/transfer/ModalTransfer";
import axiosHeader from "../../../api/axiosHeader";
import BACKEND_URL from "../../../api/URL";

export default function Integrante(props) {
  console.log(props);

  const [image, setImage] = React.useState("");

  useEffect(() => {
    axiosHeader.get(`/users/id/${props.userId}`)
      .then(response => {
        if (
          response.data.imageFileURL != "" ||
          response.data.imageFileURL != null
        ) {
          setImage(`${BACKEND_URL}/files/${props.userId}/${response.data.imageFileURL}`);
        }
      })
      .catch(error => {
        alert(error);
      });
  }, [])

  return (
    <Container>
      <Box
        textAlign="center"
        alignItems="center"
        justifyContent="center"
        display="flex"
      >
        <Avatar size="medium" src={image !== "" ? image : null} />
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
