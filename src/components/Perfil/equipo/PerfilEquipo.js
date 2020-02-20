import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Container,
    Grid,
    Paper,
    Box,
    Typography,
    Avatar
} from "@material-ui/core";
import NavBar from "../../menu/NavBar";
import Rating from "@material-ui/lab/Rating";
import Integrante from './Integrante';

const teamImage =
    "https://www.pinclipart.com/picdir/middle/14-148399_employee-self-serve-portal-transparent-team-icon-png.png";

const teamProfileStyles = makeStyles(theme => ({
    top: {
        backgroundColor: "#a0bceb",
        borderColor: "black",
        borderBottomWidth: "1px"
    },
    topContent: {
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        padding: 20
    },
    avatar: {
        width: theme.spacing(15),
        height: theme.spacing(15)
    },
    nameTop: {
        fontSize: 20,
        color: "#212121",
        fontWeight: "600"
    },
    centerContainer: {
        textAlign: "center"
    }
}));

export default function PerfilEquipo(props) {
    const classes = teamProfileStyles();
    const teamMembers = [{
        name: "P1",
        stars: 4
    },
    {
        name: "P2",
        stars: 2
    },
    {
        name: "P3",
        stars: 2
    },
    {
        name: "P4",
        stars: 3
    }
    ]; //props.teamMembers
    const stars = 4; //props.stars
    const name = "Team 1"; //props.name

    return (
        <div>
            <NavBar />
            <Box className={classes.top} borderBottom={1}>
                <Box className={classes.topContent}>
                    <Avatar className={classes.avatar} src={teamImage} />
                </Box>
                <Box className={classes.centerContainer}>
                    <Typography className={classes.nameTop}>{name}</Typography>
                    <Typography variant="body1">RATING</Typography>
                    <Rating value={stars} readOnly />
                </Box>
            </Box>
            <Container>
                <Box p={2} textAlign="center">
                    <Typography variant="h4">Integrantes</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Grid container justify="center" spacing={1}>
                                {teamMembers.map((member,i) => (
                                    <Grid key={i} item>
                                        <Paper>
                                            <Integrante name={member.name} stars={member.stars}/>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </div>
    );
}
