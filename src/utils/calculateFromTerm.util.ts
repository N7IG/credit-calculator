export function calculateFromTerm(
  sum: number,
  yearInterest: number,
  periods: number
): number {
  const i = yearInterest / 12 / 100;
  const n = periods;
  const coefficient = (i * (1 + i) ** n) / ((i + 1) ** n - 1);

  return yearInterest ? coefficient * sum : sum / periods;
}
