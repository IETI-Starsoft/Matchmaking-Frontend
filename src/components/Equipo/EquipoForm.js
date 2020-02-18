import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

export default function AddressForm() {
  return (
    <React.Fragment>
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
            fullWidth
            autoComplete="billing address-line1"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
