export interface DiffTableResultContent {
  data: Array<DiffTableRawContent>;
}

export interface DiffTableRawContent {
  paymentPeriod: {
    month: string;
    year: number;
  };
  paymentAmount: number;
  amountOfDebt: number;
  amountOfPercentage: number;
  leftDebtAmount: number;
}
