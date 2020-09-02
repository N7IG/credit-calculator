import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";

import { DISPLAY_NAMES_RUS } from "./display-names";

interface PaymentFormProps {
  handleMonthlyPaymentChange: Function;
}

export const PaymentForm: FunctionComponent<PaymentFormProps> = ({
  handleMonthlyPaymentChange,
}) => (
  <div>
    <TextField
      id="outlined-full-width"
      label={DISPLAY_NAMES_RUS.MONTHLY_PAYMENT_LABEL}
      fullWidth
      margin="normal"
      variant="outlined"
      onChange={(event) => handleMonthlyPaymentChange(event.target.value)}
    />
  </div>
);
