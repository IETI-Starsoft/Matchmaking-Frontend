import React from 'react';
import { 
    Card, 
    CardHeader, 
    Avatar,
    Box,
    IconButton
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import GroupWorkIcon from '@material-ui/icons/GroupWork';


export class Equipo extends React.Component {

    constructor(props){
        super(props);
    }


    render() {
        return (
            <Box p={1}>
                <Card >
                    <CardHeader
                        avatar={
                            <Avatar src={this.props.image}/>
                        }
                        action={
                            <IconButton aria-label="settings" href="/perfil-equipo">
                              <GroupWorkIcon />
                            </IconButton>
                          }
                        title={this.props.name}
                        subheader={
                            <Rating value={this.props.stars} readOnly size="small"/>
                        }
                    >
                    </CardHeader>
                </Card>
            </Box>
        );
    }


}