import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import NumberFormat from "react-number-format";

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
    <NumberFormat
      customInput={TextField}
      label={DISPLAY_NAMES_RUS.SUM_INPUT_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
      thousandSeparator={" "}
      allowNegative={false}
      decimalScale={2}
      onValueChange={(values) => {
        const { value } = values;
        handleSumChange(value);
      }}
    />
    <NumberFormat
      customInput={TextField}
      label={DISPLAY_NAMES_RUS.PERCENT_INPUT_LABEL}
      fullWidth
      InputProps={{
        endAdornment: <InputAdornment position="end">%</InputAdornment>,
      }}
      margin="normal"
      variant="outlined"
      thousandSeparator={" "}
      allowNegative={false}
      decimalScale={2}
      onValueChange={(values) => {
        const { value } = values;
        handleInterestRateChange(value);
      }}
    />
  </div>
);
