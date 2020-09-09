import round from "lodash/round";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";

import {
  ConstForm,
  PaymentForm,
  TermForm,
  AnnuityResult,
  DiffResult,
} from "../../components";
import {
  calculateFromMonthlyPayment,
  calculateFromTerm,
  calculateDiffPayments,
} from "../../utils";
import { DISPLAY_NAMES_RUS, DISPLAY_MONTHS_NAMES_RUS } from "./display-names";
import classes from "./App.module.scss";

import { DiffTableRawContent } from "../../models/index";

export const App = () => {
  const [sum, setSum] = useState<number>(0);
  const [monthNumberResult, setMonthNumberResult] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const [monthlyPaymentResult, setMonthlyPaymentResult] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<string>("annuity");
  const [diffPaymentTypeResult, setDiffPaymentResult] = useState<
    Array<DiffTableRawContent>
  >([]);

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

  const handlePaymentTypeChange = (value: string) => {
    setPaymentType(value);
  };

  return (
    <div className={classes.app}>
      <header>{DISPLAY_NAMES_RUS.APP_NAME}</header>
      <ConstForm
        handleSumChange={handleSumChange}
        handleInterestRateChange={handleInterestRateChange}
      />
      <div className={classes.choosableFormsContainer}>
        <div className={classes.choosableFormCard}>
          <TermForm
            handleTermChange={handleTermChange}
            handlePaymentTypeChange={handlePaymentTypeChange}
          />
        </div>
        <div className={classes.choosableFormCard}>
          <PaymentForm
            handleMonthlyPaymentChange={handleMonthlyPaymentChange}
          />
        </div>
      </div>
      <Button
        color="primary"
        variant="outlined"
        onClick={() => {
          if (paymentType === "annuity") {
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
          } else {
            const calculatedDiffPaymentTypeResult: Array<DiffTableRawContent> = calculateDiffPayments(
              sum,
              term,
              interestRate,
              DISPLAY_MONTHS_NAMES_RUS
            );

            setDiffPaymentResult(calculatedDiffPaymentTypeResult);
          }
        }}
      >
        Рассчитать
      </Button>
      {paymentType === "annuity" ? (
        <AnnuityResult
          data={{
            monthlyPaymentResult,
            monthNumberResult,
            overpayment,
          }}
        />
      ) : diffPaymentTypeResult.length ? (
        <DiffResult data={diffPaymentTypeResult} />
      ) : (
        " "
      )}
    </div>
  );
};
