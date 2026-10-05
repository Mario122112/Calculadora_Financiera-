export interface PensionEstimateInput {
  currentAge: number;
  currentContributionYears: number;
  retirementAge: number;
  averageMonthlyContributionBase: number;
  children: number;
  includeGenderGapSupplement: boolean;
  includeMinimumSupplement: boolean;
  minimumPensionCategory?: 'none' | 'no-spouse' | 'spouse-dependent' | 'spouse-not-dependent';
  familyStatus?: 'unknown' | 'single' | 'married' | 'widowed' | 'divorced-separated';
  spouseIncomeStatus?: 'unknown' | 'no' | 'yes';
  spouseAnnualIncome?: number;
  otherIncomeStatus?: 'unknown' | 'no' | 'yes';
  otherAnnualIncome: number;
  residesInSpain: boolean;
}

export type MinimumSupplementAssessment =
  | 'not-requested'
  | 'insufficient-data'
  | 'not-resident'
  | 'pension-ineligible'
  | 'possible-future'
  | 'above-reference-income-limit'
  | 'estimated-current-year'
  | 'not-indicated-current-year';

export interface PensionEstimate {
  projectedContributionYears: number;
  projectedContributionMonths: number;
  retirementYear: number;
  ordinaryRetirementAge: number;
  statutoryRetirementAge: number;
  retirementDelayYears: number;
  delayIncentivePercent: number;
  replacementPercentage: number;
  effectiveReplacementPercentage: number;
  regulatoryBase: number;
  monthlyGross: number;
  annualGross: number;
  monthlyChildSupplement: number;
  annualChildSupplement: number;
  monthlyMinimumSupplement: number;
  annualMinimumSupplement: number;
  minimumSupplementAssessment: MinimumSupplementAssessment;
  minimumSupplementMessage: string;
  minimumPensionCategoryScenario: 'none' | 'no-spouse' | 'spouse-dependent' | 'spouse-not-dependent';
  monthlyTotalGross: number;
  annualTotalGross: number;
  meetsMinimumContribution: boolean;
  meetsOrdinaryRetirementAge: boolean;
  eligible: boolean;
}

const referenceYear = 2026;
const annualMaximumPension = 47034.4;
const monthlyGenderGapSupplementReference = 36.9;
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
// Transition schedule for 2026-2036: each entry is the number of selected monthly
// bases and divisor for that calendar year, not a substitute for the real bases.
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

function calculateContributionMonths(projectedContributionYears: number): number {
  return projectedContributionYears * 12;
}

export function calculateOrdinaryRetirementAge(retirementYear: number, projectedContributionYears: number): number {
  const requiredContributionYears = retirementYear <= 2026 ? 38.25 : 38.5;
  if (projectedContributionYears >= requiredContributionYears) {
    return 65;
  }

  return retirementYear <= 2026 ? 66 + 10 / 12 : 67;
}

export function calculateRetirementDelayYears(retirementAge: number, ordinaryRetirementAge: number): number {
  return Math.max(0, Math.floor(retirementAge - ordinaryRetirementAge));
}

export function calculateRetirementDelayIncentive(delayYears: number): number {
  if (delayYears <= 0) {
    return 0;
  }

  return delayYears * 4;
}

function estimateGenderGapSupplementPerChild(retirementYear: number): number {
  return retirementYear < referenceYear ? 36.9 : 36.9;
}

function regulatoryBaseFactor(retirementYear: number): number {
  // These are the legal year-specific factors. Applying them to one user-entered
  // average is only a scenario; an official calculation needs every monthly base
  // to select the applicable higher bases and compare the statutory methods.
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

export function calculateReplacementPercentage(projectedContributionYears: number): number {
  const projectedContributionMonths = calculateContributionMonths(projectedContributionYears);
  const minimumMonths = 15 * 12;
  if (projectedContributionMonths < minimumMonths) {
    return 0;
  }

  const additionalMonths = Math.max(0, projectedContributionMonths - minimumMonths);
  const firstIncrementMonths = Math.min(additionalMonths, 49);
  const secondIncrementMonths = Math.min(Math.max(0, additionalMonths - 49), 209);

  return Math.min(1, 0.5 + firstIncrementMonths * 0.0021 + secondIncrementMonths * 0.0019);
}

export function calculateEstimatedRegulatoryBase(averageMonthlyContributionBase: number, retirementYear: number): number {
  // Deliberately estimates from the entered average; it does not reconstruct
  // historical monthly bases or claim to reproduce the official regulatory base.
  return averageMonthlyContributionBase * regulatoryBaseFactor(retirementYear);
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
  if (input.minimumPensionCategory !== undefined &&
    !['none', 'no-spouse', 'spouse-dependent', 'spouse-not-dependent'].includes(input.minimumPensionCategory)) {
    throw new RangeError('La situación conyugal para el complemento a mínimos no es válida.');
  }
  if (!Number.isFinite(input.otherAnnualIncome) || input.otherAnnualIncome < 0) {
    throw new RangeError('Los otros ingresos anuales no pueden ser negativos.');
  }
  if (input.familyStatus !== undefined &&
    !['unknown', 'single', 'married', 'widowed', 'divorced-separated'].includes(input.familyStatus)) {
    throw new RangeError('La situación familiar para el complemento a mínimos no es válida.');
  }
  if (input.spouseIncomeStatus !== undefined && !['unknown', 'no', 'yes'].includes(input.spouseIncomeStatus)) {
    throw new RangeError('La respuesta sobre los ingresos del cónyuge no es válida.');
  }
  if (input.otherIncomeStatus !== undefined && !['unknown', 'no', 'yes'].includes(input.otherIncomeStatus)) {
    throw new RangeError('La respuesta sobre otros ingresos no es válida.');
  }
  if (input.spouseAnnualIncome !== undefined &&
    (!Number.isFinite(input.spouseAnnualIncome) || input.spouseAnnualIncome < 0)) {
    throw new RangeError('Los ingresos anuales del cónyuge no pueden ser negativos.');
  }

  const hasFamilyInputs = input.familyStatus !== undefined;
  let minimumPensionCategoryScenario = input.minimumPensionCategory ?? 'none';
  let minimumDataComplete = minimumPensionCategoryScenario !== 'none';
  let ownOtherAnnualIncome = input.otherAnnualIncome;
  let spouseAnnualIncome = 0;

  if (hasFamilyInputs) {
    minimumDataComplete = input.familyStatus !== 'unknown' &&
      input.otherIncomeStatus !== undefined &&
      input.otherIncomeStatus !== 'unknown';
    ownOtherAnnualIncome = input.otherIncomeStatus === 'no' ? 0 : input.otherAnnualIncome;

    if (input.familyStatus === 'married') {
      if (input.spouseIncomeStatus === 'no') {
        minimumPensionCategoryScenario = 'spouse-dependent';
      } else if (input.spouseIncomeStatus === 'yes' && input.spouseAnnualIncome !== undefined) {
        minimumPensionCategoryScenario = 'spouse-not-dependent';
        spouseAnnualIncome = input.spouseAnnualIncome;
      } else {
        minimumDataComplete = false;
        minimumPensionCategoryScenario = 'none';
      }
    } else if (input.familyStatus !== 'unknown') {
      minimumPensionCategoryScenario = 'no-spouse';
    }

    if (input.otherIncomeStatus === 'yes' &&
      (!Number.isFinite(input.otherAnnualIncome) || input.otherAnnualIncome < 0)) {
      minimumDataComplete = false;
    }
  } else if (input.includeMinimumSupplement && minimumPensionCategoryScenario === 'none') {
    throw new RangeError('Selecciona la situación familiar para estimar el complemento a mínimos.');
  }

  const projectedContributionYears = input.currentContributionYears + input.retirementAge - input.currentAge;
  const projectedContributionMonths = calculateContributionMonths(projectedContributionYears);
  const retirementYear = Math.round(referenceYear + input.retirementAge - input.currentAge);
  const ordinaryRetirementAge = calculateOrdinaryRetirementAge(retirementYear, projectedContributionYears);
  const retirementDelayYears = calculateRetirementDelayYears(input.retirementAge, ordinaryRetirementAge);
  const delayIncentivePercent = calculateRetirementDelayIncentive(retirementDelayYears);
  const meetsMinimumContribution = projectedContributionMonths >= 15 * 12;
  const meetsOrdinaryRetirementAge = input.retirementAge >= ordinaryRetirementAge;
  const eligible = meetsMinimumContribution && meetsOrdinaryRetirementAge;
  const replacementPercentage = calculateReplacementPercentage(projectedContributionYears);
  const effectiveReplacementPercentage = eligible
    ? replacementPercentage * (1 + delayIncentivePercent / 100)
    : 0;
  const regulatoryBase = calculateEstimatedRegulatoryBase(input.averageMonthlyContributionBase, retirementYear);
  const annualGross = Math.min(
    regulatoryBase * effectiveReplacementPercentage * 14,
    annualMaximumPension
  );
  const monthlyGross = annualGross / 14;
  const monthlyChildSupplement = eligible && input.includeGenderGapSupplement
    ? input.children * estimateGenderGapSupplementPerChild(retirementYear)
    : 0;
  const annualChildSupplement = monthlyChildSupplement * 14;
  const minimumPensionAnnual = minimumPensionCategoryScenario === 'none'
    ? 0
    : minimumPensionByCategory[minimumPensionCategoryScenario];
  const incomeLimit = minimumPensionCategoryScenario === 'none'
    ? 0
    : annualIncomeLimitForMinimumSupplement[minimumPensionCategoryScenario];
  let annualMinimumSupplement = 0;
  let minimumSupplementAssessment: MinimumSupplementAssessment = 'not-requested';
  let minimumSupplementMessage = 'Complemento a mínimos: no solicitado.';

  if (input.includeMinimumSupplement) {
    if (!minimumDataComplete || minimumPensionCategoryScenario === 'none') {
      minimumSupplementAssessment = 'insufficient-data';
      minimumSupplementMessage = 'Complemento a mínimos: no determinable con precisión con los datos introducidos.';
    } else if (!input.residesInSpain) {
      minimumSupplementAssessment = 'not-resident';
      minimumSupplementMessage = 'Complemento a mínimos: el escenario seleccionado requiere residencia en España.';
    } else if (!eligible) {
      minimumSupplementAssessment = 'pension-ineligible';
      minimumSupplementMessage = 'Complemento a mínimos: no evaluable porque la proyección no cumple los requisitos ordinarios estimados para una pensión contributiva.';
    } else if (retirementYear !== referenceYear) {
      const incomeForReferenceLimit = minimumPensionCategoryScenario === 'spouse-dependent'
        ? ownOtherAnnualIncome + spouseAnnualIncome
        : ownOtherAnnualIncome;
      const familyScenario = minimumPensionCategoryScenario === 'spouse-dependent'
        ? ' Se muestra un escenario con cónyuge sin ingresos declarados; la dependencia económica legal no queda confirmada.'
        : minimumPensionCategoryScenario === 'spouse-not-dependent'
          ? ' Se muestra un escenario con cónyuge con ingresos; no se presume cónyuge a cargo.'
          : ' Se muestra un escenario sin cónyuge.';
      if (incomeForReferenceLimit > incomeLimit) {
        minimumSupplementAssessment = 'above-reference-income-limit';
        minimumSupplementMessage =
          'Complemento a mínimos: posible, sujeto a los límites de ingresos y cuantías mínimas vigentes en el año de jubilación. Los ingresos declarados superan el límite de referencia de 2026; esto no determina el derecho en un año futuro.' +
          familyScenario +
          ' No se proyectan importes ni límites de 2026 a años futuros.';
      } else {
        minimumSupplementAssessment = 'possible-future';
        minimumSupplementMessage =
          'Complemento a mínimos: posible, sujeto a los límites de ingresos y cuantías mínimas vigentes en el año de jubilación.' +
          familyScenario +
          ' No se proyectan importes ni límites de 2026 a años futuros.';
      }
    } else {
      const incomeForReferenceLimit = minimumPensionCategoryScenario === 'spouse-dependent'
        ? ownOtherAnnualIncome + spouseAnnualIncome
        : ownOtherAnnualIncome;
      if (incomeForReferenceLimit > incomeLimit) {
        minimumSupplementAssessment = 'not-indicated-current-year';
        minimumSupplementMessage = 'Complemento a mínimos: no indicado según los límites de ingresos de referencia de 2026.';
      } else {
        annualMinimumSupplement = Math.max(0, minimumPensionAnnual - annualGross);
        minimumSupplementAssessment = annualMinimumSupplement > 0
          ? 'estimated-current-year'
          : 'not-indicated-current-year';
        minimumSupplementMessage = annualMinimumSupplement > 0
          ? 'Complemento a mínimos estimado con cuantías y límites de referencia de 2026; el derecho depende de que se cumplan todos los requisitos.'
          : 'Complemento a mínimos: no indicado según la cuantía mínima de referencia de 2026.';
      }
    }
  }
  const monthlyMinimumSupplement = annualMinimumSupplement / 14;

  return {
    projectedContributionYears,
    projectedContributionMonths,
    retirementYear,
    ordinaryRetirementAge,
    statutoryRetirementAge: ordinaryRetirementAge,
    retirementDelayYears,
    delayIncentivePercent,
    replacementPercentage,
    effectiveReplacementPercentage,
    regulatoryBase,
    monthlyGross,
    annualGross,
    monthlyChildSupplement,
    annualChildSupplement,
    monthlyMinimumSupplement,
    annualMinimumSupplement,
    minimumSupplementAssessment,
    minimumSupplementMessage,
    minimumPensionCategoryScenario,
    monthlyTotalGross: monthlyGross + monthlyChildSupplement + monthlyMinimumSupplement,
    annualTotalGross: annualGross + annualChildSupplement + annualMinimumSupplement,
    meetsMinimumContribution,
    meetsOrdinaryRetirementAge,
    eligible
  };
}
