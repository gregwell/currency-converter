import React from "react";
import { InputAdornment, TextField, Grid } from "@material-ui/core";
import useStyles from "./styles";
import Flag from "./Flag/Flag";

const Input = ({ label, country, value, onChange }) => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid item className={classes.label}>
        {label}
      </Grid>
      <Grid item>
        <TextField
          variant="outlined"
          className={classes.textField}
          size="small"
          value={value}
          onChange={onChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <div className={classes.flagAdornment}>
                  <Flag country={country} />
                </div>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <div className={classes.currencyCodeAdornment}>
                  {country === "GB" ? "GBP" : "PLN"}
                </div>
              </InputAdornment>
            ),
            classes: {
              root: classes.input,
              notchedOutline: classes.notchedOutline,
            },
          }}
          inputProps={{
            "aria-label": label,
          }}
        />
      </Grid>
    </div>
  );
};

export default Input;
