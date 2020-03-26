import React from 'react';
import {Amigo} from './Amigo';
import { Container} from '@material-ui/core';


export class AmigoList extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const friendList = this.props.friends.map((friend, i) => {
            return <Amigo key={i} image={friend.image} name={friend.firstName.toUpperCase() + " " + friend.lastName.toUpperCase()} stars={friend.rating}/>;
        });

        return (
            <Container>
                {friendList}
            </Container>
        );
    }

}