import React from 'react';
import { Typography, Input } from '@material-ui/core';
import { Box } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/styles';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Navbar from "../../menu/NavBar";
import Grid from '@material-ui/core/Grid';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';
import { Container } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import axiosHeader from "../../../api/axiosHeader";
import '../../../resources/css/animation.css';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    layout: {
        width: "70%",
        display: "block",
        marginLeft: "auto",
        marginRight: "auto"
    },
    paper: {
        marginTop: "10%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px"
    },
}));

const themeMui = createMuiTheme({
    palette: {
        primary: {
            main: '#43a047',
        },
        secondary: {
            main: '#ffffff',
        },
    },
});


export default function EditarPerfil() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        name: "",
        lastname: "",
        bio: "",
        file: null,
    });

    const handleNameChange = () => event => {
        setState({ ...state, name: event.target.value });
    };


    const handleLastnameChange = () => event => {
        setState({ ...state, lastname: event.target.value });
    };

    const handleBioChange = () => event => {
        setState({ ...state, bio: event.target.value });
    };

    const handleInputChange = () => e => {
        e.preventDefault();
        setState({ ...state, file: e.target.files[0] });
    };

    const handleSubmit = () => e => {
        e.preventDefault();
        const updateUser = (user) => {
            user.firstName = state.name != "" ? state.name : user.firstName;
            user.lastName = state.lastname != "" ? state.lastname : user.lastName;
            user.bio = state.bio != "" ? state.bio : user.bio;
            axiosHeader.put("/users", user)
                .then(response => {
                    localStorage.setItem("user",JSON.stringify(response.data));
                    window.location.href = "/perfil";
                })
                .catch(error => {
                    console.log(error);
                    alert("error");
                });
        };
        let userId = JSON.parse(localStorage.getItem("user")).userId;
        axiosHeader.get(`/users/id/${userId}`)
        .then( response => {
            let user = response.data;
            JSON.stringify(localStorage.setItem("user", user));
            if (state.file != null){
                let data = new FormData();
                data.append("file", state.file);
                data.append("userId", user.userId);
            
                axiosHeader.post("/files", data)
                    .then(response => {
                        user.imageFileURL = state.file.name;
                        updateUser(user);
                    })
                    .catch(error => {
                        alert("Error cargando imagen.");  
                    });
            }
            else{
                updateUser(user);
            }
        })
        .catch( error => {
            alert(error);
        });

    };


    return (
        <div>
            <Navbar />
            <Container>
                <main className={classes.layout}>
                    <Paper className={classes.paper}>
                        <Typography variant="h3">Editar Perfil</Typography>
                        <form className="form" onSubmit={handleSubmit()}>
                            <FormControl margin="normal"  fullWidth>
                                <InputLabel htmlFor="desc">Nombre</InputLabel>
                                <Input
                                    id="name"
                                    name="name"
                                    value={state.name}
                                    onChange={handleNameChange()}
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal"  fullWidth>
                                <InputLabel htmlFor="desc">Apellido</InputLabel>
                                <Input
                                    id="lastname"
                                    name="lastname"
                                    value={state.lastname}
                                    onChange={handleLastnameChange()}
                                    autoFocus />
                            </FormControl>
                            <FormControl margin="normal"  fullWidth>
                                <TextField
                                    id="standard-multiline-static"
                                    label="Bio"
                                    value={state.bio}
                                    onChange={handleBioChange()}
                                    multiline
                                    rows="4"
                                />
                            </FormControl>
                            <FormControl >
                                <div className={classes.imageButton}>
                                    <Grid container spacing={3} >
                                        <Grid item xs={12} direction={'row'}>
                                            <Grid container spacing={2} >
                                                <Grid item>
                                                    <Typography>Seleccionar imagen de perfil:</Typography>
                                                </Grid>
                                                <Grid item>
                                                    <input accept="image/*" id="icon-button-file" type="file" style={{ display: "none" }} onChange={handleInputChange()} />
                                                    <label htmlFor="icon-button-file">
                                                        <IconButton color="primary" aria-label="upload picture" component="span">
                                                            <PhotoCamera />
                                                        </IconButton>
                                                    </label>
                                                </Grid>
                                                <Grid item>{state.file !== null ? state.file.name : ""}</Grid>
                                            </Grid>
                                        </Grid> 
                                    </Grid>
                                </div>
                            </FormControl>
                            <Box justifyContent="center" display="flex">
                                <ThemeProvider theme={themeMui}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="submit"
                                        
                                        startIcon={<SaveIcon />}
                                    >
                                        Guardar
                                    </Button>
                                </ThemeProvider>
                            </Box>
                        </form>
                    </Paper>
                </main>
            </Container>
        </div>
    );
}