import { AppBar, Button, Tab } from "@material-ui/core";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import round from "lodash/round";
import React from "react";
import { DISPLAY_MONTHS_NAMES_RUS } from "../../containers/App/display-names";
import { DiffTableRawContent, PaymentType } from "../../models";
import {
  calculateDiffPayments,
  calculateFromMonthlyPayment,
  calculateFromTermAdvanced,
} from "../../utils/";
import { ConstForm } from "../ConstForm";
import { PaymentForm } from "../PaymentForm";
import { TermForm } from "../TermForm";

import classes from "./App.module.scss";

export const UserInteraction = ({
  sum,
  term,
  monthlyPayment,
  interestRates,
  paymentType,
  selectedTab,
  handleTabChange,
  handleSumChange,
  handleInterestRateChange,
  handleTermChange,
  handlePaymentTypeChange,
  handleMonthlyPaymentChange,
  setMonthNumberResult,
  setMonthlyPaymentResult,
  setDiffPaymentResult,
  setOverpayment,
  setShowResults,
}: any) => {
  return (
    <section className={classes.form}>
      <TabContext value={selectedTab}>
        <AppBar position="static">
          <TabList
            className={classes.tabHeader}
            onChange={handleTabChange}
            aria-label="tabs"
            indicatorColor="primary"
          >
            <Tab label="По сроку кредита" value="По сроку кредита" />
            <Tab label="По сумме платежа" value="По сумме платежа" />
          </TabList>
        </AppBar>
        <TabPanel value="По сроку кредита">
          <ConstForm
            handleSumChange={handleSumChange}
            handleInterestRateChange={handleInterestRateChange}
          />
          <TermForm
            handleTermChange={handleTermChange}
            handlePaymentTypeChange={handlePaymentTypeChange}
          />
        </TabPanel>
        <TabPanel value="По сумме платежа">
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
          //   "По сроку кредита" - make it enum
          if (selectedTab === "По сроку кредита") {
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
  );
};
