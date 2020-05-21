import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "./logoM.jpeg";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" style={{color:"#71db77"}} color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" style={{color:"#71db77"}} href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}



const useStyles = makeStyles(theme => ({
  login: {
    background: "linear-gradient(45deg, #71db77 30%, #23f57e 90%)",
    border: 0,
    borderRadius: 15,
    //boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#242424",
    width: "%",
    height: "70%",
    padding: "0 30px",

  },
  cssLabel: {
    color: 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
      color:"white"
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main
  },
  logo: {
    width: "35%",
    height: "35%",
    margin: theme.spacing(1)
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: "#71db77",
    borderRadius: 15,
  },
  main: {
    position: "absolute",
    top: "0%",
    left: "0%",
    width: "100%",
    height: "100%",
    backgroundColor: "#222222",
  }
}));

export default function SignIn() {
  const classes = useStyles();
  const handleSubmit = e => {
    e.preventDefault();
    axios.post('https://matchmaking-iback.herokuapp.com/users/login', {
      email: e.target.email.value,
      password: e.target.password.value
    })
      .then(function (response) {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        window.location.href = "/perfil";
      })
      .catch(function (error) {
        alert("Check credentials");
      });

  };

  return (
    <div className={classes.main}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="logo" className={classes.logo} />

          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              InputLabelProps={{
                style: {color: 'white'},
                classes: {
                  
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                  color:classes.text
                },
              }}
              InputProps={{
                style: {color: 'white'},
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{
                style: {color: 'white'},
                classes: {
                  root: classes.cssLabel,
                  focused: classes.cssFocused,
                },
              }}
              InputProps={{
                style: {color: 'white'},
                classes: {
                  root: classes.cssOutlinedInput,
                  focused: classes.cssFocused,
                  notchedOutline: classes.notchedOutline,
                },
              }}
              id="password"
              autoComplete="current-password"
            />
            <br></br>
            <Button
              type="submit"
              fullWidth
              variant="contained"

              className={classes.submit}
            >
              Sign In
          </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" style={{color:"#71db77"}} variant="body2">
                  Forgot password?
              </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" style={{color:"#71db77"}} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
