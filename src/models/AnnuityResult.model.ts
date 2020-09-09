export interface AnnuityDataPropsResult {
  data: AnnuityResult;
}

export interface AnnuityResult {
  monthlyPaymentResult: number;
  monthNumberResult: number;
  overpayment: number;
}
