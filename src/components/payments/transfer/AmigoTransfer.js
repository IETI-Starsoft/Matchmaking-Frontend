import React from "react";
import { Card, CardHeader, Avatar, Box, IconButton } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import ModalTransfer from "./ModalTransfer";

export default class Amigo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box p={1}>
        <Card>
          <CardHeader
            avatar={<Avatar src={this.props.image} />}
            action={
              <ModalTransfer
                name={this.props.name}
                id={this.props.friendId}
                type="friend"
              />
            }
            title={this.props.name}
            subheader={
              <Rating value={this.props.stars} readOnly size="small" />
            }
          ></CardHeader>
        </Card>
      </Box>
    );
  }
}
