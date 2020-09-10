import round from "lodash/round";
import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

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

import { DiffTableRawContent, PaymentType } from "../../models/index";
import { ByPaymentResult } from "../../components/ByPaymentResult";

export const App = () => {
  const [sum, setSum] = useState<number>(0);
  const [monthNumberResult, setMonthNumberResult] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [interestRate, setInterestRate] = useState<number>(0);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const [monthlyPaymentResult, setMonthlyPaymentResult] = useState<number>(0);
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.Annuity
  );
  const [diffPaymentTypeResult, setDiffPaymentResult] = useState<
    Array<DiffTableRawContent>
  >([]);

  const [selectedTab, setSelectedTab] = React.useState(
    DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD
  );

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

  const handlePaymentTypeChange = (value: PaymentType) => {
    setPaymentType(value);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: string) => {
    setSelectedTab(newTab);
    setSum(0);
    setInterestRate(0);
    setMonthlyPayment(0);
    setTerm(0);
    setPaymentType(PaymentType.Annuity);
    setDiffPaymentResult([]);
    setMonthlyPaymentResult(0);
    setMonthNumberResult(0);
    setOverpayment(0);
  };

  return (
    <div className={classes.app}>
      <section className={classes.header}>
        <div className={classes.dollarIcon}>
          <AttachMoneyIcon />
        </div>
        <h1>{DISPLAY_NAMES_RUS.APP_NAME}</h1>
      </section>
      <section className={classes.form}>
        <TabContext value={selectedTab}>
          <AppBar position="static">
            <TabList
              className={classes.tabHeader}
              onChange={handleTabChange}
              aria-label="tabs"
              indicatorColor="primary"
            >
              <Tab
                label={DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD}
                value={DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD}
              />
              <Tab
                label={DISPLAY_NAMES_RUS.BY_PAYMENT_AMMOUT}
                value={DISPLAY_NAMES_RUS.BY_PAYMENT_AMMOUT}
              />
            </TabList>
          </AppBar>
          <TabPanel value={DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD}>
            <ConstForm
              handleSumChange={handleSumChange}
              handleInterestRateChange={handleInterestRateChange}
            />
            <TermForm
              handleTermChange={handleTermChange}
              handlePaymentTypeChange={handlePaymentTypeChange}
            />
          </TabPanel>
          <TabPanel value={DISPLAY_NAMES_RUS.BY_PAYMENT_AMMOUT}>
            <ConstForm
              handleSumChange={handleSumChange}
              handleInterestRateChange={handleInterestRateChange}
            />
            <PaymentForm
              handleMonthlyPaymentChange={handleMonthlyPaymentChange}
            />
          </TabPanel>
        </TabContext>
        <hr />
        <Button
          className={classes.resultButton}
          color="primary"
          variant="outlined"
          onClick={() => {
            if (selectedTab === DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD) {
              if (paymentType === PaymentType.Annuity) {
                const calculateFromTermResult: number = calculateFromTerm(
                  sum,
                  interestRate,
                  term
                );

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
            } else {
              const { months, overpayment } = calculateFromMonthlyPayment(
                sum,
                monthlyPayment,
                [{ interestRate, startMonth: 1 }],
                true
              );

              setMonthNumberResult(months);
              setOverpayment(round(overpayment, 2));
            }
          }}
        >
          Рассчитать
        </Button>
      </section>
      <section>
        {selectedTab === DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD ? (
          paymentType === PaymentType.Annuity ? (
            <AnnuityResult
              data={{
                monthlyPaymentResult,
              }}
            />
          ) : diffPaymentTypeResult.length ? (
            <DiffResult data={diffPaymentTypeResult} />
          ) : (
            " "
          )
        ) : (
          <ByPaymentResult
            data={{
              monthNumberResult,
              overpayment,
            }}
          />
        )}
      </section>
    </div>
  );
};
