import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";

import { DISPLAY_NAMES_RUS } from "./display-names";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";

interface TermFormProps {
  handleTermChange: Function;
}

export const TermForm: FunctionComponent<TermFormProps> = ({
  handleTermChange,
}) => (
  <div>
    <TextField
      id="outlined-full-width"
      label={DISPLAY_NAMES_RUS.TERM_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
      onChange={(event) => handleTermChange(event.target.value)}
    />
    {/* value={value} onChange={handleChange} */}
    <RadioGroup aria-label="annuity" value="annuity" name="annuity">
      <FormControlLabel
        value="annuity"
        control={<Radio />}
        label={DISPLAY_NAMES_RUS.ANNUITY_RADIO}
      />
      <FormControlLabel
        value="differential"
        control={<Radio />}
        label={DISPLAY_NAMES_RUS.DIFF_RADIO}
      />
    </RadioGroup>
  </div>
);
