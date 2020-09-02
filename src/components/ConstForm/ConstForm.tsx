import React from "react";
import TextField from "@material-ui/core/TextField";

import "./ConstForm.scss";
import { DISPLAY_NAMES_RUS } from "./display-names";

export function ConstForm() {
  return (
    <div className="ConstForm">
      <TextField
        id="outlined-full-width"
        label={DISPLAY_NAMES_RUS.SUM_INPUT_LABEL}
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        variant="outlined"
      />

      <TextField
        id="outlined-full-width"
        label={DISPLAY_NAMES_RUS.PERCENT_INPUT_LABEL}
        style={{ margin: 8 }}
        fullWidth
        margin="normal"
        variant="outlined"
      />
    </div>
  );
}

// InputLabelProps={{
//   shrink: true,
// }}
