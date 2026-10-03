export interface SalaryEstimateInput {
  annualGross: number;
  payments: 12 | 14;
  children: number;
  disability: boolean;
  contractType: 'permanent' | 'temporary';
}

export interface SalaryEstimate {
  annualGross: number;
  socialSecurity: number;
  incomeTax: number;
  netAnnual: number;
  netMonthlyAverage: number;
  netPerPayment: number;
  effectiveRate: number;
}

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

export function calculateSalaryNet(input: SalaryEstimateInput): SalaryEstimate {
  if (!Number.isFinite(input.annualGross) || input.annualGross <= 0) {
    throw new RangeError('El salario bruto anual debe ser mayor que cero.');
  }
  if (input.payments !== 12 && input.payments !== 14) {
    throw new RangeError('El número de pagas debe ser 12 o 14.');
  }
  if (!Number.isInteger(input.children) || input.children < 0) {
    throw new RangeError('El número de hijos debe ser un entero no negativo.');
  }

  const socialSecurityRate = input.contractType === 'permanent' ? 0.065 : 0.0655;
  const socialSecurity = input.annualGross * socialSecurityRate;
  const taxableBase = Math.max(0, input.annualGross - socialSecurity - 2000);
  const childMinimum = [2400, 2700, 4000, 4500]
    .slice(0, input.children)
    .reduce((total, amount) => total + amount, 0)
    + Math.max(0, input.children - 4) * 4500;
  const personalMinimum = 5550 + childMinimum + (input.disability ? 3000 : 0);
  const incomeTax = Math.max(0, taxForBase(taxableBase) - taxForBase(personalMinimum));
  const netAnnual = Math.max(0, input.annualGross - socialSecurity - incomeTax);

  return {
    annualGross: input.annualGross,
    socialSecurity,
    incomeTax,
    netAnnual,
    netMonthlyAverage: netAnnual / 12,
    netPerPayment: netAnnual / input.payments,
    effectiveRate: (input.annualGross - netAnnual) / input.annualGross
  };
}