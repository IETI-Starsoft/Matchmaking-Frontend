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
import axiosHeader from "../../../api/axiosHeader";

export default function AgregarAmigos() {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [searchStr, setSearchStr] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    axiosHeader
      .get(`/autocomplete/users?searchstr=${searchStr}`)
      .then((response) => {
        if (active) {
          const emails = response.data;
          setOptions(Object.keys(emails).map((key) => emails[key]));
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const handleSearchStr = () => (event) => {
    setSearchStr(event.target.value);
  };

  const handleSubmit = () => (event) => {
    event.preventDefault();
    console.log(selectedUser);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box p={2}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h2">Agregar Amigos</Typography>
            <hr />
          </div>
          <form onSubmit={handleSubmit()}>
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
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit"
            >
              Guardar
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
