import React, { useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ListSubheader from '@material-ui/core/ListSubheader';
import clsx from 'clsx';
import Pagination from "@material-ui/lab/Pagination";
import axiosHeader from "../../api/axiosHeader";
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
        minWidth: '30%',
        marginLeft: '30%',
    },
    formControlB: {
        margin: theme.spacing(1),
        minWidth: '50%',
        marginLeft: '15%',
        marginTop: '30px'
    },
    Select: {
        marginLeft: '0%',
        width: '100%'
    }
}));
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 4;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function FiltrosEstados({ props }) {
    const classes = useStyles();
    const [value, setValue] = useState("Ninguno");
    const [barra, setbarra] = useState(null);
    const [page, setPage] = React.useState(1);
    const [teamId, setTeamId] = React.useState("All");
    const [status, setStatus]=React.useState("Finished");
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    const [teams, setTeams] = React.useState([]);
    const [rangeCredits,setRangeCredits]=React.useState(null);
    const [tag,setTag]=React.useState([]);
    const [name,setName]=React.useState("none");
    useEffect(() => {
        axiosHeader.get(`/users/id/${userId}/teams`)
            .then(response => {
                setTeams(response.data)
                try {
                    setTeamId(response.data[0].teamId);
                }
                catch(error){
                    alert("Usted no se encuentra dentro de ningun equipo");
                };
                
            }
            ).catch(error => {
                alert(error);
            });
        

    }, []);
    const handleOnSelectActividad = (event) => {
        console.log(event.target.value);
        let user = JSON.parse(localStorage.getItem("user"));
        if (event.target.value != null) {
            setRangeCredits(null);
            setTag([event.target.value]);
            setName("activiti");
            let Fil = {
                name: "activiti",
                userConsulting: user.userId,
                labels: [event.target.value],
                stateActiviti:status,
                team:teamId,
                participants: null,
                rangeCredrits: null,
                pag: page - 1
            };

            props(Fil);
        }
    };
    const handleOnSelectApuesta = (event) => {
        console.log(event.target.value);
        let user = JSON.parse(localStorage.getItem("user"));
        if (event.target.value != null) {
            let range = event.target.value.split("/");
            let array = [parseInt(range[0]), parseInt(range[1])];
            setRangeCredits(array);
            setTag([]);
            setName("rangeCredrits");
            let Fil = {
                name: "rangeCredrits",
                userConsulting: user.userId,
                labels: [],
                rangeCredrits: array,
                stateActiviti: status,
                participants: null,
                team:teamId,
                pag: page - 1
            };
            props(Fil);
        };
    }
    const handleOnSelectNinguno = (event) => {
        let user = JSON.parse(localStorage.getItem("user"));
        if (event != null) {
            setRangeCredits(null);
            setTag([]);
            setName("none");
            let Fil = {
                name: "none",
                userConsulting: user.userId,
                labels: [],
                rangeCredrits: null,
                stateActiviti: status,
                participants: null,
                pag: page - 1,
                team:teamId
            };
            props(Fil);

        }
    }

    const handleChange = event => {
        setValue(event.target.value);
        if (event.target.value === "Actividad") {
            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Actividad</InputLabel>
                <Select defaultValue="" onClick={handleOnSelectActividad} input={<Input id="grouped-select" />}>
                    <ListSubheader>Deportes</ListSubheader>
                    <MenuItem value="futbol">Futbol</MenuItem>
                    <MenuItem value="basketball">Basketball</MenuItem>
                    <MenuItem value="volleyball">Voleybol</MenuItem>
                </Select>
            </FormControl>
            </div>
            );
        }
        else if (event.target.value === "Apuesta") {
            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Apuesta</InputLabel>
                <Select onClick={handleOnSelectApuesta} defaultValue="" input={<Input id="grouped-select" />}>
                    <ListSubheader>Creditos</ListSubheader>
                    <MenuItem value="-1/50">Menor que 50</MenuItem>
                    <MenuItem value="50/101">Entre 50-100</MenuItem>
                    <MenuItem value="101/1000">Mayor que 100</MenuItem>
                </Select>
            </FormControl>
            </div>
            );
        } else {
            handleOnSelectNinguno(event.target.value);
            setbarra(<div></div>);
        }
    };
    
    const handleChangeTeam = event => {
        console.log(event.target.value)
        let user = JSON.parse(localStorage.getItem("user"));
        setTeamId(event.target.value);
        let Fil = {
            name: name,
            userConsulting: user.userId,
            labels: tag,
            rangeCredrits: rangeCredits,
            stateActiviti: status,
            participants: null,
            pag: page - 1,
            team:event.target.value
        };
        props(Fil);
    }
    const handleChangeStatus =event=> {
        console.log(event.target.value)
        let user = JSON.parse(localStorage.getItem("user"));
        setStatus(event.target.value);
        let Fil = {
            name: name,
            userConsulting: user.userId,
            labels: tag,
            rangeCredrits: rangeCredits,
            stateActiviti: event.target.value,
            participants: null,
            pag: page - 1,
            team:teamId
        };
        
        props(Fil);
    }
    return (
        <div>
            <Grid container spacing={0}>

                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControlB}>
                        <InputLabel htmlFor="grouped-select-2">Seleccionar Estado De La Actividad</InputLabel>
                        <Select 
                        value={status} 
                        onChange={handleChangeStatus}
                        input={<Input id="grouped-select-2" />}>
                            <MenuItem value="Available">Disponible</MenuItem>
                            <MenuItem value="Accepted">Aceptado</MenuItem>
                            <MenuItem value="Waiting">En Espera</MenuItem>
                            <MenuItem value="Inprogress">En Progeso</MenuItem>
                            <MenuItem value="Finished">Finalizado</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl className={classes.formControlB}>
                        <InputLabel id="demo-mutiple-name-label">Seleccione El Equipo</InputLabel>
                        <Select
                            labelId="demo-mutiple-name-label"
                            id="demo-mutiple-name"
                            displayEmpty
                            onChange={handleChangeTeam}
                            value={teamId}
                            input={<Input id="demo-mutiple-name-label"/>}
                            MenuProps={MenuProps}
                        >
                            <MenuItem key="Todos" value="All">
                                    Todos
                                </MenuItem>
                            {teams.map((team) => (
                                <MenuItem key={team.teamId} value={team.teamId}>
                                    {team.name}
                                </MenuItem>
                                
                            ))}
                            
                            
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
                            
            <br></br>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.FormLabel}>Filtrar Actividades Por:</FormLabel>

                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <Grid container spacing={32} justify="flex-start" >
                        <FormControlLabel value="Actividad" control={<Radio />} label="Actividad" />
                        <FormControlLabel value="Apuesta" control={<Radio />} label="Apuesta" />
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