import { Component, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  calculateMortgage,
  calculatePensionEstimate,
  calculateSalaryNet,
  type MortgageEstimate,
  type PensionEstimate,
  type SalaryEstimate
} from '@calculadora-financiera/calculation-engine';

type Calculator = 'salary' | 'mortgage' | 'pension';

@Component({
  selector: 'app-root',
  imports: [DecimalPipe, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly selectedCalculator = signal<Calculator | null>(null);
  protected readonly salaryResult = signal<SalaryEstimate | null>(null);
  protected readonly mortgageResult = signal<MortgageEstimate | null>(null);
  protected readonly pensionResult = signal<PensionEstimate | null>(null);
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

  private readonly euroFormatter = new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });

  protected selectCalculator(calculator: Calculator): void {
    this.selectedCalculator.set(calculator);
    this.salaryResult.set(null);
    this.mortgageResult.set(null);
    this.pensionResult.set(null);
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
    this.mortgageResult.set(calculateMortgage({
      principal,
      annualInterestRate: this.mortgageData.annualInterestRate,
      termYears: this.mortgageData.termYears
    }));
  }

  protected calculatePension(): void {
    this.pensionResult.set(calculatePensionEstimate({
      ...this.pensionData,
      includeGenderGapSupplement: this.pensionData.children > 0
    }));
  }

  protected refreshPensionResult(form: HTMLFormElement): void {
    if (this.pensionResult() && form.checkValidity()) {
      this.calculatePension();
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
