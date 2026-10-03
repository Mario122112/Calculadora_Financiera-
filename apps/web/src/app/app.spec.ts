import { TestBed } from '@angular/core/testing';
import { App } from './app';
import {
  calculateMortgage,
  calculatePensionEstimate,
  calculateSalaryNet
} from '@calculadora-financiera/calculation-engine';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the calculator choices', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Decisiones claras');
    expect(compiled.querySelectorAll('.calculator-card')).toHaveLength(3);
  });

  it('should open the salary questionnaire when selected', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const salaryButton = fixture.nativeElement.querySelector('.calculator-card') as HTMLButtonElement;
    salaryButton.click();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#salary-title')?.textContent).toContain('Cuéntanos');
  });

  it('should show a salary estimate for a standard annual salary', () => {
    const result = calculateSalaryNet({
      annualGross: 30000,
      payments: 14,
      children: 0,
      disability: false,
      contractType: 'permanent'
    });

    expect(result.socialSecurity).toBe(1950);
    expect(result.incomeTax).toBe(4926);
    expect(result.netAnnual).toBe(23124);
    expect(result.netMonthlyAverage).toBe(1927);
    expect(result.netPerPayment).toBeCloseTo(1651.71, 2);
  });

  it('should calculate a mortgage with zero interest', () => {
    const result = calculateMortgage({
      principal: 100000,
      annualInterestRate: 0,
      termYears: 10
    });

    expect(result.paymentCount).toBe(120);
    expect(result.monthlyPayment).toBeCloseTo(833.33, 2);
    expect(result.totalPaid).toBeCloseTo(100000, 2);
    expect(result.totalInterest).toBeCloseTo(0, 2);
  });

  it('should project pension eligibility and cap the contribution percentage', () => {
    const result = calculatePensionEstimate({
      currentAge: 35,
      currentContributionYears: 10,
      retirementAge: 67,
      averageMonthlyContributionBase: 2200
    });

    expect(result.projectedContributionYears).toBe(42);
    expect(result.replacementPercentage).toBe(1);
    expect(result.eligible).toBe(true);
    expect(result.monthlyGross).toBeCloseTo(1885.71, 2);
  });

  it('should not estimate a contributory pension before 15 years', () => {
    const result = calculatePensionEstimate({
      currentAge: 30,
      currentContributionYears: 0,
      retirementAge: 40,
      averageMonthlyContributionBase: 2200
    });

    expect(result.eligible).toBe(false);
    expect(result.monthlyGross).toBe(0);
  });

  it('should render a mortgage result after submitting its form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    const result = element.querySelector('.result-lead > strong')?.textContent?.replace(/\u00a0/g, ' ');
    expect(result).toContain('931 € / mes');
  });

  it('should render a pension result after submitting its form', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[2] as HTMLButtonElement).click();
    fixture.detectChanges();
    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    const result = element.querySelector('.result-lead > strong')?.textContent?.replace(/\u00a0/g, ' ');
    expect(result).toContain('1886 € / mes');
  });
});
