import round from "lodash/round";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import NumberFormat from 'react-number-format';

import { ConstForm, PaymentForm, TermForm } from "../../components";
import { calculateFromMonthlyPayment, calculateFromTerm } from "../../utils";
import { DISPLAY_NAMES_RUS } from "./display-names";
import classes from "./Main.module.scss";

export const Main = () => {
  const [sum, setSum] = useState<number>(0);
  const [monthNumberResult, setMonthNumberResult] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const [monthlyPaymentResult, setMonthlyPaymentResult] = useState<number>(0);

  const handleSumChange = (value: string) => {
    setSum(Number(value));
  };

  const handleInterestRateChange = (value: string) => {
    setInterestRate(Number(value));
  };

  const handleMonthlyPaymentChange = (value: string) => {
    setMonthlyPayment(Number(value));
  };

  const handleTermChange = (value: string) => {
    setTerm(Number(value));
  };

  return (
    <div className={classes.main}>
      <header>{DISPLAY_NAMES_RUS.APP_NAME}</header>
      <ConstForm
        handleSumChange={handleSumChange}
        handleInterestRateChange={handleInterestRateChange}
      />
      <hr />
      <div className={classes.choosableFormsContainer}>
        <div className={classes.choosableFormCard}>
          <TermForm handleTermChange={handleTermChange} />
        </div>
        <div className={classes.choosableFormCard}>
          <PaymentForm
            handleMonthlyPaymentChange={handleMonthlyPaymentChange}
          />
        </div>
      </div>
      <hr />
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          const { months, overpayment } = calculateFromMonthlyPayment(
            sum,
            monthlyPayment,
            [{ interestRate, startMonth: 1 }]
          );

          const calculateFromTermResult: number = calculateFromTerm(
            sum,
            interestRate,
            term
          );

          setMonthNumberResult(months);
          setOverpayment(round(overpayment, 2));
          setMonthlyPaymentResult(round(calculateFromTermResult, 2));
        }}
      >
        Рассчитать
      </Button>
      <div className={classes.resultsContainer}>
        <div>
          Ежемесячный платёж:{" "}
          <span ><NumberFormat value={monthlyPaymentResult} thousandSeparator={" "} displayType={'text'} style={{ fontWeight: "bold" }} /></span>
          <br />
          Срок выплат составит:{" "}
          <span ><NumberFormat value={monthNumberResult} thousandSeparator={" "} displayType={'text'} style={{ fontWeight: "bold" }} /></span>{" "}
          месяцев
        </div>
        <div>
          Переплата составит:{" "}
          <span ><NumberFormat value={overpayment} thousandSeparator={" "} displayType={'text'} style={{ fontWeight: "bold" }} /></span>
        </div>
      </div>
    </div>
  );
};
