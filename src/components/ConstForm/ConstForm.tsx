import React from "react";
import TextField from "@material-ui/core/TextField";

import { DISPLAY_NAMES_RUS } from "./display-names";

export const ConstForm = () => (
  <div>
    <TextField
      id="outlined-full-width"
      label={DISPLAY_NAMES_RUS.SUM_INPUT_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
    />

    <TextField
      id="outlined-full-width"
      label={DISPLAY_NAMES_RUS.PERCENT_INPUT_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
    />
  </div>
);
