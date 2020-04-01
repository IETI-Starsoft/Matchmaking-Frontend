import React from "react";
import Equipo from "./EquipoTransfer";
import { Container } from "@material-ui/core";

export class EquipoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const teamList = this.props.teams.map((team, i) => {
      return (
        <Equipo
          key={i}
          image={team.image}
          name={team.name}
          stars={team.stars}
          teamId={team.teamId}
        />
      );
    });

    return <Container>{teamList}</Container>;
  }
}
