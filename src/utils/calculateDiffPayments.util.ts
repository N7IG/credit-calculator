import { DiffTableRawContent } from "../models/index";

export function calculateDiffPayments(
  sum: number,
  monthsToPay: number,
  percentage: number,
  monthsArray: string[]
): Array<DiffTableRawContent> {
  const finalResult: Array<DiffTableRawContent> = [];
  let totalBasicDept: number = sum;
  const basicDebtPeymentPerMonth: number = sum / monthsToPay;
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
    let daysInCurrentMonth = new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
    let currentMonthPercentageCoeff =
      ((percentage / 100) * daysInCurrentMonth) / 365;
    let percentagePayment = totalBasicDept * currentMonthPercentageCoeff;

    totalBasicDept -= basicDebtPeymentPerMonth;

    finalResult.push({
      paymentPeriod: { month: monthsArray[currentMonth], year: currentYear },
      paymentAmount:
        Math.round(
          (basicDebtPeymentPerMonth + percentagePayment + Number.EPSILON) * 100
        ) / 100,
      amountOfDebt:
        Math.round((basicDebtPeymentPerMonth + Number.EPSILON) * 100) / 100,
      amountOfPercentage:
        Math.round((percentagePayment + Number.EPSILON) * 100) / 100,
      leftDebtAmount: totalBasicDept,
    });

    currentMonth++;
    if (currentMonth === 12) {
      currentYear++;
      currentMonth -= 12;
    }
  }

  return finalResult;
}
