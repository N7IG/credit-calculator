import { calculateFromTerm } from "./calculateFromTerm.util";

export function calculateFromTermAdvanced(
  sum: number,
  percentageArray: Array<{ interestRate: number; startMonth: number }>,
  periods: number
): number[] {
  // the only difference when calculating monthly payment with multiple interest rates is that we should
  // recalculate an annuity payment for the balance and periods left when interest rate changes
  let balance: number = sum;
  let monthlyPayments: number[] = [];
  percentageArray.map((data) => data.startMonth);
  percentageArray.forEach((data, index) => {
    if (index) {
      balance -= getSumPayedForPeriod(
        balance,
        monthlyPayments[index - 1],
        percentageArray[index - 1].interestRate,
        data.startMonth - percentageArray[index - 1].startMonth
      );
    }
    let monthlyPayment = calculateFromTerm(
      balance,
      data.interestRate,
      periods - data.startMonth + 1
    );
    monthlyPayments[index] = monthlyPayment;
  });

  return monthlyPayments;
}

function getSumPayedForPeriod(
  initialSum: number,
  monthlyPayment: number,
  interestRate: number,
  periods: number
): number {
  const monthlyRate: number = interestRate / 100 / 12;
  const b1: number = monthlyPayment - initialSum * monthlyRate;

  return (b1 * ((1 + monthlyRate) ** periods - 1)) / monthlyRate;
}
