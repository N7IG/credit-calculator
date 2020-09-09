export function calculateDiffPayments(
  sum: number,
  monthsToPay: number,
  percentage: number,
  monthsArray: string[]
): Array<any> {
  const finalResult = [];
  let totalBasicDept = sum;
  const basicDebtPeymentPerMonth = sum / monthsToPay;
  const currentDay = new Date();
  let currentMonth = currentDay.getMonth();
  let currentYear = currentDay.getFullYear();

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
    });

    currentMonth++;
    if (currentMonth === 12) {
      currentYear++;
      currentMonth -= 12;
    }
  }

  console.log(finalResult);
  return finalResult;
}
