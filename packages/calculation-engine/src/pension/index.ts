export interface PensionEstimateInput {
  currentAge: number;
  currentContributionYears: number;
  retirementAge: number;
  averageMonthlyContributionBase: number;
}

export interface PensionEstimate {
  projectedContributionYears: number;
  replacementPercentage: number;
  regulatoryBase: number;
  monthlyGross: number;
  annualGross: number;
  eligible: boolean;
}

export function calculatePensionEstimate(input: PensionEstimateInput): PensionEstimate {
  if (!Number.isFinite(input.currentAge) || input.currentAge < 16 || input.currentAge > 75) {
    throw new RangeError('La edad actual debe estar entre 16 y 75 años.');
  }
  if (!Number.isFinite(input.retirementAge) || input.retirementAge < input.currentAge || input.retirementAge > 75) {
    throw new RangeError('La edad de jubilación debe ser igual o superior a la actual.');
  }
  if (!Number.isFinite(input.currentContributionYears) || input.currentContributionYears < 0) {
    throw new RangeError('Los años cotizados no pueden ser negativos.');
  }
  if (!Number.isFinite(input.averageMonthlyContributionBase) || input.averageMonthlyContributionBase <= 0) {
    throw new RangeError('La base de cotización debe ser mayor que cero.');
  }

  const projectedContributionYears = input.currentContributionYears + input.retirementAge - input.currentAge;
  const eligible = projectedContributionYears >= 15;
  const additionalMonths = Math.max(0, (projectedContributionYears - 15) * 12);
  const firstIncrementMonths = Math.min(additionalMonths, 49);
  const secondIncrementMonths = Math.min(Math.max(0, additionalMonths - 49), 209);
  const replacementPercentage = eligible
    ? Math.min(1, 0.5 + firstIncrementMonths * 0.0021 + secondIncrementMonths * 0.0019)
    : 0;
  const regulatoryBase = input.averageMonthlyContributionBase * 300 / 350;
  const monthlyGross = regulatoryBase * replacementPercentage;

  return {
    projectedContributionYears,
    replacementPercentage,
    regulatoryBase,
    monthlyGross,
    annualGross: monthlyGross * 14,
    eligible
  };
}