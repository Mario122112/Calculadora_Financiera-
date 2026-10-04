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

  it('should keep the salary, mortgage, and pension forms valid with their default values', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const calculatorButtons = element.querySelectorAll('.calculator-card') as NodeListOf<HTMLButtonElement>;

    calculatorButtons[0].click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((element.querySelector('.salary-form') as HTMLFormElement).checkValidity()).toBe(true);

    calculatorButtons[1].click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((element.querySelector('.salary-form') as HTMLFormElement).checkValidity()).toBe(true);

    calculatorButtons[2].click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((element.querySelector('.salary-form') as HTMLFormElement).checkValidity()).toBe(true);
    expect(element.querySelector('#pension-children')).not.toBeNull();
    expect(element.querySelector('#include-gender-gap-supplement')).toBeNull();
  });

  it('should show a salary estimate for a standard annual salary', () => {
    const result = calculateSalaryNet({
      annualGross: 30000,
      payments: 14,
      contractType: 'permanent',
      age: 35,
      qualifyingChildren: 0,
      childrenUnderThree: 0,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });

    expect(result.socialSecurity).toBe(1950);
    expect(result.incomeTax).toBe(4926);
    expect(result.netAnnual).toBe(23124);
    expect(result.netMonthlyAverage).toBe(1927);
    expect(result.netPerPayment).toBeCloseTo(1651.71, 2);
  });

  it('should cap ordinary contributions and apply the 2026 solidarity contribution', () => {
    const result = calculateSalaryNet({
      annualGross: 100000,
      payments: 12,
      contractType: 'permanent',
      age: 40,
      qualifyingChildren: 0,
      childrenUnderThree: 0,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });

    expect(result.contributionBase).toBeCloseTo(61214.4, 2);
    expect(result.ordinarySocialSecurity).toBeCloseTo(3978.936, 2);
    expect(result.solidarityContribution).toBeCloseTo(82.68, 2);
    expect(result.socialSecurity).toBeCloseTo(result.ordinarySocialSecurity + result.solidarityContribution, 2);
  });

  it('should account for descendant age and shared family minimums', () => {
    const sharedMinimum = calculateSalaryNet({
      annualGross: 30000,
      payments: 12,
      contractType: 'permanent',
      age: 65,
      qualifyingChildren: 2,
      childrenUnderThree: 1,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });
    const fullMinimum = calculateSalaryNet({
      annualGross: 30000,
      payments: 12,
      contractType: 'permanent',
      age: 65,
      qualifyingChildren: 2,
      childrenUnderThree: 1,
      childMinimumShare: 'full',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });

    expect(sharedMinimum.personalMinimum).toBe(5550 + 1150 + (2400 + 2800 + 2700) / 2);
    expect(fullMinimum.personalMinimum).toBe(5550 + 1150 + 2400 + 2800 + 2700);
    expect(fullMinimum.incomeTax).toBeLessThan(sharedMinimum.incomeTax);
  });

  it('should apply the statutory work-income reduction for lower earnings only when eligible', () => {
    const eligible = calculateSalaryNet({
      annualGross: 18000,
      payments: 12,
      contractType: 'permanent',
      age: 35,
      qualifyingChildren: 0,
      childrenUnderThree: 0,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });
    const otherIncomeOverLimit = calculateSalaryNet({
      annualGross: 18000,
      payments: 12,
      contractType: 'permanent',
      age: 35,
      qualifyingChildren: 0,
      childrenUnderThree: 0,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: true
    });

    expect(eligible.employmentIncomeReduction).toBe(7302);
    expect(eligible.taxableBase).toBe(7528);
    expect(otherIncomeOverLimit.employmentIncomeReduction).toBe(0);
    expect(otherIncomeOverLimit.incomeTax).toBeGreaterThan(eligible.incomeTax);
  });

  it('should taper the work-income reduction through both intermediate income bands', () => {
    const secondBand = calculateSalaryNet({
      annualGross: 20000,
      payments: 12,
      contractType: 'permanent',
      age: 35,
      qualifyingChildren: 0,
      childrenUnderThree: 0,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });
    const thirdBand = calculateSalaryNet({
      annualGross: 21200,
      payments: 12,
      contractType: 'permanent',
      age: 35,
      qualifyingChildren: 0,
      childrenUnderThree: 0,
      childMinimumShare: 'shared',
      disabilityLevel: 'none',
      reducedMobility: false,
      otherNonExemptIncomeOver6500: false
    });

    expect(secondBand.employmentIncomeReduction).toBeCloseTo(7302 - 1.75 * (16700 - 14852), 2);
    expect(thirdBand.employmentIncomeReduction).toBeCloseTo(2364.34 - 1.14 * (17822 - 17673.52), 2);
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
      averageMonthlyContributionBase: 2200,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
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
      averageMonthlyContributionBase: 2200,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.eligible).toBe(false);
    expect(result.monthlyGross).toBe(0);
    expect(result.monthlyChildSupplement).toBe(0);
  });

  it('should include the estimated child supplement for an eligible pension', () => {
    const result = calculatePensionEstimate({
      currentAge: 35,
      currentContributionYears: 10,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.monthlyChildSupplement).toBeCloseTo(73.8, 2);
    expect(result.annualChildSupplement).toBeCloseTo(1033.2, 2);
    expect(result.monthlyTotalGross).toBeCloseTo(result.monthlyGross + 73.8, 2);
  });

  it('should calculate the reported pension example without NaN values', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.projectedContributionYears).toBe(23);
    expect(result.statutoryRetirementAge).toBe(67);
    expect(result.eligible).toBe(true);
    expect(result.monthlyGross).toBeCloseTo(474.65, 2);
    expect(result.monthlyTotalGross).toBeCloseTo(548.45, 2);
    expect(result.annualTotalGross).toBeCloseTo(7678.32, 2);
  });

  it('should estimate the 2026 minimum pension top-up when declared conditions qualify', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: true,
      minimumPensionCategory: 'no-spouse',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.annualGross).toBeCloseTo(6645.12, 2);
    expect(result.annualMinimumSupplement).toBeCloseTo(13106.8 - 6645.12, 2);
    expect(result.monthlyTotalGross).toBeCloseTo(936.2, 2);
  });

  it('should not estimate the minimum top-up above the income threshold or when not resident', () => {
    const aboveIncomeLimit = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: true,
      minimumPensionCategory: 'no-spouse',
      otherAnnualIncome: 9442.01,
      residesInSpain: true
    });
    const notResident = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: true,
      minimumPensionCategory: 'no-spouse',
      otherAnnualIncome: 0,
      residesInSpain: false
    });

    expect(aboveIncomeLimit.annualMinimumSupplement).toBe(0);
    expect(notResident.annualMinimumSupplement).toBe(0);
  });

  it('should cap the contributory pension and add supplements separately', () => {
    const result = calculatePensionEstimate({
      currentAge: 65,
      currentContributionYears: 40,
      retirementAge: 65,
      averageMonthlyContributionBase: 10000,
      children: 4,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.annualGross).toBe(47034.4);
    expect(result.monthlyGross).toBeCloseTo(3359.6, 2);
    expect(result.monthlyChildSupplement).toBeCloseTo(147.6, 2);
    expect(result.monthlyTotalGross).toBeCloseTo(3507.2, 2);
  });

  it('should use whole contribution months and the ordinary retirement age', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 15,
      retirementAge: 65,
      averageMonthlyContributionBase: 1800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.projectedContributionYears).toBe(20);
    expect(result.statutoryRetirementAge).toBe(67);
    expect(result.meetsMinimumContribution).toBe(true);
    expect(result.meetsOrdinaryRetirementAge).toBe(false);
    expect(result.eligible).toBe(false);
    expect(result.replacementPercentage).toBe(0);
  });

  it('should project 22 contribution years for age 60, 15 years contributed, and retirement at 67', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 1800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.projectedContributionYears).toBe(22);
    expect(result.replacementPercentage).toBeCloseTo(0.6694, 4);
    expect(result.eligible).toBe(true);
  });


  it('should apply the 2026 ordinary retirement age when contribution threshold is met', () => {
    const result = calculatePensionEstimate({
      currentAge: 65,
      currentContributionYears: 38.25,
      retirementAge: 65,
      averageMonthlyContributionBase: 2000,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.retirementYear).toBe(2026);
    expect(result.statutoryRetirementAge).toBe(65);
    expect(result.eligible).toBe(true);
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

  it('should annualize a monthly salary using the selected number of payments', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('.calculator-card') as HTMLButtonElement).click();
    fixture.detectChanges();
    (element.querySelectorAll('.input-mode button')[1] as HTMLButtonElement).click();
    fixture.detectChanges();
    fixture.componentInstance['salaryData'].monthlyGross = 3000;
    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    expect(element.querySelector('.result-metrics')?.textContent?.replace(/\u00a0/g, ' '))
      .toContain('42.000 €');
  });

  it('should calculate a different salary with the full family-minimum share', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('.calculator-card') as HTMLButtonElement).click();
    fixture.componentInstance['salaryData'].qualifyingChildren = 2;
    fixture.detectChanges();

    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    const sharedResult = fixture.componentInstance['salaryResult']()?.netAnnual;

    fixture.componentInstance['salaryData'].childMinimumShare = 'full';
    fixture.componentInstance['calculateSalary']();

    expect(fixture.componentInstance['salaryResult']()?.netAnnual).not.toBe(sharedResult);
  });

  it('should include the pension child supplement for an entered child count', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[2] as HTMLButtonElement).click();
    fixture.detectChanges();

    fixture.componentInstance['pensionData'].children = 2;
    fixture.componentInstance['calculatePension']();

    expect(fixture.componentInstance['pensionResult']()?.monthlyChildSupplement).toBeGreaterThan(0);
  });
});
