import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm({props}) {
  const handleChange = e => {
    e.preventDefault();
    props(e.target.value);
    
  };
  return (
    <React.Fragment>
      <from>
        <Typography variant="h6" gutterBottom>
          General
      </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              required
              id="Ename"
              name="Ename"
              label="Nombre Equipo"
              onChange={handleChange}
              fullWidth
              autoComplete="billing address-line1"
            />
          </Grid>
        </Grid>
        </from>
    </React.Fragment>
  );
}
