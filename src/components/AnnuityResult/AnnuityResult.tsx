import React from "react";

import NumberFormat from "react-number-format";

import classes from "./AnnuityResult.module.scss";

import { AnnuityDataPropsResult } from "../../models/index";
import { DISPLAY_NAMES_RUS } from "./display-names";

export function AnnuityResult(props: AnnuityDataPropsResult) {
  return (
    <div className={classes.resultsContainer}>
      <div>
        {DISPLAY_NAMES_RUS.MONTH_PAYMENT}:{" "}
        <span>
          <NumberFormat
            value={props.data.monthlyPaymentResult}
            thousandSeparator={" "}
            decimalScale={2}
            displayType={"text"}
            style={{ fontWeight: "bold" }}
          />
        </span>
      </div>
      <div>
        {DISPLAY_NAMES_RUS.CALCULATED_PAYMENT_PERIOD}:{" "}
        <span>
          <NumberFormat
            value={props.data.monthNumberResult}
            thousandSeparator={" "}
            decimalScale={0}
            displayType={"text"}
            style={{ fontWeight: "bold" }}
          />
        </span>{" "}
        {DISPLAY_NAMES_RUS.MONTHS}
        <br />
        {DISPLAY_NAMES_RUS.CALCULATED_OVERPAYMENT}:{" "}
        <span>
          <NumberFormat
            value={props.data.overpayment}
            thousandSeparator={" "}
            decimalScale={2}
            displayType={"text"}
            style={{ fontWeight: "bold" }}
          />
        </span>
      </div>
    </div>
  );
}
