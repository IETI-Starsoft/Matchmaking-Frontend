import React from 'react';
import {
    Card,
    CardHeader,
    Avatar,
    Box
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';



export class Amigo extends React.Component {

    



    constructor(props) {
        super(props);
        this.state = {
            color: "",
            isSelect: false
        }
        console.log(props.friend);
        this.handleSelect = this.handleSelect.bind(this);
    }


    render() {
        return (
            <Box p={1}>
                <div onClick={this.handleSelect}>
                <Card style={{ background: this.state.color }} >
                    <CardHeader
                        avatar={
                            <Avatar src={this.props.image} />
                        }
                        title={this.props.name}
                        subheader={
                            <Rating value={this.props.stars} readOnly size="small" />
                        }
                    >
                    </CardHeader>
                </Card>
                </div>
            </Box >
        );
    }
    handleSelect(){
        if(this.state.isSelect){
            this.setState ({color:"",isSelect:false});
            this.props.addteam(this.props.friend,false);    
        }else{
            this.setState ({ color: "#3f51b5",isSelect:true });
            this.props.addteam(this.props.friend,true);
        }
    }

}