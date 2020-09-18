import { DiffTableRawContent, InterestRate } from "../models/index";
import { getYearInterestRate } from "./getYearInterestRate.util";

export function calculateDiffPayments(
  sum: number,
  monthsToPay: number,
  interestRates: Array<InterestRate>,
  monthsArray: string[]
): Array<DiffTableRawContent> {
  const finalResult: Array<DiffTableRawContent> = [];
  let totalBasicDept: number = sum;
  let basicDebtPaymentPerMonth: number;
  const basicDebtPaymentPerEachMonth: number = Number(
    (sum / monthsToPay).toFixed(2)
  );
  const basicDebtPaymentForLastMonth: number = Number(
    (sum - basicDebtPaymentPerEachMonth * (monthsToPay - 1)).toFixed(2)
  );
  const currentDay: Date = new Date();
  let currentMonth: number = currentDay.getMonth();
  let currentYear: number = currentDay.getFullYear();

  finalResult.push({
    paymentPeriod: { month: monthsArray[currentMonth], year: currentYear },
    paymentAmount: 0,
    amountOfDebt: 0,
    amountOfPercentage: 0,
    leftDebtAmount: totalBasicDept,
  });

  currentMonth++;

  for (let i = 0; i < monthsToPay; i++) {
    if (i < monthsToPay - 1) {
      basicDebtPaymentPerMonth = basicDebtPaymentPerEachMonth;
    } else {
      basicDebtPaymentPerMonth = basicDebtPaymentForLastMonth;
    }

    let daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    let percentage = getYearInterestRate(i + 1, interestRates);
    let currentMonthPercentageCoeff =
      ((percentage / 100) * daysInCurrentMonth) / 365;
    let percentagePayment = totalBasicDept * currentMonthPercentageCoeff;

    totalBasicDept -= basicDebtPaymentPerMonth;
    finalResult.push({
      paymentPeriod: { month: monthsArray[currentMonth], year: currentYear },
      paymentAmount:
        Math.round(
          (basicDebtPaymentPerMonth + percentagePayment + Number.EPSILON) * 100
        ) / 100,
      amountOfDebt:
        Math.round((basicDebtPaymentPerMonth + Number.EPSILON) * 100) / 100,
      amountOfPercentage:
        Math.round((percentagePayment + Number.EPSILON) * 100) / 100,
      leftDebtAmount: Math.round((totalBasicDept + Number.EPSILON) * 100) / 100,
    });

    currentMonth++;
    if (currentMonth === 12) {
      currentYear++;
      currentMonth -= 12;
    }
  }
  return finalResult;
}
