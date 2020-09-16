import React from "react";

import NumberFormat from "react-number-format";

import classes from "./AnnuityResult.module.scss";

import { AnnuityDataPropsResult } from "../../models/index";
import { DISPLAY_NAMES_RUS as RUS } from "./display-names";

export function AnnuityResult(props: AnnuityDataPropsResult) {
  return (
    <div className={classes.resultsContainer}>
      <h2>{RUS.CALCULATION_RESULT}</h2>
      {props.data.monthlyPaymentResult.map((monthlyPayment, index) => (
        <div key={index}>
          {RUS.MONTH_PAYMENT} {index + 1}
          {RUS.NUMERIC_POSTFIX} {RUS.YEAR}:{" "}
          <span>
            <NumberFormat
              value={monthlyPayment}
              thousandSeparator={" "}
              decimalScale={2}
              displayType={"text"}
              style={{ fontWeight: "bold" }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}
