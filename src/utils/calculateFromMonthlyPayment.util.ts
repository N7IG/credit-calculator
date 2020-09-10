import { InterestRate } from "../models";
import { getYearInterestRate } from "./getYearInterestRate.util";

export function calculateFromMonthlyPayment(
  sum: number,
  moPayment: number,
  interestRates: Array<InterestRate>,
  detailed: boolean = false
): {
  months: number;
  overpayment: number;
  error?: string;
} {
  const THRESHOLD: number = 1;
  let i = 0;
  let overpayment = 0;
  const maxyrs = 200;

  function rec(sum: number) {
    if (sum > 0 + THRESHOLD) {
      i++;
      let yearPercent = getYearInterestRate(i, interestRates);
      let percentPayment = (sum * yearPercent) / 12 / 100;
      let debtPayment = Math.min(moPayment - percentPayment, sum);
      overpayment += percentPayment;

      if (detailed) {
        console.group(`month ${i}:`);
        console.log("year percent:", yearPercent);
        console.log("percentPayment:", percentPayment);
        console.log("debt payment:", debtPayment);
        console.log("sum left:", sum - debtPayment);
        console.groupEnd();
      }

      if (i < maxyrs * 12) {
        rec(sum - debtPayment);
      }
    }
  }
  rec(sum);

  return i >= maxyrs * 12
    ? { error: "stack overflow", months: 0, overpayment: 0 }
    : {
        months: i,
        overpayment,
      };
}
