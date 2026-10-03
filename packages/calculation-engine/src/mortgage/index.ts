export interface MortgageEstimateInput {
  principal: number;
  annualInterestRate: number;
  termYears: number;
}

export interface MortgageEstimate {
  principal: number;
  monthlyPayment: number;
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
  const monthlyPayment = monthlyRate === 0
    ? input.principal / paymentCount
    : input.principal * monthlyRate / (1 - Math.pow(1 + monthlyRate, -paymentCount));
  const totalPaid = monthlyPayment * paymentCount;

  return {
    principal: input.principal,
    monthlyPayment,
    totalPaid,
    totalInterest: totalPaid - input.principal,
    paymentCount
  };
}