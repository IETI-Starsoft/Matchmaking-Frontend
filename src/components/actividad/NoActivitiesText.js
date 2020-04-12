import React from "react"
import Typography from '@material-ui/core/Typography';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';

export default function NoActivities() {

    return (

        <div style={{ textAlign: "center", marginTop: "2%" }}>
            <SentimentVeryDissatisfiedIcon style={{ width: "12%", height: "12%" }}></SentimentVeryDissatisfiedIcon>
            <Typography variant="h5" component="h2" style={{}}>
                No tienes actividades actualmente
                </Typography>
            <Typography variant="h5" component="h2" style={{}}>
                <a style={{ color: "green" }} href="/crear-match">¡Crea una!</a> o <a href="/buscar-match"> ¡busca un match!</a>
            </Typography>
        </div>

    )
}