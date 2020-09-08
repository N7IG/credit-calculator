import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import NumberFormat from 'react-number-format';

import { DISPLAY_NAMES_RUS } from "./display-names";

interface PaymentFormProps {
  handleMonthlyPaymentChange: Function;
}

export const PaymentForm: FunctionComponent<PaymentFormProps> = ({
  handleMonthlyPaymentChange,
}) => (
    <div>
      <NumberFormat
        customInput={TextField}
        id="outlined-full-width"
        label={DISPLAY_NAMES_RUS.MONTHLY_PAYMENT_LABEL}
        fullWidth
        margin="normal"
        variant="outlined"
        thousandSeparator={" "}
        allowNegative={false}
        decimalScale={2}
        onValueChange={(values) => {
          const { value } = values;
          handleMonthlyPaymentChange(value);
        }}
      />
    </div>
  );
