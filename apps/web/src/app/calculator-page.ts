import { Component, computed, inject, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import {
  calculateMortgage,
  calculatePensionEstimate,
  calculateSalaryNet,
  calculateCompoundInterest,
  calculateSeverance,
  type CompoundInterestEstimate,
  type DismissalType,
  type MortgageEstimate,
  type PensionEstimate,
  type SalaryEstimate,
  type SeveranceEstimate
} from '@calculadora-financiera/calculation-engine';

export type Calculator = 'salary' | 'mortgage' | 'pension' | 'compound-interest' | 'severance';

interface CalculatorContent {
  title: string;
  summary: string;
  detail: string;
  interpretation: string;
  limitations: string;
}

const calculatorContent: Record<Calculator, CalculatorContent> = {
  salary: {
    title: 'Calculadora de sueldo neto',
    summary: 'Estima cuánto podrías recibir después de las cotizaciones a la Seguridad Social y una retención aproximada de IRPF en España.',
    detail: 'Necesitas el salario bruto anual o el importe bruto por paga, el número de pagas y datos como edad, contrato y circunstancias familiares que pueden afectar a la estimación.',
    interpretation: 'El resultado separa el neto anual, el promedio mensual y una media por paga. La nómina real puede distribuir las pagas extra y las retenciones de otra manera.',
    limitations: 'Es una aproximación con reglas de referencia de 2026. No calcula la declaración definitiva ni todas las circunstancias fiscales, y no sustituye el simulador de retenciones de la AEAT.'
  },
  mortgage: {
    title: 'Calculadora de hipoteca',
    summary: 'Calcula una cuota mensual estimada y el coste total de un préstamo con pagos mensuales constantes.',
    detail: 'Indica el precio de la vivienda, el porcentaje de entrada, el interés nominal anual y el plazo. La entrada se resta del precio para estimar el capital financiado.',
    interpretation: 'La cuota se calcula con el sistema francés y un tipo constante. El total pagado suma las cuotas del plazo y permite ver el coste de intereses estimado.',
    limitations: 'No incluye comisiones, seguros, impuestos, tasación ni gastos de compraventa. Una oferta real puede usar tipos, condiciones o calendarios diferentes.'
  },
  pension: {
    title: 'Calculadora de pensión de jubilación',
    summary: 'Proyecta una pensión contributiva orientativa a partir de la edad prevista de jubilación, la cotización acumulada y una base media mensual.',
    detail: 'Indica tu edad actual, años cotizados, edad prevista de jubilación y una base media mensual representativa. Puedes añadir escenarios para complementos.',
    interpretation: 'El resultado muestra una cuantía bruta estimada en 14 pagas, junto con años cotizados previstos, porcentaje aplicado y, si corresponde, complementos simulados.',
    limitations: 'La Seguridad Social calcula con bases históricas reales y requisitos legales completos. Este escenario simplificado no reconstruye esas bases ni garantiza derecho a una prestación o complemento.'
  },
  'compound-interest': {
    title: 'Calculadora de interés compuesto',
    summary: 'Proyecta cómo podría crecer un capital con aportaciones mensuales y una rentabilidad anual hipotética.',
    detail: 'Indica el capital inicial, cuánto aportarás al final de cada mes, una rentabilidad nominal anual y el plazo de inversión.',
    interpretation: 'El resultado separa el dinero aportado de los intereses teóricos y muestra la evolución estimada al cierre de cada año.',
    limitations: 'La rentabilidad es un supuesto constante, no una promesa. No se descuentan impuestos, inflación, comisiones ni cambios en el rendimiento.'
  },
  severance: {
    title: 'Calculadora de finiquito e indemnización',
    summary: 'Estima por separado salarios pendientes, vacaciones no disfrutadas, pagas extra indicadas e indemnización por despido.',
    detail: 'Introduce el salario bruto anual, los días de salario y vacaciones pendientes, la paga extra acumulada no cobrada, las fechas del contrato y el tipo de despido.',
    interpretation: 'El finiquito agrupa cantidades devengadas pendientes de pago; la indemnización se calcula aparte según el tipo de despido y la antigüedad.',
    limitations: 'Es un cálculo bruto simplificado. No determina si el despido es procedente, no interpreta convenios, salarios variables ni exenciones fiscales; contrasta los datos con asesoramiento laboral.'
  }
};

@Component({
  selector: 'app-calculator-page',
  imports: [DecimalPipe, FormsModule, RouterLink],
  templateUrl: './calculator-page.html',
  styleUrl: './calculator-page.scss'
})
export class CalculatorPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly meta = inject(Meta);
  protected readonly selectedCalculator = signal<Calculator | null>(null);
  protected readonly calculatorPage = computed(() => {
    const calculator = this.selectedCalculator();
    return calculator ? calculatorContent[calculator] : null;
  });
  protected readonly salaryResult = signal<SalaryEstimate | null>(null);
  protected readonly mortgageResult = signal<MortgageEstimate | null>(null);
  protected readonly pensionResult = signal<PensionEstimate | null>(null);
  protected readonly compoundInterestResult = signal<CompoundInterestEstimate | null>(null);
  protected readonly severanceResult = signal<SeveranceEstimate | null>(null);
  protected readonly mortgageError = signal(false);
  protected readonly compoundInterestError = signal(false);
  protected readonly severanceDateError = signal(false);
  protected salaryInputMode: 'annual' | 'monthly' = 'annual';

  protected salaryData = {
    annualGross: 30000,
    monthlyGross: 2500,
    payments: 14 as 12 | 14,
    contractType: 'permanent' as 'permanent' | 'temporary',
    age: 35,
    qualifyingChildren: 0,
    childrenUnderThree: 0,
    childMinimumShare: 'shared' as 'full' | 'shared',
    disabilityLevel: 'none' as 'none' | '33' | '65',
    reducedMobility: false,
    otherNonExemptIncomeOver6500: false
  };

  protected mortgageData = {
    propertyPrice: 240000,
    downPaymentPercent: 20,
    annualInterestRate: 3.2,
    termYears: 25
  };

  protected pensionData = {
    currentAge: 35,
    currentContributionYears: 10,
    retirementAge: 67,
    averageMonthlyContributionBase: 2200,
    children: 0,
    includeMinimumSupplement: false,
    familyStatus: 'unknown' as 'unknown' | 'single' | 'married' | 'widowed' | 'divorced-separated',
    spouseIncomeStatus: 'unknown' as 'unknown' | 'no' | 'yes',
    spouseAnnualIncome: 0,
    otherIncomeStatus: 'unknown' as 'unknown' | 'no' | 'yes',
    otherAnnualIncome: 0,
    residesInSpain: true
  };

  protected compoundInterestData = {
    initialCapital: 10000,
    monthlyContribution: 200,
    annualNominalRate: 5,
    termYears: 20
  };

  protected severanceData = {
    annualSalary: 30000,
    pendingSalaryDays: 0,
    unusedVacationDays: 0,
    accruedExtraPay: 0,
    contractStartDate: '2020-01-01',
    terminationDate: '2026-01-01',
    dismissalType: 'objective' as DismissalType
  };

  private readonly euroFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  constructor() {
    this.activatedRoute.data
      .pipe(takeUntilDestroyed())
      .subscribe(routeData => this.updateRouteMetadata(routeData));
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed()
      )
      .subscribe(() => this.updateRouteMetadata());
  }

  private updateRouteMetadata(
    routeData: Readonly<Record<string, unknown>> = this.router.routerState.snapshot.root.firstChild?.data ?? {}
  ): void {
    const routeCalculator: unknown = routeData?.['calculator'];
    const calculator: Calculator | null = routeCalculator === 'salary' ||
      routeCalculator === 'mortgage' ||
      routeCalculator === 'pension' ||
      routeCalculator === 'compound-interest' ||
      routeCalculator === 'severance'
      ? routeCalculator
      : null;
    this.selectedCalculator.set(calculator);
    this.salaryResult.set(null);
    this.mortgageResult.set(null);
    this.pensionResult.set(null);
    this.compoundInterestResult.set(null);
    this.severanceResult.set(null);
    this.mortgageError.set(false);
    this.compoundInterestError.set(false);
    this.severanceDateError.set(false);

    const description = routeData?.['description'];
    if (typeof description === 'string') {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }

  protected calculateSalary(): void {
    this.salaryResult.set(calculateSalaryNet({
      ...this.salaryData,
      annualGross: this.salaryInputMode === 'annual'
        ? this.salaryData.annualGross
        : this.salaryData.monthlyGross * this.salaryData.payments
    }));
  }

  protected refreshSalaryResult(form: HTMLFormElement): void {
    if (this.salaryResult() && form.checkValidity()) {
      this.calculateSalary();
    }
  }

  protected updateQualifyingChildren(children: number, form: HTMLFormElement): void {
    this.salaryData.qualifyingChildren = children;
    this.salaryData.childrenUnderThree = Math.min(this.salaryData.childrenUnderThree, children);
    this.refreshSalaryResult(form);
  }

  protected updateChildMinimumShare(share: 'full' | 'shared', form: HTMLFormElement): void {
    this.salaryData.childMinimumShare = share;
    this.refreshSalaryResult(form);
  }

  protected updatePensionChildren(children: number, form: HTMLFormElement): void {
    this.pensionData.children = children;
    this.refreshPensionResult(form);
  }

  protected updatePensionFamilyStatus(
    status: 'unknown' | 'single' | 'married' | 'widowed' | 'divorced-separated',
    form: HTMLFormElement
  ): void {
    this.pensionData.familyStatus = status;
    if (status !== 'married') {
      this.pensionData.spouseIncomeStatus = 'unknown';
      this.pensionData.spouseAnnualIncome = 0;
    }
    this.refreshPensionResult(form);
  }

  protected updateSpouseIncomeStatus(status: 'unknown' | 'no' | 'yes', form: HTMLFormElement): void {
    this.pensionData.spouseIncomeStatus = status;
    if (status === 'no') {
      this.pensionData.spouseAnnualIncome = 0;
    }
    this.refreshPensionResult(form);
  }

  protected updateOtherIncomeStatus(status: 'unknown' | 'no' | 'yes', form: HTMLFormElement): void {
    this.pensionData.otherIncomeStatus = status;
    if (status === 'no') {
      this.pensionData.otherAnnualIncome = 0;
    }
    this.refreshPensionResult(form);
  }

  protected setSalaryInputMode(mode: 'annual' | 'monthly'): void {
    if (mode === this.salaryInputMode) {
      return;
    }

    if (mode === 'monthly') {
      this.salaryData.monthlyGross = this.salaryData.annualGross / this.salaryData.payments;
    } else {
      this.salaryData.annualGross = this.salaryData.monthlyGross * this.salaryData.payments;
    }

    const hadResult = this.salaryResult() !== null;
    this.salaryInputMode = mode;
    if (hadResult) {
      this.calculateSalary();
    }
  }

  protected calculateMortgage(): void {
    const principal = this.mortgageData.propertyPrice * (1 - this.mortgageData.downPaymentPercent / 100);
    if (principal <= 0) {
      this.mortgageResult.set(null);
      this.mortgageError.set(true);
      return;
    }

    this.mortgageError.set(false);
    this.mortgageResult.set(calculateMortgage({
      principal,
      annualInterestRate: this.mortgageData.annualInterestRate,
      termYears: this.mortgageData.termYears
    }));
  }

  protected clearMortgageError(): void {
    this.mortgageError.set(false);
  }

  protected pensionContributionYearsMax(): number {
    return this.pensionData.currentAge - 16;
  }

  protected pensionContributionYearsInvalid(): boolean {
    return this.pensionData.currentContributionYears > this.pensionContributionYearsMax();
  }

  protected calculatePension(): void {
    if (this.pensionContributionYearsInvalid()) {
      this.pensionResult.set(null);
      return;
    }

    this.pensionResult.set(calculatePensionEstimate({
      ...this.pensionData,
      includeGenderGapSupplement: this.pensionData.children > 0
    }));
  }

  protected calculateCompoundInterest(): void {
    if (this.compoundInterestData.initialCapital === 0 && this.compoundInterestData.monthlyContribution === 0) {
      this.compoundInterestResult.set(null);
      this.compoundInterestError.set(true);
      return;
    }

    this.compoundInterestError.set(false);
    this.compoundInterestResult.set(calculateCompoundInterest(this.compoundInterestData));
  }

  protected clearCompoundInterestError(): void {
    this.compoundInterestError.set(false);
  }

  protected calculateSeverance(): void {
    if (this.severanceData.contractStartDate > this.severanceData.terminationDate) {
      this.severanceResult.set(null);
      this.severanceDateError.set(true);
      return;
    }

    this.severanceDateError.set(false);
    this.severanceResult.set(calculateSeverance(this.severanceData));
  }

  protected clearSeveranceDateError(): void {
    this.severanceDateError.set(false);
  }

  protected compoundInterestBarHeight(balance: number, result: CompoundInterestEstimate): number {
    return Math.max(3, (balance / result.futureValue) * 100);
  }

  protected refreshPensionResult(form: HTMLFormElement): void {
    if (!this.pensionResult()) {
      return;
    }

    if (form.checkValidity() && !this.pensionContributionYearsInvalid()) {
      this.calculatePension();
    } else {
      this.pensionResult.set(null);
    }
  }

  protected pensionChildSupplement(result: PensionEstimate): number {
    if (Number.isFinite(result.monthlyChildSupplement)) {
      return result.monthlyChildSupplement;
    }
    return this.pensionData.children * 36.9;
  }

  protected pensionMinimumSupplement(result: PensionEstimate): number {
    return Number.isFinite(result.monthlyMinimumSupplement) ? result.monthlyMinimumSupplement : 0;
  }

  protected pensionMonthlyTotal(result: PensionEstimate): number {
    if (Number.isFinite(result.monthlyTotalGross)) {
      return result.monthlyTotalGross;
    }
    return result.monthlyGross + this.pensionChildSupplement(result) + this.pensionMinimumSupplement(result);
  }

  protected pensionAnnualTotal(result: PensionEstimate): number {
    if (Number.isFinite(result.annualTotalGross)) {
      return result.annualTotalGross;
    }
    return result.monthlyGross * 14 +
      (this.pensionChildSupplement(result) + this.pensionMinimumSupplement(result)) * 14;
  }

  protected formatMoney(amount: number): string {
    return this.euroFormatter.format(amount);
  }
}
