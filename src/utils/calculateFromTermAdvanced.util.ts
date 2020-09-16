import { calculateFromTerm } from "./calculateFromTerm.util";
import { InterestRate } from "../models";

export function calculateFromTermAdvanced(
  sum: number,
  interestRates: Array<InterestRate>,
  periods: number
): number[] {
  // the only difference when calculating monthly payment with multiple interest rates is that we should
  // recalculate an annuity payment for the balance and periods left when interest rate changes
  let balance: number = sum;
  let monthlyPayments: number[] = [];
  interestRates.map((rate) => rate.startMonth);
  interestRates.forEach((rate, index) => {
    if (index) {
      balance -= getSumPayedForPeriod(
        balance,
        monthlyPayments[index - 1],
        interestRates[index - 1].value,
        rate.startMonth - interestRates[index - 1].startMonth
      );
    }
    let monthlyPayment = calculateFromTerm(
      balance,
      rate.value,
      periods - rate.startMonth + 1
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
