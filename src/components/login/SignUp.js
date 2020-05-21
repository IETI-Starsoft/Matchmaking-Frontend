import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import logo from "./logoM.jpeg";
import axios from "axios";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "#71db77" }} color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" style={{ color: "#71db77" }} href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  cssLabel: {
    color: 'white'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
      color: "white"
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'white !important'
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
    marginTop: theme.spacing(3)
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

export default function SignUp() {
  const classes = useStyles();

  const handleSubmit = e => {
    e.preventDefault();

    axios.post("https://matchmaking-iback.herokuapp.com/users/register", {
      firstName: e.target.firstName.value,
      lastName: e.target.lastName.value,
      email: e.target.email.value,
      password: e.target.password.value,
      rating: 0.0,
      credits: 0,
      bio: "",
      friends: [],
      teams: [],
      activities: [],
      imageFileURL: "",
      nRating: 0,
    })
      .then(function (response) {
        alert("Registered!");
        window.location.href = "/";
      })
      .catch(function (error) {
        alert("Error in registering user " + error);
      });

  };

  return (
    <div className={classes.main}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <img src={logo} alt="logo" className={classes.logo} />
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit}
            method="POST"
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  InputLabelProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssLabel,
                      focused: classes.cssFocused,
                    },
                  }}
                  InputProps={{
                    style: { color: 'white' },
                    classes: {
                      root: classes.cssOutlinedInput,
                      focused: classes.cssFocused,
                      notchedOutline: classes.notchedOutline,
                    },
                  }}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
              </Grid>
                <br></br>
                <br></br>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              
              className={classes.submit}
            >
              Sign Up
          </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/" style={{ color: "#71db77" }} variant="body2">
                  Already have an account? Sign in
              </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
