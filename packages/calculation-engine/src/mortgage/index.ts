export type MortgageAmortizationSystem = 'french' | 'spanish';

const MAX_TERM_MONTHS = 600;

export interface MortgageEstimateInput {
  principal: number;
  annualInterestRate: number;
  termYears: number;
  /** Por defecto 'french' (cuota constante). */
  amortizationSystem?: MortgageAmortizationSystem;
}

export interface MortgageInstallment {
  period: number;
  payment: number;
  principalAmortized: number;
  interest: number;
  remainingPrincipal: number;
}

export interface MortgageEstimate {
  principal: number;
  firstMonthlyPayment: number;
  lastMonthlyPayment: number;
  totalPaid: number;
  totalInterest: number;
  paymentCount: number;
  amortizationSystem: MortgageAmortizationSystem;
  amortizationSchedule: MortgageInstallment[];
}

/**
 * Calendario mes a mes. No se redondea aquí para que la suma coincida con las
 * fórmulas cerradas de totalPaid y totalInterest; el redondeo es solo de presentación.
 */
function buildAmortizationSchedule(
  system: MortgageAmortizationSystem,
  principal: number,
  monthlyRate: number,
  paymentCount: number,
  frenchPayment: number
): MortgageInstallment[] {
  const schedule: MortgageInstallment[] = [];
  const spanishPrincipal = principal / paymentCount;
  let remaining = principal;

  for (let period = 1; period <= paymentCount; period++) {
    const interest = remaining * monthlyRate;
    const principalAmortized = system === 'spanish' ? spanishPrincipal : frenchPayment - interest;
    const payment = principalAmortized + interest;
    const isLast = period === paymentCount;

    // En la última cuota el saldo es exactamente 0 (evita restos tipo -0,00 por coma flotante).
    remaining = isLast ? 0 : remaining - principalAmortized;

    schedule.push({ period, payment, principalAmortized, interest, remainingPrincipal: remaining });
  }

  return schedule;
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

  
  const amortizationSystem = input.amortizationSystem ?? 'french';
  const paymentCount = Math.round(input.termYears * 12);
  if (paymentCount < 1) {
    throw new RangeError('El plazo debe ser de al menos un mes.');
  }
  if (paymentCount > MAX_TERM_MONTHS) {
  throw new RangeError('El plazo no puede superar los 50 años.');
}
  const monthlyRate = input.annualInterestRate / 100 / 12;

  if (amortizationSystem === 'spanish') {
    // Sistema español: capital constante, cuota decreciente.
    const monthlyPrincipal = input.principal / paymentCount;
    const firstMonthlyPayment = monthlyPrincipal + input.principal * monthlyRate;
    const lastMonthlyPayment = monthlyPrincipal + monthlyPrincipal * monthlyRate;
    const totalInterest = (input.principal * monthlyRate * (paymentCount + 1)) / 2;

    return {
      principal: input.principal,
      firstMonthlyPayment,
      lastMonthlyPayment,
      totalPaid: input.principal + totalInterest,
      totalInterest,
      paymentCount,
      amortizationSystem,
      amortizationSchedule: buildAmortizationSchedule(
        amortizationSystem,
        input.principal,
        monthlyRate,
        paymentCount,
        0
      )
    };
  }

  // Sistema francés: cuota constante.
  // Con interés 0 la fórmula daría 0/0, así que se divide el capital a partes iguales.
  const monthlyPayment =
    monthlyRate === 0
      ? input.principal / paymentCount
      : (input.principal * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -paymentCount));

  const totalPaid = monthlyPayment * paymentCount;

  return {
    principal: input.principal,
    firstMonthlyPayment: monthlyPayment,
    lastMonthlyPayment: monthlyPayment,
    totalPaid,
    totalInterest: totalPaid - input.principal,
    paymentCount,
    amortizationSystem,
    amortizationSchedule: buildAmortizationSchedule(
      amortizationSystem,
      input.principal,
      monthlyRate,
      paymentCount,
      monthlyPayment
    )
  };
}