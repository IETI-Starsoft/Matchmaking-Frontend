import React from 'react';
import {Amigo} from './Amigo';
import { Container} from '@material-ui/core';


export class AmigoList extends React.Component {

    constructor(props) {
        super(props);
    }


    render() {
        const friendList = this.props.friends.map((friend, i) => {
            return <Amigo key={i} image={friend.image} name={friend.name} stars={friend.stars}/>;
        });

        return (
            <Container>
                {friendList}
            </Container>
        );
    }

}