import React from "react";
import { Equipo } from "./Equipo";
import { Container } from "@material-ui/core";

export class EquipoList extends React.Component {
  constructor(props) {
    
    super(props);
    console.log(this.props.teams);
  }

  render() {
    
    const teamList = this.props.teams.map((team, i) => {
      return (
        <Equipo
          key={i}
          teamId={team.teamId}
          image={team.image}
          name={team.name}
          stars={team.rating}
        />
      );
    });

    return <Container>{teamList}</Container>;
  }
}
