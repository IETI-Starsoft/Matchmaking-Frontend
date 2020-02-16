import React from 'react';
import { 
    Card, 
    CardHeader, 
    Avatar,
    Box
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';



export class Amigo extends React.Component {

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