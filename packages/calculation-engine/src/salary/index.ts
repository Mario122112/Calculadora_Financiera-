export type SalaryContractType = 'permanent' | 'temporary';
export type SalaryDisabilityLevel = 'none' | '33' | '65';
export type ChildMinimumShare = 'full' | 'shared';

export interface SalaryEstimateInput {
  annualGross: number;
  payments: 12 | 14;
  contractType: SalaryContractType;
  age: number;
  qualifyingChildren: number;
  childrenUnderThree: number;
  childMinimumShare: ChildMinimumShare;
  disabilityLevel: SalaryDisabilityLevel;
  reducedMobility: boolean;
  otherNonExemptIncomeOver6500: boolean;
}

export interface SalaryEstimate {
  annualGross: number;
  contributionBase: number;
  ordinarySocialSecurity: number;
  solidarityContribution: number;
  socialSecurity: number;
  employmentIncomeReduction: number;
  taxableBase: number;
  personalMinimum: number;
  incomeTax: number;
  netAnnual: number;
  netMonthlyAverage: number;
  netPerPayment: number;
  effectiveRate: number;
}

const annualMaximumContributionBase = 5101.2 * 12;
const incomeTaxBands = [
  { limit: 12450, rate: 0.19 },
  { limit: 20200, rate: 0.24 },
  { limit: 35200, rate: 0.30 },
  { limit: 60000, rate: 0.37 },
  { limit: 300000, rate: 0.45 },
  { limit: Number.POSITIVE_INFINITY, rate: 0.47 }
];

function taxForBase(base: number): number {
  let remaining = base;
  let lowerLimit = 0;
  let tax = 0;

  for (const band of incomeTaxBands) {
    const taxableInBand = Math.min(remaining, band.limit - lowerLimit);
    tax += taxableInBand * band.rate;
    remaining -= taxableInBand;
    lowerLimit = band.limit;

    if (remaining <= 0) {
      break;
    }
  }

  return tax;
}

function descendantMinimum(children: number, childrenUnderThree: number): number {
  const minimums = [2400, 2700, 4000, 4500];
  let minimum = 0;

  for (let index = 0; index < children; index += 1) {
    minimum += minimums[index] ?? 4500;
    if (index < childrenUnderThree) {
      minimum += 2800;
    }
  }

  return minimum;
}

function calculateSolidarityContribution(excess: number): number {
  const firstBand = Math.min(excess, annualMaximumContributionBase * 0.1);
  const secondBand = Math.min(
    Math.max(0, excess - annualMaximumContributionBase * 0.1),
    annualMaximumContributionBase * 0.4
  );
  const thirdBand = Math.max(0, excess - annualMaximumContributionBase * 0.5);

  return firstBand * 0.0019 + secondBand * 0.0021 + thirdBand * 0.0024;
}

export function calculateSalaryNet(input: SalaryEstimateInput): SalaryEstimate {
  if (!Number.isFinite(input.annualGross) || input.annualGross <= 0) {
    throw new RangeError('El salario bruto anual debe ser mayor que cero.');
  }
  if (input.payments !== 12 && input.payments !== 14) {
    throw new RangeError('El número de pagas debe ser 12 o 14.');
  }
  if (input.contractType !== 'permanent' && input.contractType !== 'temporary') {
    throw new RangeError('El tipo de contrato no es válido.');
  }
  if (!Number.isInteger(input.age) || input.age < 16 || input.age > 100) {
    throw new RangeError('La edad debe ser un número entero entre 16 y 100.');
  }
  if (!Number.isInteger(input.qualifyingChildren) || input.qualifyingChildren < 0 || input.qualifyingChildren > 20) {
    throw new RangeError('El número de descendientes debe ser un entero entre 0 y 20.');
  }
  if (
    !Number.isInteger(input.childrenUnderThree) ||
    input.childrenUnderThree < 0 ||
    input.childrenUnderThree > input.qualifyingChildren
  ) {
    throw new RangeError('Los hijos menores de 3 años no pueden superar el número de descendientes.');
  }
  if (input.childMinimumShare !== 'full' && input.childMinimumShare !== 'shared') {
    throw new RangeError('La proporción del mínimo por descendientes no es válida.');
  }
  if (!['none', '33', '65'].includes(input.disabilityLevel)) {
    throw new RangeError('El grado de discapacidad no es válido.');
  }
  if (typeof input.reducedMobility !== 'boolean') {
    throw new RangeError('La situación de movilidad reducida debe indicarse.');
  }
  if (typeof input.otherNonExemptIncomeOver6500 !== 'boolean') {
    throw new RangeError('Debes indicar si percibes otras rentas no exentas.');
  }

  const contributionBase = Math.min(input.annualGross, annualMaximumContributionBase);
  const unemploymentRate = input.contractType === 'permanent' ? 0.0155 : 0.016;
  const ordinarySocialSecurity = contributionBase * (0.047 + unemploymentRate + 0.001 + 0.0015);
  const solidarityContribution = calculateSolidarityContribution(
    Math.max(0, input.annualGross - annualMaximumContributionBase)
  );
  const socialSecurity = ordinarySocialSecurity + solidarityContribution;
  const disabilityEmploymentExpense = input.disabilityLevel === 'none'
    ? 0
    : input.disabilityLevel === '65' || input.reducedMobility
      ? 7750
      : 3500;
  const employmentExpense = Math.min(
    Math.max(0, input.annualGross - socialSecurity - 2000),
    disabilityEmploymentExpense
  );
  const netEmploymentIncomeForReduction = Math.max(0, input.annualGross - socialSecurity - 2000);
  const employmentIncomeReduction = input.otherNonExemptIncomeOver6500
    ? 0
    : netEmploymentIncomeForReduction <= 14852
      ? 7302
      : netEmploymentIncomeForReduction <= 17673.52
        ? 7302 - 1.75 * (netEmploymentIncomeForReduction - 14852)
        : netEmploymentIncomeForReduction <= 19747.5
          ? 2364.34 - 1.14 * (netEmploymentIncomeForReduction - 17673.52)
          : 0;
  const taxableBase = Math.max(
    0,
    input.annualGross - socialSecurity - 2000 - employmentExpense - employmentIncomeReduction
  );
  const personalMinimum =
    5550 +
    (input.age >= 75 ? 2550 : input.age >= 65 ? 1150 : 0) +
    descendantMinimum(input.qualifyingChildren, input.childrenUnderThree) *
      (input.childMinimumShare === 'shared' ? 0.5 : 1) +
    (input.disabilityLevel === '65' ? 9000 : input.disabilityLevel === '33' ? 3000 : 0) +
    (input.reducedMobility && input.disabilityLevel !== 'none' ? 3000 : 0);
  const incomeTax = Math.max(0, taxForBase(taxableBase) - taxForBase(personalMinimum));
  const netAnnual = Math.max(0, input.annualGross - socialSecurity - incomeTax);

  return {
    annualGross: input.annualGross,
    contributionBase,
    ordinarySocialSecurity,
    solidarityContribution,
    socialSecurity,
    employmentIncomeReduction,
    taxableBase,
    personalMinimum,
    incomeTax,
    netAnnual,
    netMonthlyAverage: netAnnual / 12,
    netPerPayment: netAnnual / input.payments,
    effectiveRate: (input.annualGross - netAnnual) / input.annualGross
  };
}
