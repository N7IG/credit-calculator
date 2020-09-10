import last from "lodash/last";
import remove from "lodash/remove";
import React, { FunctionComponent, useState } from "react";
import NumberFormat from "react-number-format";

import { Button, IconButton } from "@material-ui/core";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
// import Add from "@material-ui/icons/Add";
import Close from "@material-ui/icons/Close";

import classes from "./ConstForm.module.scss";
import { DISPLAY_NAMES_RUS as RUS } from "./display-names";
import { InterestRate } from "../../models";

// TODO: need to pass types to handle functions
interface ConstFormProps {
  handleSumChange: Function;
  handleInterestRateChange: Function;
}

export const ConstForm: FunctionComponent<ConstFormProps> = ({
  handleSumChange,
  handleInterestRateChange,
}) => {
  // TODO: add type
  const [rates, setRates] = useState<{ id: string; rate?: InterestRate }[]>([
    { id: "1" },
  ]);

  return (
    <div>
      <NumberFormat
        customInput={TextField}
        label={RUS.SUM_INPUT_LABEL}
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
      {rates.map((element, index) => (
        <div className={classes.rate} key={element.id}>
          <NumberFormat
            customInput={TextField}
            label={
              RUS.PERCENT_INPUT_LABEL +
              " " +
              (index + 1) +
              RUS.NUMERIC_POSTFIX +
              " " +
              RUS.YEAR
            }
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
              element.rate = {
                value: Number(value),
                startMonth: 12 * index + 1,
              };
              handleInterestRateChange(rates.map((rate) => rate.rate));
              console.log("cc", JSON.stringify(rates));
            }}
          />
          {element.id === "1" ? (
            ""
          ) : (
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="span"
              onClick={() => {
                let after = remove(rates, (rate) => rate.id !== element.id);

                setRates(after);
                handleInterestRateChange(after.map((rate) => rate.rate));
              }}
            >
              <Close />
            </IconButton>
          )}
        </div>
      ))}
      {/* I tried adding Add icon here but it's styles brake on right click */}
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          setRates([
            ...rates,
            { id: String(Number((last(rates) as any).id) + 1) },
          ]);
        }}
      >
        {RUS.ADD_INTEREST_RATE_LABEL}
      </Button>
    </div>
  );
};
