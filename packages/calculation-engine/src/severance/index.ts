export type DismissalType = 'objective' | 'unfair';

export interface SeveranceEstimateInput {
  annualSalary: number;
  pendingSalaryDays: number;
  unusedVacationDays: number;
  accruedExtraPay: number;
  contractStartDate: string;
  terminationDate: string;
  dismissalType: DismissalType;
}

export interface SeveranceEstimate {
  dailySalary: number;
  pendingSalary: number;
  unusedVacationPay: number;
  accruedExtraPay: number;
  settlementTotal: number;
  serviceYears: number;
  severanceDays: number;
  severanceAmount: number;
  totalGross: number;
}

const unfairDismissalTransitionDate = '2012-02-12';

function parseDate(value: string, fieldName: string): number {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    throw new RangeError(`${fieldName} no es una fecha válida.`);
  }

  const timestamp = Date.parse(`${value}T00:00:00Z`);
  if (!Number.isFinite(timestamp) || new Date(timestamp).toISOString().slice(0, 10) !== value) {
    throw new RangeError(`${fieldName} no es una fecha válida.`);
  }

  return timestamp;
}

function proratedServiceMonths(start: number, end: number): number {
  if (start === end) {
    return 0;
  }

  const startDate = new Date(start);
  const endDate = new Date(end);
  let monthCount =
    (endDate.getUTCFullYear() - startDate.getUTCFullYear()) * 12 +
    endDate.getUTCMonth() -
    startDate.getUTCMonth();

  const anniversary = (months: number): number => {
    const monthIndex = startDate.getUTCMonth() + months;
    const year = startDate.getUTCFullYear() + Math.floor(monthIndex / 12);
    const month = ((monthIndex % 12) + 12) % 12;
    const day = Math.min(
      startDate.getUTCDate(),
      new Date(Date.UTC(year, month + 1, 0)).getUTCDate()
    );
    return Date.UTC(year, month, day);
  };

  while (monthCount > 0 && anniversary(monthCount) > end) {
    monthCount -= 1;
  }

  if (anniversary(monthCount) < end) {
    monthCount += 1;
  }

  return monthCount;
}

export function calculateSeverance(input: SeveranceEstimateInput): SeveranceEstimate {
  if (!Number.isFinite(input.annualSalary) || input.annualSalary <= 0) {
    throw new RangeError('El salario bruto anual debe ser mayor que cero.');
  }
  if (!Number.isFinite(input.pendingSalaryDays) || input.pendingSalaryDays < 0 || input.pendingSalaryDays > 31) {
    throw new RangeError('Los días pendientes de salario deben estar entre 0 y 31.');
  }
  if (!Number.isFinite(input.unusedVacationDays) || input.unusedVacationDays < 0) {
    throw new RangeError('Los días de vacaciones pendientes deben ser cero o mayores.');
  }
  if (!Number.isFinite(input.accruedExtraPay) || input.accruedExtraPay < 0) {
    throw new RangeError('Las pagas extra pendientes deben ser cero o mayores.');
  }
  if (input.dismissalType !== 'objective' && input.dismissalType !== 'unfair') {
    throw new RangeError('El tipo de despido no es válido.');
  }

  const start = parseDate(input.contractStartDate, 'La fecha de inicio');
  const termination = parseDate(input.terminationDate, 'La fecha de fin');
  if (start > termination) {
    throw new RangeError('La fecha de inicio no puede ser posterior a la fecha de fin.');
  }

  const dailySalary = input.annualSalary / 365;
  const serviceMonths = proratedServiceMonths(start, termination);
  const serviceYears = serviceMonths / 12;
  const settlementTotal =
    dailySalary * (input.pendingSalaryDays + input.unusedVacationDays) + input.accruedExtraPay;
  let severanceDays = 0;
  let severanceAmount = 0;

  if (input.dismissalType === 'objective') {
    severanceDays = Math.min(20 * serviceYears, 365);
    severanceAmount = Math.min(dailySalary * 20 * serviceYears, input.annualSalary);
  } else {
    const transition = Date.parse(`${unfairDismissalTransitionDate}T00:00:00Z`);
    const preTransitionMonths = start < transition
      ? proratedServiceMonths(start, Math.min(termination, transition))
      : 0;
    const postTransitionMonths = termination > transition
      ? proratedServiceMonths(Math.max(start, transition), termination)
      : 0;
    const preTransitionIndemnityDays = 45 * preTransitionMonths / 12;
    const postTransitionIndemnityDays = 33 * postTransitionMonths / 12;
    const uncappedDays = preTransitionIndemnityDays + postTransitionIndemnityDays;
    const maximumDays = preTransitionIndemnityDays > 720 ? 1260 : 720;
    severanceDays = Math.min(uncappedDays, maximumDays);
    severanceAmount = dailySalary * severanceDays;
  }

  if (!Number.isFinite(settlementTotal) || !Number.isFinite(severanceAmount)) {
    throw new RangeError('Los importes introducidos superan el rango que se puede estimar.');
  }

  return {
    dailySalary,
    pendingSalary: dailySalary * input.pendingSalaryDays,
    unusedVacationPay: dailySalary * input.unusedVacationDays,
    accruedExtraPay: input.accruedExtraPay,
    settlementTotal,
    serviceYears,
    severanceDays,
    severanceAmount,
    totalGross: settlementTotal + severanceAmount
  };
}
