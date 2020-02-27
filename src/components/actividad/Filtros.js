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
import ListSubheader from '@material-ui/core/ListSubheader';
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
    Select:{
        marginLeft: '0%',
        width:'100%'
    }
}));
export default function Filtros() {
    const classes = useStyles();
    const [value, setValue] = useState(null);
    const [barra, setbarra] = useState(null);
    const handleChange = event => {
        setValue(event.target.value);
        if (event.target.value === "Actividad") {

            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Actividad</InputLabel>
                <Select defaultValue="" input={<Input id="grouped-select" />}>
                    <ListSubheader>Deportes</ListSubheader>
                    <MenuItem value="Futbol">Futbol</MenuItem>
                    <MenuItem value="Balonsesto">Balonsesto</MenuItem>
                    <MenuItem value="Voleybol">Voleybol</MenuItem>
                </Select>
            </FormControl>
            </div>
            );
        }
        else if(event.target.value === "Apuesta") {
            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Apuesta</InputLabel>
                <Select defaultValue="" input={<Input id="grouped-select" />}>
                    <ListSubheader>Monto</ListSubheader>
                    <MenuItem value="Menor50">Menor que 50.000$</MenuItem>
                    <MenuItem value="Entre50Y100">Entre 50.000$-100.000$</MenuItem>
                    <MenuItem value="MayorQue100">Mayor que 100.000$</MenuItem>
                </Select>
            </FormControl>
            </div>
            );
        }else if(event.target.value === "Participantes"){
            setbarra(<div> <FormControl className={classes.formControlS}>
                <InputLabel htmlFor="grouped-select">Participantes</InputLabel>
                <Select defaultValue="" className={classes.Select} input={<Input id="grouped-select" />}>
                    <ListSubheader>Cantidad de participantes</ListSubheader>
                    <MenuItem value="Equipos">Solo</MenuItem>
                    <MenuItem value="Parejas">Parejas</MenuItem>
                    <MenuItem value="Solo">Equipos</MenuItem>
                </Select>
            </FormControl>
            </div>);
        }else{
            setbarra(<div></div>)
        }
    };
    
    return (
        <div>
            <br></br>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend" className={classes.FormLabel}>Filtrar Actividades Por:</FormLabel>
                <br></br>
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange} hidden="">
                    <Grid container spacing={32} justify="flex-start">
                        <FormControlLabel value="Actividad" control={<Radio />} label="Actividad" />
                        <FormControlLabel value="Apuesta" control={<Radio />} label="Apuesta" />
                        <FormControlLabel value="Participantes" control={<Radio />} label="Participantes" />
                        <FormControlLabel value="None" control={<Radio />} label="Ninguno" />
                    </Grid>
                </RadioGroup>
            </FormControl>
            <div>
                {barra}
            </div>
        </div>
    );
}