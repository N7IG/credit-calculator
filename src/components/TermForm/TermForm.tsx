import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import NumberFormat from "react-number-format";

import { DISPLAY_NAMES_RUS } from "./display-names";
import { RadioGroup, FormControlLabel, Radio } from "@material-ui/core";
import { PaymentType } from "../../models";

interface TermFormProps {
  handleTermChange: Function;
  handlePaymentTypeChange: Function;
}

export const TermForm: FunctionComponent<TermFormProps> = ({
  handleTermChange,
  handlePaymentTypeChange,
}) => (
  <div>
    <NumberFormat
      customInput={TextField}
      label={DISPLAY_NAMES_RUS.TERM_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
      thousandSeparator={" "}
      allowNegative={false}
      decimalScale={0}
      onValueChange={(values) => {
        const { value } = values;
        handleTermChange(value);
      }}
    />
    <RadioGroup
      aria-label="payment_type"
      defaultValue={PaymentType.Annuity}
      onChange={(event) => {
        handlePaymentTypeChange(event.target.value);
      }}
    >
      <FormControlLabel
        value={PaymentType.Annuity}
        control={<Radio />}
        label={DISPLAY_NAMES_RUS.ANNUITY_RADIO}
      />
      <FormControlLabel
        value={PaymentType.Differential}
        control={<Radio />}
        label={DISPLAY_NAMES_RUS.DIFF_RADIO}
      />
    </RadioGroup>
  </div>
);
