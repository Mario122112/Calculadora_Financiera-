export interface PensionEstimateInput {
  currentAge: number;
  currentContributionYears: number;
  retirementAge: number;
  averageMonthlyContributionBase: number;
  children: number;
  includeGenderGapSupplement: boolean;
  includeMinimumSupplement: boolean;
  minimumPensionCategory: 'none' | 'no-spouse' | 'spouse-dependent' | 'spouse-not-dependent';
  otherAnnualIncome: number;
  residesInSpain: boolean;
}

export interface PensionEstimate {
  projectedContributionYears: number;
  retirementYear: number;
  statutoryRetirementAge: number;
  replacementPercentage: number;
  regulatoryBase: number;
  monthlyGross: number;
  annualGross: number;
  monthlyChildSupplement: number;
  annualChildSupplement: number;
  monthlyMinimumSupplement: number;
  annualMinimumSupplement: number;
  monthlyTotalGross: number;
  annualTotalGross: number;
  meetsMinimumContribution: boolean;
  meetsOrdinaryRetirementAge: boolean;
  eligible: boolean;
}

const referenceYear = 2026;
const monthlyGenderGapSupplementReference = 36.9;
const annualMaximumPension = 47034.4;
const minimumPensionByCategory = {
  'no-spouse': 13106.8,
  'spouse-dependent': 17592.4,
  'spouse-not-dependent': 12441.8
} as const;
const annualIncomeLimitForMinimumSupplement = {
  'no-spouse': 9442,
  'spouse-dependent': 11013,
  'spouse-not-dependent': 9442
} as const;
const alternativeRegulatoryBaseByYear = [
  { bases: 302, divisor: 352.33 },
  { bases: 304, divisor: 354.67 },
  { bases: 306, divisor: 357 },
  { bases: 308, divisor: 359.33 },
  { bases: 310, divisor: 361.67 },
  { bases: 312, divisor: 364 },
  { bases: 314, divisor: 366.33 },
  { bases: 316, divisor: 368.67 },
  { bases: 318, divisor: 371 },
  { bases: 320, divisor: 373.33 },
  { bases: 322, divisor: 375.67 }
];

function regulatoryBaseFactor(retirementYear: number): number {
  const traditionalFactor = retirementYear <= 2040
    ? 300 / 350
    : retirementYear <= 2043
      ? (306 + (retirementYear - 2041) * 6) / (357 + (retirementYear - 2041) * 7)
      : null;

  const alternativeCalculation = alternativeRegulatoryBaseByYear[retirementYear - referenceYear];
  const alternativeFactor = retirementYear < referenceYear
    ? null
    : alternativeCalculation
      ? alternativeCalculation.bases / alternativeCalculation.divisor
      : 324 / 378;

  if (traditionalFactor === null) {
    return alternativeFactor ?? 300 / 350;
  }
  if (alternativeFactor === null) {
    return traditionalFactor;
  }
  return Math.max(traditionalFactor, alternativeFactor);
}

export function calculatePensionEstimate(input: PensionEstimateInput): PensionEstimate {
  if (!Number.isFinite(input.currentAge) || input.currentAge < 16 || input.currentAge > 75) {
    throw new RangeError('La edad actual debe estar entre 16 y 75 años.');
  }
  if (!Number.isFinite(input.retirementAge) || input.retirementAge < input.currentAge || input.retirementAge > 75) {
    throw new RangeError('La edad de jubilación debe ser igual o superior a la actual y no superar 75 años.');
  }
  if (
    !Number.isFinite(input.currentContributionYears) ||
    input.currentContributionYears < 0 ||
    input.currentContributionYears > input.currentAge - 16
  ) {
    throw new RangeError('Los años cotizados deben ser coherentes con la edad actual.');
  }
  if (!Number.isFinite(input.averageMonthlyContributionBase) || input.averageMonthlyContributionBase <= 0) {
    throw new RangeError('La base de cotización debe ser mayor que cero.');
  }
  if (!Number.isInteger(input.children) || input.children < 0 || input.children > 4) {
    throw new RangeError('El número de hijos debe ser un entero entre 0 y 4.');
  }
  if (typeof input.includeGenderGapSupplement !== 'boolean') {
    throw new RangeError('Debes indicar si quieres simular el complemento por hijos.');
  }
  if (typeof input.includeMinimumSupplement !== 'boolean' || typeof input.residesInSpain !== 'boolean') {
    throw new RangeError('Los datos para simular el complemento a mínimos no son válidos.');
  }
  if (!['none', 'no-spouse', 'spouse-dependent', 'spouse-not-dependent'].includes(input.minimumPensionCategory)) {
    throw new RangeError('La situación conyugal para el complemento a mínimos no es válida.');
  }
  if (!Number.isFinite(input.otherAnnualIncome) || input.otherAnnualIncome < 0) {
    throw new RangeError('Los otros ingresos anuales no pueden ser negativos.');
  }
  if (input.includeMinimumSupplement && input.minimumPensionCategory === 'none') {
    throw new RangeError('Selecciona la situación conyugal para estimar el complemento a mínimos.');
  }

  const projectedContributionYears = input.currentContributionYears + input.retirementAge - input.currentAge;
  const retirementYear = Math.round(referenceYear + input.retirementAge - input.currentAge);
  const projectedContributionMonths = Math.floor(projectedContributionYears * 12 + Number.EPSILON);
  const meetsMinimumContribution = projectedContributionMonths >= 180;
  const requiredContributionMonthsForAge = retirementYear === referenceYear ? 38 * 12 + 3 : 38 * 12 + 6;
  const ordinaryRetirementAge = retirementYear === referenceYear ? 66 + 10 / 12 : 67;
  const statutoryRetirementAge = projectedContributionMonths >= requiredContributionMonthsForAge
    ? 65
    : ordinaryRetirementAge;
  const meetsOrdinaryRetirementAge = input.retirementAge >= statutoryRetirementAge;
  const eligible = meetsMinimumContribution && meetsOrdinaryRetirementAge;
  const additionalMonths = Math.max(0, projectedContributionMonths - 15 * 12);
  const firstIncrementMonths = Math.min(additionalMonths, 49);
  const secondIncrementMonths = Math.min(Math.max(0, additionalMonths - 49), 209);
  const replacementPercentage = eligible
    ? Math.min(1, 0.5 + firstIncrementMonths * 0.0021 + secondIncrementMonths * 0.0019)
    : 0;
  const regulatoryBase = input.averageMonthlyContributionBase * regulatoryBaseFactor(retirementYear);
  const annualGross = Math.min(
    regulatoryBase * replacementPercentage * 14,
    annualMaximumPension
  );
  const monthlyGross = annualGross / 14;
  const monthlyChildSupplement = eligible && input.includeGenderGapSupplement
    ? input.children * monthlyGenderGapSupplementReference
    : 0;
  const annualChildSupplement = monthlyChildSupplement * 14;
  const minimumPensionAnnual = input.minimumPensionCategory === 'none'
    ? 0
    : minimumPensionByCategory[input.minimumPensionCategory];
  const incomeLimit = input.minimumPensionCategory === 'none'
    ? 0
    : annualIncomeLimitForMinimumSupplement[input.minimumPensionCategory];
  const annualMinimumSupplement = eligible &&
    input.includeMinimumSupplement &&
    input.residesInSpain &&
    input.otherAnnualIncome <= incomeLimit
    ? Math.max(0, minimumPensionAnnual - annualGross)
    : 0;
  const monthlyMinimumSupplement = annualMinimumSupplement / 14;

  return {
    projectedContributionYears,
    retirementYear,
    statutoryRetirementAge,
    replacementPercentage,
    regulatoryBase,
    monthlyGross,
    annualGross,
    monthlyChildSupplement,
    annualChildSupplement,
    monthlyMinimumSupplement,
    annualMinimumSupplement,
    monthlyTotalGross: monthlyGross + monthlyChildSupplement + monthlyMinimumSupplement,
    annualTotalGross: annualGross + annualChildSupplement + annualMinimumSupplement,
    meetsMinimumContribution,
    meetsOrdinaryRetirementAge,
    eligible
  };
}
