import React from "react";

import NumberFormat from "react-number-format";

import classes from "./AnnuityResult.module.scss";

export function AnnuityResult(props: any) {
  return (
    <div className={classes.resultsContainer}>
      <div>
        Ежемесячный платёж:{" "}
        <span>
          <NumberFormat
            value={props.data.monthlyPaymentResult}
            thousandSeparator={" "}
            decimalScale={2}
            displayType={"text"}
            style={{ fontWeight: "bold" }}
          />
        </span>
        <br />
        Срок выплат составит:{" "}
        <span>
          <NumberFormat
            value={props.data.monthNumberResult}
            thousandSeparator={" "}
            decimalScale={0}
            displayType={"text"}
            style={{ fontWeight: "bold" }}
          />
        </span>{" "}
        месяцев
      </div>
      <div>
        Переплата составит:{" "}
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
