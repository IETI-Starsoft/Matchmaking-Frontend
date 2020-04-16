import React, { useEffect, useState } from "react";
import Navbar from "../../menu/NavBar";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import "../../../resources/css/animation.css";
import axiosHeader from "../../../api/axiosHeader";

export default function AgregarAmigos() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchStr, setSearchStr] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(open && options.length === 0);
  const userId = JSON.parse(localStorage.getItem("user")).userId;

  useEffect(() => {
    let active = true;

    axiosHeader
      .get(`/autocomplete/users/id/${userId}?searchstr=${searchStr}`)
      .then((response) => {
        if (active) {
          const emails = response.data;

          setOptions(Object.keys(emails).map((key) => emails[key]));

          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      active = false;
    };
  }, [loading, searchStr]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSearchStr = () => (event) => {
    setLoading(true);
    setSearchStr(event.target.value);
  };

  const handleSubmit = () => (event) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("user"));
    axiosHeader
      .post(`/users/id/${user.userId}/friends/${selectedUser}`)
      .then((response) => {
        alert(`¡${selectedUser} ahora es un amigo!`);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box p={2}>
          <div className="animated fadeIn fast" style={{ textAlign: "center" }}>
            <Typography variant="h2">Agregar Amigos</Typography>
            <hr />
          </div>
          <div className="animated fadeIn fast">
            <form onSubmit={handleSubmit()}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Autocomplete
                    id="search-users"
                    open={open}
                    onOpen={() => {
                      setOpen(true);
                    }}
                    onClose={() => {
                      setOpen(false);
                    }}
                    getOptionSelected={(option, value) => option === value}
                    getOptionLabel={(option) => option}
                    options={options}
                    loading={loading}
                    onChange={(event, value) => {
                      setSelectedUser(value);
                    }}
                    renderInput={(params) => (
                      <FormControl fullWidth>
                        <TextField
                          {...params}
                          label="Buscar"
                          variant="outlined"
                          value={searchStr}
                          onChange={handleSearchStr()}
                          InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                              <>
                                {loading ? (
                                  <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                              </>
                            ),
                          }}
                        />
                      </FormControl>
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <div style={{ margin: "auto", textAlign: "center" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      className="submit"
                    >
                      Agregar amigo
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </form>
          </div>
        </Box>
      </Container>
    </>
  );
}
