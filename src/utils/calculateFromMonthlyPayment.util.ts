export function calculateFromMonthlyPayment(
  sum: number,
  moPayment: number,
  percentageArray: Array<{ interestRate: number; startMonth: number }>,
  detailed: boolean = false
): {
  months: number;
  overpayment: number;
  error?: string;
} {
  const THRESHOLD: number = 1;
  let i = 0;
  let overpayment = 0;
  let descendPercArray = percentageArray.sort(
    (a, b) => b.startMonth - a.startMonth
  );
  const maxyrs = 200;

  function getYearPercent(month: number) {
    let index = descendPercArray
      .map((el) => el.startMonth)
      .findIndex((el) => el < month + 1);
    return descendPercArray[index].interestRate;
  }

  function rec(sum: number) {
    if (sum > 0 + THRESHOLD) {
      i++;
      let yearPercent = getYearPercent(i);
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
