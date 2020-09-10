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
    </div>
  );
}
