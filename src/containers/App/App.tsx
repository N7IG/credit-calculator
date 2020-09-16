import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Tab from "@material-ui/core/Tab";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import TabContext from "@material-ui/lab/TabContext";
import TabList from "@material-ui/lab/TabList";
import TabPanel from "@material-ui/lab/TabPanel";
import round from "lodash/round";
import React, { useState } from "react";

import {
  AnnuityResult,
  ConstForm,
  DiffResult,
  PaymentForm,
  TermForm,
} from "../../components";
import { ByPaymentResult } from "../../components/ByPaymentResult";
import {
  DiffTableRawContent,
  InterestRate,
  PaymentType,
} from "../../models/index";
import {
  calculateDiffPayments,
  calculateFromMonthlyPayment,
} from "../../utils";
import { calculateFromTermAdvanced } from "../../utils/calculateFromTermAdvanced.util";
import classes from "./App.module.scss";
import { DISPLAY_MONTHS_NAMES_RUS, DISPLAY_NAMES_RUS } from "./display-names";

export const App = () => {
  const [sum, setSum] = useState<number>(0);
  const [monthNumberResult, setMonthNumberResult] = useState<number>(0);
  const [overpayment, setOverpayment] = useState<number>(0);
  const [interestRates, setInterestRates] = useState<InterestRate[]>([]);
  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [term, setTerm] = useState<number>(0);
  const [monthlyPaymentResult, setMonthlyPaymentResult] = useState<
    Array<number>
  >([]);
  const [paymentType, setPaymentType] = useState<PaymentType>(
    PaymentType.Annuity
  );
  const [diffPaymentTypeResult, setDiffPaymentResult] = useState<
    Array<DiffTableRawContent>
  >([]);
  const [selectedTab, setSelectedTab] = React.useState(
    DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD
  );
  const [showResults, setShowResults] = React.useState(false);

  const handleSumChange = (value: string) => {
    setSum(Number(value));
  };

  const handleInterestRateChange = (value: InterestRate[]) => {
    setInterestRates(value);
  };

  const handleMonthlyPaymentChange = (value: string) => {
    setMonthlyPayment(Number(value));
  };

  const handleTermChange = (value: string) => {
    setTerm(Number(value));
  };

  const handlePaymentTypeChange = (value: PaymentType) => {
    setPaymentType(value);
    setShowResults(false);
  };

  // TODO: wtf. why is it repeating
  const handleTabChange = (event: React.ChangeEvent<{}>, newTab: string) => {
    setSelectedTab(newTab);
    setSum(0);
    setInterestRates([]);
    setMonthlyPayment(0);
    setTerm(0);
    setPaymentType(PaymentType.Annuity);
    setDiffPaymentResult([]);
    setMonthlyPaymentResult([]);
    setMonthNumberResult(0);
    setOverpayment(0);
    setShowResults(false);
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
            setShowResults(true);
            if (selectedTab === DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD) {
              if (paymentType === PaymentType.Annuity) {
                const calculateFromTermResult: number[] = calculateFromTermAdvanced(
                  sum,
                  interestRates,
                  term
                );

                setMonthlyPaymentResult(
                  calculateFromTermResult.map((payment) => round(payment, 2))
                );
              } else {
                const calculatedDiffPaymentTypeResult: Array<DiffTableRawContent> = calculateDiffPayments(
                  sum,
                  term,
                  interestRates,
                  DISPLAY_MONTHS_NAMES_RUS
                );

                setDiffPaymentResult(calculatedDiffPaymentTypeResult);
              }
            } else {
              const { months, overpayment } = calculateFromMonthlyPayment(
                sum,
                monthlyPayment,
                interestRates,
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
        {showResults ? (
          selectedTab === DISPLAY_NAMES_RUS.BY_PAYMENT_PERIOD ||
          diffPaymentTypeResult.length ? (
            paymentType === PaymentType.Annuity ? (
              <AnnuityResult
                data={{
                  monthlyPaymentResult,
                }}
              />
            ) : (
              <DiffResult data={diffPaymentTypeResult} />
            )
          ) : (
            <ByPaymentResult
              data={{
                monthNumberResult,
                overpayment,
              }}
            />
          )
        ) : (
          " "
        )}
      </section>
    </div>
  );
};
