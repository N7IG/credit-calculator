import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

import { DISPLAY_NAMES_RUS } from "./display-names";

interface ConstFormProps {
  handleSumChange: Function;
  handleInterestRateChange: Function;
}

export const ConstForm: FunctionComponent<ConstFormProps> = ({
  handleSumChange,
  handleInterestRateChange,
}) => (
  <div>
    <TextField
      id="outlined-full-width"
      type="number"
      label={DISPLAY_NAMES_RUS.SUM_INPUT_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
      onChange={(event) => {
        handleSumChange(event.target.value);
      }}
    />

    <TextField
      id="outlined-full-width"
      type="number"
      label={DISPLAY_NAMES_RUS.PERCENT_INPUT_LABEL}
      fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      margin="normal"
      variant="outlined"
      onChange={(event) => {
        handleInterestRateChange(event.target.value);
      }}
    />
  </div>
);
