import React, { useState } from "react";
import Button from "@material-ui/core/Button";

import classes from "./Main.module.scss";
import { ConstForm, PaymentForm } from "../../components";
import { DISPLAY_NAMES_RUS } from "./display-names";
import { calculateFromMonthlyPayment } from "../../utils";

export const Main = () => {
  const [sum, setSum] = useState<number>(0);
  const [monthNumber, setMonthNumber] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);

  const handleSumChange = (value: string) => {
    setSum(Number(value));
  };

  const handleInterestRateChange = (value: string) => {
    setInterestRate(Number(value));
  };

  const handleMonthlyPaymentChange = (value: string) => {
    setMonthlyPayment(Number(value));
  };

  return (
    <div className={classes.main}>
      {DISPLAY_NAMES_RUS.APP_NAME}
      <ConstForm
        handleSumChange={handleSumChange}
        handleInterestRateChange={handleInterestRateChange}
      />
      <PaymentForm handleMonthlyPaymentChange={handleMonthlyPaymentChange} />
      <hr />
      <Button
        color="primary"
        onClick={() => {
          const { months, overpayment } = calculateFromMonthlyPayment(
            sum,
            monthlyPayment,
            [{ interestRate, startMonth: 1 }]
          ) as any;

          setMonthNumber(months);
          setOverpayment(overpayment.toFixed(2));
        }}
      >
        Рассчитать
      </Button>
      Срок выплат составит:
      <span style={{ fontWeight: "bold" }}> {monthNumber}</span> месяцев.
      Переплата составит:
      <span style={{ fontWeight: "bold" }}> {overpayment}</span>.
    </div>
  );
};
