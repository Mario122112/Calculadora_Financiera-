export interface MortgageEstimateInput {
  principal: number;
  annualInterestRate: number;
  termYears: number;
}

export interface MortgageEstimate {
  principal: number;
  firstMonthlyPayment: number;
  lastMonthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  paymentCount: number;
}

export function calculateMortgage(input: MortgageEstimateInput): MortgageEstimate {
  if (!Number.isFinite(input.principal) || input.principal <= 0) {
    throw new RangeError('El importe de la hipoteca debe ser mayor que cero.');
  }
  if (!Number.isFinite(input.annualInterestRate) || input.annualInterestRate < 0) {
    throw new RangeError('El interés anual no puede ser negativo.');
  }
  if (!Number.isFinite(input.termYears) || input.termYears <= 0) {
    throw new RangeError('El plazo debe ser mayor que cero.');
  }

  const paymentCount = Math.round(input.termYears * 12);
  const monthlyRate = input.annualInterestRate / 100 / 12;
  const monthlyPrincipal = input.principal / paymentCount;
  const firstMonthlyPayment = monthlyPrincipal + input.principal * monthlyRate;
  const lastMonthlyPayment = monthlyPrincipal + monthlyPrincipal * monthlyRate;
  const totalInterest = input.principal * monthlyRate * (paymentCount + 1) / 2;
  const totalPaid = input.principal + totalInterest;

  return {
    principal: input.principal,
    firstMonthlyPayment,
    lastMonthlyPayment,
    totalPaid,
    totalInterest,
    paymentCount
  };
}