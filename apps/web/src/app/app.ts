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

  protected salaryData = {
    annualGross: 30000,
    payments: 14 as 12 | 14,
    contractType: 'permanent' as 'permanent' | 'temporary',
    children: 0,
    disability: false
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
    averageMonthlyContributionBase: 2200
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
    this.salaryResult.set(calculateSalaryNet(this.salaryData));
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
    this.pensionResult.set(calculatePensionEstimate(this.pensionData));
  }

  protected formatMoney(amount: number): string {
    return this.euroFormatter.format(amount);
  }
}
