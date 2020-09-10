import { InterestRate } from "../models";

export function getYearInterestRate(
  month: number,
  interestRates: InterestRate[]
) {
  console.log("GYIR", interestRates);
  console.log("month", month);

  let descendRates = interestRates.sort((a, b) => b.startMonth - a.startMonth);
  let index = descendRates
    .map((el) => el.startMonth)
    .findIndex((el) => el < month + 1);
  return descendRates[index].value;
}
