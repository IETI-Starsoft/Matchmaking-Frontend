import React, { Fragment } from 'react';
import { ActividadCard } from './ActividadCard';
import Grid from '@material-ui/core/Grid';
import Menu from "../menu/NavBar";
import Filtros from './Filtros'; 
import ModalMasInfo from './ModalMasInfo'
export class ListaDeActividades extends React.Component {

    constructor(props) {
        super(props);
        this.state = [
            {
                Retador: "Luis Pizza",
                NombreActividad: 'Partido De futbol 5',
                TipoActividad: "Futbol",
                Descripcion: "Partido de futbol amistoso 5 vs 5 a 10 goles",
                Lugar: "Parque San andres calle 80",
                Apuesta: "$ 0",
                Fecha: "15/03/4 Hora:10:00 AM",
                FechaPublicacion: "14/03/4 Hora:10:00 AM"
            },
            {
                Retador: "Diego Corredor",
                NombreActividad: 'Partido De basquetbol',
                TipoActividad: "Basquetbol",
                Descripcion: "Partido de Basquetbol  1 vs 1 a 10 canastas ",
                Lugar: "Parque Simon Bolivar",
                Apuesta: "$ 100.000",
                Fecha: "3/03/4 Hora:10:00 AM",
                FechaPublicacion: "01/03/4 Hora:10:00 AM"
            },
            {
                Retador: "Cristian Lopez",
                NombreActividad: 'Partido De Tennis',
                TipoActividad: "Tennis ",
                Descripcion: "Partido de Tennis  1 vs 1 a 3  sets",
                Apuesta: "$ 50.000",
                Lugar: "Parque Simon Bolivar",
                Fecha: "28/04/4 Hora:10:00 AM",
                FechaPublicacion: "28/03/4 Hora:10:00 AM"
            }
            ,
            {
                Retador: "Cristian Lopez",
                NombreActividad: 'Partido De Tennis',
                TipoActividad: "Tennis ",
                Descripcion: "Partido de Tennis  1 vs 1 a 3  sets",
                Apuesta: "$ 50.000",
                Lugar: "Parque Simon Bolivar",
                Fecha: "28/04/4 Hora:10:00 AM",
                FechaPublicacion: "28/03/4 Hora:10:00 AM"
            }
            ,
            {
                Retador: "Cristian Lopez",
                NombreActividad: 'Partido De Tennis',
                TipoActividad: "Tennis ",
                Descripcion: "Partido de Tennis  1 vs 1 a 3  sets",
                Apuesta: "$ 50.000",
                Lugar: "Parque Simon Bolivar",
                Fecha: "28/04/4 Hora:10:00 AM",
                FechaPublicacion: "28/03/4 Hora:10:00 AM"
            }
            ,
            {
                Retador: "Cristian Lopez",
                NombreActividad: 'Partido De Tennis',
                TipoActividad: "Tennis ",
                Descripcion: "Partido de Tennis  1 vs 1 a 3  sets",
                Apuesta: "$ 50.000",
                Lugar: "Parque Simon Bolivar",
                Fecha: "28/04/4 Hora:10:00 AM",
                FechaPublicacion: "28/03/4 Hora:10:00 AM"
            }
            ,
            {
                Retador: "Cristian Lopez",
                NombreActividad: 'Partido De Tennis',
                TipoActividad: "Tennis ",
                Descripcion: "Partido de Tennis  1 vs 1 a 3  sets",
                Apuesta: "$ 50.000",
                Lugar: "Parque Simon Bolivar",
                Fecha: "28/04/4 Hora:10:00 AM",
                FechaPublicacion: "28/03/4 Hora:10:00 AM"
            }
            
        ];
    }

    render() {
        return (
        
           <Fragment>
                <Menu />
                <Filtros />  
                <Grid container spacing={32} justify="center">
                    {this.state.map((actividad, i) => {
                        return (
                            <ActividadCard props={actividad} />
                        );
                    })}
                </Grid>
            </Fragment>
        ); 


    }

}