export type PersonalLoanAmortizationSystem = 'french' | 'spanish';

export const DEFAULT_AMORTIZATION_SYSTEM: PersonalLoanAmortizationSystem = 'french';

export interface PersonalLoanInput {
  principal: number;
  annualInterestRate: number;
  termMonths: number;
  openingFeePercent: number;
  upfrontExpenses: number;
  monthlyAdditionalCost: number;
  /** Sistema de amortización. Si no se indica, se usa el francés (cuota constante). */
  amortizationSystem?: PersonalLoanAmortizationSystem;
}

export interface PersonalLoanInstallment {
  period: number;
  payment: number;
  principalAmortized: number;
  interest: number;
  remainingPrincipal: number;
}

export interface PersonalLoanEstimate {
  amortizationSystem: PersonalLoanAmortizationSystem;
  principal: number;
  amountReceived: number;
  firstMonthlyPayment: number;
  lastMonthlyPayment: number;
  totalPrincipalRepaid: number;
  totalInterest: number;
  openingFee: number;
  upfrontExpenses: number;
  monthlyAdditionalCost: number;
  totalAdditionalCosts: number;
  totalInstallments: number;
  totalCostOfCredit: number;
  totalOutOfPocket: number;
  paymentCount: number;
  amortizationSchedule: PersonalLoanInstallment[];
}

export interface PersonalLoanScenario {
  annualInterestRate: number;
  firstMonthlyPayment: number;
  lastMonthlyPayment: number;
  totalInterest: number;
  totalCostOfCredit: number;
  totalOutOfPocket: number;
}

const MAX_PRINCIPAL = 1_000_000;
const MAX_TERM_MONTHS = 600;
const MAX_RATE_PERCENT = 100;
const MAX_ADDITIONAL_COST = 1_000_000;
const VALID_SYSTEMS: readonly PersonalLoanAmortizationSystem[] = ['french', 'spanish'];

function roundMoney(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

function validateInput(input: PersonalLoanInput): void {
  if (!Number.isFinite(input.principal) || input.principal < 1 || input.principal > MAX_PRINCIPAL) {
    throw new RangeError('El importe solicitado debe estar entre 1 € y 1.000.000 €.');
  }
  if (
    !Number.isFinite(input.annualInterestRate) ||
    input.annualInterestRate < 0 ||
    input.annualInterestRate > MAX_RATE_PERCENT
  ) {
    throw new RangeError('El TIN debe estar entre 0 % y 100 %.');
  }
  if (
    !Number.isInteger(input.termMonths) ||
    input.termMonths < 1 ||
    input.termMonths > MAX_TERM_MONTHS
  ) {
    throw new RangeError('El plazo debe ser un número entero entre 1 y 600 meses.');
  }
  if (
    !Number.isFinite(input.openingFeePercent) ||
    input.openingFeePercent < 0 ||
    input.openingFeePercent > MAX_RATE_PERCENT
  ) {
    throw new RangeError('La comisión de apertura debe estar entre 0 % y 100 %.');
  }
  if (
    !Number.isFinite(input.upfrontExpenses) ||
    input.upfrontExpenses < 0 ||
    input.upfrontExpenses > MAX_ADDITIONAL_COST
  ) {
    throw new RangeError('Los gastos iniciales deben estar entre 0 € y 1.000.000 €.');
  }
  if (
    !Number.isFinite(input.monthlyAdditionalCost) ||
    input.monthlyAdditionalCost < 0 ||
    input.monthlyAdditionalCost > MAX_ADDITIONAL_COST
  ) {
    throw new RangeError('El coste periódico debe estar entre 0 € y 1.000.000 € al mes.');
  }
  if (
    input.amortizationSystem !== undefined &&
    !VALID_SYSTEMS.includes(input.amortizationSystem)
  ) {
    throw new RangeError('El sistema de amortización debe ser "french" o "spanish".');
  }
}

/** Cuota constante del sistema francés: P·i / (1 − (1 + i)^−n). */
function calculateFrenchPayment(
  principal: number,
  monthlyRate: number,
  termMonths: number
): number {
  if (monthlyRate === 0) {
    return roundMoney(principal / termMonths);
  }
  const discountFactor = Math.pow(1 + monthlyRate, -termMonths);
  return roundMoney((principal * monthlyRate) / (1 - discountFactor));
}

export function calculatePersonalLoan(input: PersonalLoanInput): PersonalLoanEstimate {
  validateInput(input);

  const amortizationSystem = input.amortizationSystem ?? DEFAULT_AMORTIZATION_SYSTEM;
  const principal = roundMoney(input.principal);
  const monthlyRate = input.annualInterestRate / 100 / 12;

  // Sistema español: capital constante. Sistema francés: cuota constante.
  const spanishRegularPrincipal = roundMoney(principal / input.termMonths);
  const frenchPayment = calculateFrenchPayment(principal, monthlyRate, input.termMonths);

  let remainingPrincipal = principal;
  let totalPrincipalRepaid = 0;
  let totalInterest = 0;
  let totalInstallments = 0;
  const amortizationSchedule: PersonalLoanInstallment[] = [];

  for (let period = 1; period <= input.termMonths; period++) {
    const interest = roundMoney(remainingPrincipal * monthlyRate);
    const isLastPayment = period === input.termMonths;

    let principalAmortized: number;
    if (isLastPayment) {
      // La última cuota liquida el capital restante y absorbe los redondeos.
      principalAmortized = remainingPrincipal;
    } else if (amortizationSystem === 'spanish') {
      principalAmortized = Math.min(remainingPrincipal, spanishRegularPrincipal);
    } else {
      principalAmortized = Math.min(remainingPrincipal, roundMoney(frenchPayment - interest));
    }

    const payment = roundMoney(principalAmortized + interest);

    remainingPrincipal = roundMoney(remainingPrincipal - principalAmortized);
    totalPrincipalRepaid = roundMoney(totalPrincipalRepaid + principalAmortized);
    totalInterest = roundMoney(totalInterest + interest);
    totalInstallments = roundMoney(totalInstallments + payment);
    amortizationSchedule.push({
      period,
      payment,
      principalAmortized,
      interest,
      remainingPrincipal
    });
  }

  const openingFee = roundMoney((principal * input.openingFeePercent) / 100);
  const upfrontExpenses = roundMoney(input.upfrontExpenses);
  const monthlyAdditionalCost = roundMoney(input.monthlyAdditionalCost);
  const totalAdditionalCosts = roundMoney(
    openingFee + upfrontExpenses + monthlyAdditionalCost * amortizationSchedule.length
  );
  const totalCostOfCredit = roundMoney(totalInterest + totalAdditionalCosts);

  return {
    amortizationSystem,
    principal,
    amountReceived: principal,
    firstMonthlyPayment: amortizationSchedule[0].payment,
    lastMonthlyPayment: amortizationSchedule[amortizationSchedule.length - 1].payment,
    totalPrincipalRepaid,
    totalInterest,
    openingFee,
    upfrontExpenses,
    monthlyAdditionalCost,
    totalAdditionalCosts,
    totalInstallments,
    totalCostOfCredit,
    totalOutOfPocket: roundMoney(totalInstallments + totalAdditionalCosts),
    paymentCount: amortizationSchedule.length,
    amortizationSchedule
  };
}

export function comparePersonalLoanScenarios(
  input: PersonalLoanInput,
  annualInterestRates: readonly number[]
): PersonalLoanScenario[] {
  if (annualInterestRates.length !== 3) {
    throw new RangeError('Indica exactamente tres tipos para comparar los escenarios.');
  }

  // Al propagar `...input`, los escenarios usan el mismo sistema que el selector.
  return annualInterestRates.map(annualInterestRate => {
    const estimate = calculatePersonalLoan({ ...input, annualInterestRate });
    return {
      annualInterestRate,
      firstMonthlyPayment: estimate.firstMonthlyPayment,
      lastMonthlyPayment: estimate.lastMonthlyPayment,
      totalInterest: estimate.totalInterest,
      totalCostOfCredit: estimate.totalCostOfCredit,
      totalOutOfPocket: estimate.totalOutOfPocket
    };
  });
}