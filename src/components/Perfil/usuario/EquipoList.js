import React from 'react';
import {Equipo} from './Equipo';
import { Container} from '@material-ui/core';


export class EquipoList extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const teamList = this.props.teams.map((team, i) => {
            return <Equipo
         key={i} image={team.image} name={team.name} stars={team.stars}/>;
        });

        return (
            <Container>
                {teamList}
            </Container>
        );
    }

}