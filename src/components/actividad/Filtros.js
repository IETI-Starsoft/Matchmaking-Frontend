import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { useState } from 'react';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import { MenuList } from '@material-ui/core';
import ListSubheader from '@material-ui/core/ListSubheader';
import { Alert } from 'react-bootstrap';
import TextField from '@material-ui/core/TextField';
const useStyles = makeStyles(theme => ({

    button: {
        display: 'block',
        marginTop: theme.spacing(2),
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150,
        marginLeft: '30%',
    },
    formControlS: {
        margin: theme.spacing(1),
        minWidth: '35%',
        marginLeft: '30%',
    },
    Select: {
        marginLeft: '0%',
        width: '100%'
    }
}));

export default function Filtros({ props }) {
    const classes = useStyles();
    const [value, setValue] = useState("Ninguno");
    const [barra, setbarra] = useState(null);

    const [nameC, setName] = useState("participants");
    const [userConsultingC, setUserConsulting] = useState(JSON.parse(localStorage.getItem("user")).userId);
    const [labelsC, setLabels] = useState([]);
    const [stateActivitiC, setStateActiviti] = useState("Available");
    const [page, setPage] = React.useState(1);

    const [filtro, setFiltro] = useState({
        name: "participants",
        userConsulting: JSON.parse(localStorage.getItem("user")).userId,
        labels: [],
        stateActiviti: "Available",
        pag: 0
    });
    const handleOnSelectActividad = (event) => {
        console.log(event.target.value);
        let user = JSON.parse(localStorage.getItem("user"));
        if (event.target.value != null) {
            let Fil = {
                name: "activity",
                userConsulting: user.userId,
                labels: [event.target.value],
                stateActiviti: "Available",
                participants: null,
                rangeCredrits: null,
                pag: page - 1
            };

            props(Fil);
        }
    };
    const handleOnSelectParticipantes = (event) => {

        console.log(event.target.value);
        let user = JSON.parse(localStorage.getItem("user"));
        if (event.target.value != null) {
            let Fil = {
                name: nameC,
                labels: [],
                userConsulting: userConsultingC,
                participants: event.target.value,
                stateActiviti: stateActivitiC,
                rangeCredrits: null,
                pag: page - 1
            };

            props(Fil);

        };
    };
    const handleOnSelectApuesta = (event) => {
        console.log(event.target.value);
        let user = JSON.parse(localStorage.getItem("user"));

        if (event.target.value != null) {
            let range = event.target.value.split("/");
            let arry = [parseInt(range[0]), parseInt(range[1])];
            let Fil = {
                name: "rangeCredrits",
                userConsulting: user.userId,
                labels: [],
                rangeCredrits: arry,
                stateActiviti: "Available",
                participants: null,
                pag: page - 1
            };
            props(Fil);
        };
    }
    const handleOnSelectNinguno = (event) => {

        let user = JSON.parse(localStorage.getItem("user"));

        let Fil = {
            name: "none",
            userConsulting: user.userId,
            labels: [],
            rangeCredrits: null,
            stateActiviti: "Available",
            participants: null,
            pag: page - 1
        };
        props(Fil);

    }

    const handleChange = event => {
        setValue(event.target.value);
        if (event.target.value === "Actividad") {
            setbarra(<div>


                <TextField
                    className={classes.formControlS}
                    id="standard-search"
                    label="Actividad"
                    onChange={handleOnSelectActividad}
                    defaultValue=""

                />
            </div>
            );
        }
        else if (event.target.value === "Apuesta") {
            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Monto Inscripcion</InputLabel>
                <Select onClick={handleOnSelectApuesta} defaultValue="" input={<Input id="grouped-select" />}>
                    <ListSubheader>Creditos</ListSubheader>
                    <MenuItem value="-1/50">Menor que 50</MenuItem>
                    <MenuItem value="50/101">Entre 50-100</MenuItem>
                    <MenuItem value="101/1000">Mayor que 100</MenuItem>
                </Select>
            </FormControl>
            </div>
            );
        } else if (event.target.value === "Participantes") {

            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Participantes</InputLabel>
                <Select onClick={handleOnSelectParticipantes} defaultValue="" className={classes.Select} input={<Input id="grouped-select" />}>
                    <ListSubheader>Cantidad de participantes</ListSubheader>
                    <MenuItem value="IndividualActivity">Solo</MenuItem>
                    <MenuItem value="GroupActivity">Equipos</MenuItem>
                </Select>
            </FormControl>
            </div>);
        } else {
            handleOnSelectNinguno();
            setbarra(<div></div>)
        }
    };

    return (
        <div>
            <br></br>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.FormLabel}>Filtrar Actividades Por:</FormLabel>
                <br></br>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <Grid container spacing={32} justify="flex-start" >
                        <FormControlLabel value="Actividad" control={<Radio />} label="Actividad" />
                        <FormControlLabel value="Apuesta" control={<Radio />} label="Monto Inscripcion" />
                        <FormControlLabel value="Participantes" control={<Radio />} label="Participantes" />
                        <FormControlLabel value="Ninguno" control={<Radio />} label="Ninguno" />
                    </Grid>
                </RadioGroup>
            </FormControl>
            <div>
                {barra}
            </div>
        </div>
    );
}