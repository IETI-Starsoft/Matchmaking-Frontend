import React from 'react';
import {Amigo} from './amigoSelect';
import { Container} from '@material-ui/core';


export class AmigoList extends React.Component {

    constructor(props) {
        super(props);
        
    }


    render() {
        const friendList = this.props.friends.map((friend, i) => {
            return <Amigo key={i}  addteam={this.props.addteam} friend={friend} image={friend.image} name={friend.firstName.toUpperCase() + " " + friend.lastName.toUpperCase()} stars={friend.rating}/>;
        });

        return (
            <Container>
                {friendList}
            </Container>
        );
    }

}