export interface CompoundInterestInput {
  initialCapital: number;
  monthlyContribution: number;
  annualNominalRate: number;
  termYears: number;
}

export interface CompoundInterestEstimate {
  initialCapital: number;
  monthlyContribution: number;
  totalContributions: number;
  interestEarned: number;
  futureValue: number;
  yearlyBalances: number[];
}

export function calculateCompoundInterest(input: CompoundInterestInput): CompoundInterestEstimate {
  if (!Number.isFinite(input.initialCapital) || input.initialCapital < 0) {
    throw new RangeError('El capital inicial debe ser cero o mayor.');
  }
  if (!Number.isFinite(input.monthlyContribution) || input.monthlyContribution < 0) {
    throw new RangeError('La aportación mensual debe ser cero o mayor.');
  }
  if (!Number.isFinite(input.annualNominalRate) || input.annualNominalRate < 0 || input.annualNominalRate > 100) {
    throw new RangeError('La rentabilidad anual debe estar entre 0 % y 100 %.');
  }
  if (!Number.isInteger(input.termYears) || input.termYears < 1 || input.termYears > 100) {
    throw new RangeError('El plazo debe ser un número entero entre 1 y 100 años.');
  }
  if (input.initialCapital === 0 && input.monthlyContribution === 0) {
    throw new RangeError('Indica un capital inicial o una aportación mensual mayor que cero.');
  }

  const monthlyRate = input.annualNominalRate / 100 / 12;
  const yearlyBalances = [input.initialCapital];
  let balance = input.initialCapital;

  for (let month = 1; month <= input.termYears * 12; month += 1) {
    balance = balance * (1 + monthlyRate) + input.monthlyContribution;
    if (month % 12 === 0) {
      yearlyBalances.push(balance);
    }
  }

  const totalContributions = input.initialCapital + input.monthlyContribution * input.termYears * 12;
  if (!Number.isFinite(balance) || !Number.isFinite(totalContributions)) {
    throw new RangeError('Los importes introducidos superan el rango que se puede estimar.');
  }

  return {
    initialCapital: input.initialCapital,
    monthlyContribution: input.monthlyContribution,
    totalContributions,
    interestEarned: balance - totalContributions,
    futureValue: balance,
    yearlyBalances
  };
}
