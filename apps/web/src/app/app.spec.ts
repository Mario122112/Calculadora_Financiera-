import { TestBed } from '@angular/core/testing';
import { Meta, Title } from '@angular/platform-browser';
import { provideRouter, Router } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { CalculatorPage as App } from './calculator-page';
import { routes } from './app.routes';
import {
  calculateCompoundInterest,
  calculateMortgage,
  calculatePensionEstimate,
  calculateSalaryNet,
  calculateSeverance
} from '@calculadora-financiera/calculation-engine';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter(routes)],
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
    expect(compiled.querySelectorAll('.calculator-card')).toHaveLength(5);
  });

  it('should open the salary questionnaire when selected', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const salaryLink = fixture.nativeElement.querySelector('.calculator-card') as HTMLAnchorElement;
    salaryLink.click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('#salary-title')?.textContent).toContain('Cuéntanos');
  });

  it('should navigate directly to calculator routes and update route-specific SEO metadata', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const router = TestBed.inject(Router);
    const title = TestBed.inject(Title);
    const meta = TestBed.inject(Meta);

    const pages = [
      {
        path: '/sueldo-neto',
        calculator: 'salary',
        heading: 'Calculadora de sueldo neto',
        title: 'Calculadora de sueldo neto en España | Cuenta Clara',
        description: 'Estima tu sueldo neto en España'
      },
      {
        path: '/calculadora-hipoteca',
        calculator: 'mortgage',
        heading: 'Calculadora de hipoteca',
        title: 'Calculadora de hipoteca: cuota y coste total | Cuenta Clara',
        description: 'Calcula una cuota hipotecaria orientativa'
      },
      {
        path: '/calculadora-pension',
        calculator: 'pension',
        heading: 'Calculadora de pensión de jubilación',
        title: 'Calculadora de pensión de jubilación | Cuenta Clara',
        description: 'Proyecta una pensión contributiva orientativa'
      },
      {
        path: '/calculadora-interes-compuesto',
        calculator: 'compound-interest',
        heading: 'Calculadora de interés compuesto',
        title: 'Calculadora de interés compuesto | Cuenta Clara',
        description: 'Proyecta el crecimiento hipotético de un capital'
      },
      {
        path: '/calculadora-finiquito-indemnizacion',
        calculator: 'severance',
        heading: 'Calculadora de finiquito e indemnización',
        title: 'Calculadora de finiquito e indemnización | Cuenta Clara',
        description: 'Estima por separado el finiquito y la indemnización'
      }
    ] as const;

    for (const page of pages) {
      await router.navigateByUrl(page.path);
      fixture.detectChanges();
      expect(router.url).toBe(page.path);
      expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain(page.heading);
      expect(fixture.componentInstance['selectedCalculator']()).toBe(page.calculator);
      expect(title.getTitle()).toBe(page.title);
      expect(meta.getTag('name="description"')?.content).toContain(page.description);
    }
  });

  it('should render each calculator page when its route is opened directly', async () => {
    const harness = await RouterTestingHarness.create('/sueldo-neto');
    const pages = [
      {
        path: '/sueldo-neto',
        heading: 'Calculadora de sueldo neto',
        formId: '#salary-title'
      },
      {
        path: '/calculadora-hipoteca',
        heading: 'Calculadora de hipoteca',
        formId: '#mortgage-title'
      },
      {
        path: '/calculadora-pension',
        heading: 'Calculadora de pensión de jubilación',
        formId: '#pension-title'
      },
      {
        path: '/calculadora-interes-compuesto',
        heading: 'Calculadora de interés compuesto',
        formId: '#compound-interest-title'
      },
      {
        path: '/calculadora-finiquito-indemnizacion',
        heading: 'Calculadora de finiquito e indemnización',
        formId: '#severance-title'
      }
    ] as const;

    for (const page of pages) {
      await harness.navigateByUrl(page.path, App);
      expect(harness.routeNativeElement?.querySelector('h1')?.textContent).toContain(page.heading);
      expect(harness.routeNativeElement?.querySelector(page.formId)).not.toBeNull();
    }
  });

  it('should provide home and calculator navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('.brand')?.getAttribute('href')).toBe('/');
    expect(element.querySelectorAll('.topbar-nav a')).toHaveLength(5);
    expect(Array.from(element.querySelectorAll('.calculator-card')).map(link => link.getAttribute('href')))
      .toEqual([
        '/sueldo-neto',
        '/calculadora-hipoteca',
        '/calculadora-pension',
        '/calculadora-interes-compuesto',
        '/calculadora-finiquito-indemnizacion'
      ]);
  });

  it('should keep the salary, mortgage, and pension forms valid with their default values', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const calculatorButtons = element.querySelectorAll('.calculator-card') as NodeListOf<HTMLAnchorElement>;

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

    calculatorButtons[3].click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((element.querySelector('.salary-form') as HTMLFormElement).checkValidity()).toBe(true);
    expect(element.querySelector('#compound-interest-title')).not.toBeNull();

    calculatorButtons[4].click();
    await fixture.whenStable();
    fixture.detectChanges();
    expect((element.querySelector('.salary-form') as HTMLFormElement).checkValidity()).toBe(true);
    expect(element.querySelector('#severance-title')).not.toBeNull();
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
    expect(result.monthlyGross).toBeCloseTo(2036.57, 2);
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

  it('should not apply 2026 minimum pension amounts to a future retirement year', () => {
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
    expect(result.annualMinimumSupplement).toBe(0);
    expect(result.minimumSupplementAssessment).toBe('possible-future');
    expect(result.minimumSupplementMessage).toContain('No se proyectan importes');
    expect(result.monthlyTotalGross).toBeCloseTo(result.monthlyGross, 2);
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
    expect(aboveIncomeLimit.minimumSupplementAssessment).toBe('above-reference-income-limit');
    expect(notResident.annualMinimumSupplement).toBe(0);
    expect(notResident.minimumSupplementAssessment).toBe('not-resident');
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
    expect(result.replacementPercentage).toBeCloseTo(0.6238, 4);
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


  it('should render a mortgage result after submitting its form', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[1] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();
    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    const result = element.querySelector('.result-lead > strong')?.textContent?.replace(/\u00a0/g, ' ');
    expect(result).toContain('931 € / mes');
  });

  it('should explain that no mortgage can be calculated when the down payment covers the full price', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance['mortgageData'].downPaymentPercent = 100;
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[1] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    expect(element.querySelector('#down-payment')?.getAttribute('aria-invalid')).toBe('true');
    expect(element.querySelector('#down-payment')?.getAttribute('aria-describedby')).toBe('down-payment-error');
    expect(element.querySelector('#down-payment-error')?.textContent)
      .toContain('no queda capital por financiar');
    expect(fixture.componentInstance['mortgageResult']()).toBeNull();
  });

  it('should render a pension result after submitting its form', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[2] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();
    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();

    const result = element.querySelector('.result-lead > strong')?.textContent?.replace(/\u00a0/g, ' ');
    expect(result).toContain('2037 € / mes');
  });

  it('should limit contributed years to those possible since age 16 and explain invalid values', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance['pensionData'].currentContributionYears = 60;
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[2] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    const contributionYears = element.querySelector('#contribution-years') as HTMLInputElement;
    expect(contributionYears.max).toBe('19');

    expect((element.querySelector('.salary-form') as HTMLFormElement).checkValidity()).toBe(false);
    expect(contributionYears.getAttribute('aria-invalid')).toBe('true');
    expect(contributionYears.getAttribute('aria-describedby')).toBe('contribution-years-error');
    expect(element.querySelector('#contribution-years-error')?.textContent)
      .toContain('el máximo es 19');
    (element.querySelector('.salary-form') as HTMLFormElement).dispatchEvent(
      new Event('submit', { bubbles: true, cancelable: true })
    );
    fixture.detectChanges();
    expect(fixture.componentInstance['pensionResult']()).toBeNull();
  });

  it('should annualize a monthly salary using the selected number of payments', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('.calculator-card') as HTMLAnchorElement).click();
    await fixture.whenStable();
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

  it('should calculate a different salary with the full family-minimum share', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelector('.calculator-card') as HTMLAnchorElement).click();
    await fixture.whenStable();
    const children = element.querySelector('#qualifying-children') as HTMLInputElement;
    children.value = '2';
    children.dispatchEvent(new Event('input', { bubbles: true }));
    await fixture.whenStable();
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

  it('should include the pension child supplement for an entered child count', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    (element.querySelectorAll('.calculator-card')[2] as HTMLAnchorElement).click();
    await fixture.whenStable();
    fixture.detectChanges();

    fixture.componentInstance['pensionData'].children = 2;
    fixture.componentInstance['calculatePension']();

    expect(fixture.componentInstance['pensionResult']()?.monthlyChildSupplement).toBeGreaterThan(0);
  });

  it('should clear spouse income when the answer is no', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance['pensionData'].spouseAnnualIncome = 2400;
    fixture.componentInstance['updateSpouseIncomeStatus'](
      'no',
      document.createElement('form')
    );
    expect(fixture.componentInstance['pensionData'].spouseAnnualIncome).toBe(0);
  });

  it('TEST 1: should estimate the mother case with 15 contributed years and 2 children', () => {
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
    expect(result.ordinaryRetirementAge).toBe(67);
    expect(result.retirementDelayYears).toBe(0);
    expect(result.replacementPercentage).toBeCloseTo(0.6922, 4);
    expect(result.monthlyChildSupplement).toBeCloseTo(73.8, 2);
  });

  it('TEST 2: should estimate the father case with a long career and 2-year delay', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 38,
      retirementAge: 67,
      averageMonthlyContributionBase: 2200,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.projectedContributionYears).toBe(45);
    expect(result.ordinaryRetirementAge).toBe(65);
    expect(result.retirementDelayYears).toBe(2);
    expect(result.delayIncentivePercent).toBe(8);
    expect(result.replacementPercentage).toBe(1);
    expect(result.monthlyGross).toBeCloseTo(2036.57, 1);
    expect(result.monthlyChildSupplement).toBeCloseTo(73.8, 2);
    expect(result.monthlyTotalGross).toBeCloseTo(2110.37, 2);
  });

  it('TEST 3: should keep the pension at ordinary retirement age without delay', () => {
    const result = calculatePensionEstimate({
      currentAge: 62,
      currentContributionYears: 35.5,
      retirementAge: 65,
      averageMonthlyContributionBase: 1800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.ordinaryRetirementAge).toBe(65);
    expect(result.retirementDelayYears).toBe(0);
    expect(result.delayIncentivePercent).toBe(0);
    expect(result.eligible).toBe(true);
  });

  it('TEST 4: should apply a one-year delay incentive', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 38,
      retirementAge: 66,
      averageMonthlyContributionBase: 2000,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.ordinaryRetirementAge).toBe(65);
    expect(result.retirementDelayYears).toBe(1);
    expect(result.delayIncentivePercent).toBe(4);
  });

  it('TEST 5: should apply a two-year delay incentive', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 38,
      retirementAge: 67,
      averageMonthlyContributionBase: 2000,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.ordinaryRetirementAge).toBe(65);
    expect(result.retirementDelayYears).toBe(2);
    expect(result.delayIncentivePercent).toBe(8);
  });

  it('should apply the simplified base-regulatory factor for 2033, 2034, and 2037 without changing the delay incentive', () => {
    const scenarios = [
      { retirementAge: 67, expectedYear: 2033 },
      { retirementAge: 68, expectedYear: 2034 },
      { retirementAge: 71, expectedYear: 2037 }
    ];

    for (const scenario of scenarios) {
      const result = calculatePensionEstimate({
        currentAge: 60,
        currentContributionYears: 38,
        retirementAge: scenario.retirementAge,
        averageMonthlyContributionBase: 2200,
        children: 2,
        includeGenderGapSupplement: true,
        includeMinimumSupplement: false,
        minimumPensionCategory: 'none',
        otherAnnualIncome: 0,
        residesInSpain: true
      });

      expect(result.retirementYear).toBe(scenario.expectedYear);
      expect(result.regulatoryBase).toBeCloseTo(2200 * 300 / 350, 2);
    }

    const twoYearDelay = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 38,
      retirementAge: 67,
      averageMonthlyContributionBase: 2200,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });
    expect(twoYearDelay.delayIncentivePercent).toBe(8);
    expect(twoYearDelay.monthlyTotalGross).toBeCloseTo(2110.37, 2);
  });

  it('should treat a single person as a no-spouse scenario without applying future minimum amounts', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'single',
      spouseIncomeStatus: 'unknown',
      spouseAnnualIncome: 0,
      otherIncomeStatus: 'no',
      otherAnnualIncome: 0,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });

    expect(result.minimumPensionCategoryScenario).toBe('no-spouse');
    expect(result.minimumSupplementAssessment).toBe('possible-future');
    expect(result.annualMinimumSupplement).toBe(0);
  });

  it('should not infer legal spouse dependency merely from marriage and no reported spouse income', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'married',
      spouseIncomeStatus: 'no',
      spouseAnnualIncome: 0,
      otherIncomeStatus: 'no',
      otherAnnualIncome: 0,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });

    expect(result.minimumPensionCategoryScenario).toBe('spouse-dependent');
    expect(result.minimumSupplementAssessment).toBe('possible-future');
    expect(result.minimumSupplementMessage).toContain('la dependencia económica legal no queda confirmada');
    expect(result.annualMinimumSupplement).toBe(0);
  });

  it('should switch to a spouse-not-dependent scenario when the spouse reports income', () => {
    const withoutSpouseIncome = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'married',
      spouseIncomeStatus: 'no',
      spouseAnnualIncome: 0,
      otherIncomeStatus: 'no',
      otherAnnualIncome: 0,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });
    const withSpouseIncome = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'married',
      spouseIncomeStatus: 'yes',
      spouseAnnualIncome: 18000,
      otherIncomeStatus: 'no',
      otherAnnualIncome: 0,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });

    expect(withoutSpouseIncome.minimumPensionCategoryScenario).toBe('spouse-dependent');
    expect(withSpouseIncome.minimumPensionCategoryScenario).toBe('spouse-not-dependent');
    expect(withSpouseIncome.minimumSupplementMessage).toContain('no se presume cónyuge a cargo');
    expect(withSpouseIncome.annualMinimumSupplement).toBe(0);
  });

  it('should reflect own additional income against 2026 reference limits without projecting a future minimum', () => {
    const noOtherIncome = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'married',
      spouseIncomeStatus: 'no',
      spouseAnnualIncome: 0,
      otherIncomeStatus: 'no',
      otherAnnualIncome: 0,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });
    const withOtherIncome = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'married',
      spouseIncomeStatus: 'no',
      spouseAnnualIncome: 0,
      otherIncomeStatus: 'yes',
      otherAnnualIncome: 12000,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });

    expect(noOtherIncome.minimumSupplementAssessment).toBe('possible-future');
    expect(withOtherIncome.minimumSupplementAssessment).toBe('above-reference-income-limit');
    expect(withOtherIncome.annualMinimumSupplement).toBe(0);
    expect(withOtherIncome.monthlyGross).toBe(noOtherIncome.monthlyGross);
    expect(withOtherIncome.monthlyChildSupplement).toBe(noOtherIncome.monthlyChildSupplement);
    expect(withOtherIncome.delayIncentivePercent).toBe(noOtherIncome.delayIncentivePercent);
  });

  it('should report the minimum supplement as undeterminable when family or income details are missing', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: true,
      familyStatus: 'unknown',
      spouseIncomeStatus: 'unknown',
      spouseAnnualIncome: 0,
      otherIncomeStatus: 'unknown',
      otherAnnualIncome: 0,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });

    expect(result.minimumSupplementAssessment).toBe('insufficient-data');
    expect(result.minimumSupplementMessage).toBe(
      'Complemento a mínimos: no determinable con precisión con los datos introducidos.'
    );
    expect(result.monthlyMinimumSupplement).toBe(0);
  });

  it('should keep the father pension, child supplement, and delay unchanged with family-income inputs', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 38,
      retirementAge: 67,
      averageMonthlyContributionBase: 2200,
      children: 2,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      familyStatus: 'married',
      spouseIncomeStatus: 'yes',
      spouseAnnualIncome: 30000,
      otherIncomeStatus: 'yes',
      otherAnnualIncome: 5000,
      minimumPensionCategory: 'none',
      residesInSpain: true
    });

    expect(result.projectedContributionYears).toBe(45);
    expect(result.ordinaryRetirementAge).toBe(65);
    expect(result.retirementDelayYears).toBe(2);
    expect(result.delayIncentivePercent).toBe(8);
    expect(result.monthlyGross).toBeCloseTo(2036.57, 2);
    expect(result.monthlyChildSupplement).toBeCloseTo(73.8, 2);
    expect(result.monthlyTotalGross).toBeCloseTo(2110.37, 2);
  });

  it('TEST 6: should reject low contribution years before the minimum threshold', () => {
    const result = calculatePensionEstimate({
      currentAge: 35,
      currentContributionYears: 5,
      retirementAge: 40,
      averageMonthlyContributionBase: 1600,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.meetsMinimumContribution).toBe(false);
    expect(result.eligible).toBe(false);
    expect(result.monthlyGross).toBe(0);
  });

  it('TEST 7: should cap higher replacement percentages for a long career', () => {
    const result = calculatePensionEstimate({
      currentAge: 48,
      currentContributionYears: 30,
      retirementAge: 67,
      averageMonthlyContributionBase: 2000,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.projectedContributionYears).toBe(49);
    expect(result.replacementPercentage).toBe(1);
    expect(result.effectiveReplacementPercentage).toBeGreaterThan(1);
  });

  it('TEST 8: should not add the child supplement when there are no children', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 30,
      retirementAge: 67,
      averageMonthlyContributionBase: 2000,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.monthlyChildSupplement).toBe(0);
  });

  it('TEST 9: should add the child supplement for one child', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 30,
      retirementAge: 67,
      averageMonthlyContributionBase: 2000,
      children: 1,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.monthlyChildSupplement).toBeCloseTo(36.9, 2);
  });

  it('TEST 10: should cap the child supplement to four children', () => {
    const result = calculatePensionEstimate({
      currentAge: 60,
      currentContributionYears: 30,
      retirementAge: 67,
      averageMonthlyContributionBase: 2000,
      children: 4,
      includeGenderGapSupplement: true,
      includeMinimumSupplement: false,
      minimumPensionCategory: 'none',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.monthlyChildSupplement).toBeCloseTo(147.6, 2);
  });

  it('TEST 11: should keep the minimum pension top-up off when a married spouse has income', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: true,
      minimumPensionCategory: 'spouse-not-dependent',
      otherAnnualIncome: 12000,
      residesInSpain: true
    });

    expect(result.annualMinimumSupplement).toBe(0);
  });

  it('TEST 12: should not project a minimum top-up for a future retirement year', () => {
    const result = calculatePensionEstimate({
      currentAge: 59,
      currentContributionYears: 15,
      retirementAge: 67,
      averageMonthlyContributionBase: 800,
      children: 0,
      includeGenderGapSupplement: false,
      includeMinimumSupplement: true,
      minimumPensionCategory: 'spouse-dependent',
      otherAnnualIncome: 0,
      residesInSpain: true
    });

    expect(result.annualMinimumSupplement).toBe(0);
    expect(result.minimumSupplementAssessment).toBe('possible-future');
  });

  it('should compound end-of-month contributions monthly and report the contributed principal', () => {
    const result = calculateCompoundInterest({
      initialCapital: 10000,
      monthlyContribution: 100,
      annualNominalRate: 12,
      termYears: 1
    });
    const monthlyRate = 0.01;
    const expectedBalance =
      10000 * Math.pow(1 + monthlyRate, 12) +
      100 * (Math.pow(1 + monthlyRate, 12) - 1) / monthlyRate;

    expect(result.futureValue).toBeCloseTo(expectedBalance, 8);
    expect(result.totalContributions).toBe(11200);
    expect(result.interestEarned).toBeCloseTo(expectedBalance - 11200, 8);
    expect(result.yearlyBalances).toHaveLength(2);
  });

  it('should produce the sum of capital and end-of-month contributions at zero interest', () => {
    const result = calculateCompoundInterest({
      initialCapital: 1000,
      monthlyContribution: 100,
      annualNominalRate: 0,
      termYears: 2
    });

    expect(result.futureValue).toBe(3400);
    expect(result.interestEarned).toBe(0);
    expect(result.yearlyBalances).toEqual([1000, 2200, 3400]);
  });

  it('should reject a compound-interest scenario with no invested capital', () => {
    expect(() => calculateCompoundInterest({
      initialCapital: 0,
      monthlyContribution: 0,
      annualNominalRate: 5,
      termYears: 10
    })).toThrow(RangeError);
  });

  it('should separate settlement amounts from objective dismissal compensation', () => {
    const result = calculateSeverance({
      annualSalary: 36500,
      pendingSalaryDays: 5,
      unusedVacationDays: 10,
      accruedExtraPay: 500,
      contractStartDate: '2020-01-01',
      terminationDate: '2021-12-31',
      dismissalType: 'objective'
    });

    expect(result.dailySalary).toBe(100);
    expect(result.pendingSalary).toBe(500);
    expect(result.unusedVacationPay).toBe(1000);
    expect(result.accruedExtraPay).toBe(500);
    expect(result.settlementTotal).toBe(2000);
    expect(result.severanceDays).toBeCloseTo(40, 5);
    expect(result.severanceAmount).toBeCloseTo(4000, 2);
    expect(result.totalGross).toBeCloseTo(6000, 2);
  });

  it('should apply the pre-February-2012 and post-transition unfair dismissal rates', () => {
    const result = calculateSeverance({
      annualSalary: 36500,
      pendingSalaryDays: 0,
      unusedVacationDays: 0,
      accruedExtraPay: 0,
      contractStartDate: '2011-02-12',
      terminationDate: '2013-02-12',
      dismissalType: 'unfair'
    });

    expect(result.severanceDays).toBeCloseTo(78, 5);
    expect(result.severanceAmount).toBeCloseTo(7800, 2);
  });

  it('should apply the 1,260-day transitional cap for long pre-2012 service', () => {
    const result = calculateSeverance({
      annualSalary: 36500,
      pendingSalaryDays: 0,
      unusedVacationDays: 0,
      accruedExtraPay: 0,
      contractStartDate: '1970-01-01',
      terminationDate: '2013-02-12',
      dismissalType: 'unfair'
    });

    expect(result.severanceDays).toBe(1260);
    expect(result.severanceAmount).toBe(126000);
  });

  it('should apply the standard 720-day cap for unfair dismissal and the 12-month cap for objective dismissal', () => {
    const unfair = calculateSeverance({
      annualSalary: 36500,
      pendingSalaryDays: 0,
      unusedVacationDays: 0,
      accruedExtraPay: 0,
      contractStartDate: '2012-02-12',
      terminationDate: '2050-02-12',
      dismissalType: 'unfair'
    });
    const objective = calculateSeverance({
      annualSalary: 36500,
      pendingSalaryDays: 0,
      unusedVacationDays: 0,
      accruedExtraPay: 0,
      contractStartDate: '2000-01-01',
      terminationDate: '2020-01-01',
      dismissalType: 'objective'
    });

    expect(unfair.severanceDays).toBe(720);
    expect(unfair.severanceAmount).toBe(72000);
    expect(objective.severanceDays).toBe(365);
    expect(objective.severanceAmount).toBe(36500);
  });

  it('should reject a contract termination date before its start date', () => {
    expect(() => calculateSeverance({
      annualSalary: 36500,
      pendingSalaryDays: 0,
      unusedVacationDays: 0,
      accruedExtraPay: 0,
      contractStartDate: '2025-01-01',
      terminationDate: '2024-12-31',
      dismissalType: 'objective'
    })).toThrow(RangeError);
  });

  it('should expose the compound-interest result and accessible chart on its route', async () => {
    const harness = await RouterTestingHarness.create('/calculadora-interes-compuesto');
    const form = harness.routeNativeElement?.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.fixture.detectChanges();

    expect(harness.routeNativeElement?.querySelector('.result-panel')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('.growth-chart li')?.getAttribute('aria-label'))
      .toContain('Año 0');
    expect(harness.routeNativeElement?.querySelector('.result-lead')?.textContent)
      .toContain('CAPITAL PROYECTADO');
  });

  it('should associate the empty compound-interest validation error with its inputs', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/calculadora-interes-compuesto');
    fixture.componentInstance['compoundInterestData'].initialCapital = 0;
    fixture.componentInstance['compoundInterestData'].monthlyContribution = 0;
    fixture.componentInstance['calculateCompoundInterest']();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const capital = element.querySelector('#initial-capital');
    const error = element.querySelector('#compound-interest-error');
    expect(capital?.getAttribute('aria-invalid')).toBe('true');
    expect(capital?.getAttribute('aria-describedby')).toBe('compound-interest-error');
    expect(error?.getAttribute('role')).toBe('alert');
    expect(error?.textContent).toContain('capital inicial o una aportación mensual');
  });

  it('should expose a separate finiquito and severance breakdown on its route', async () => {
    const harness = await RouterTestingHarness.create('/calculadora-finiquito-indemnizacion');
    const form = harness.routeNativeElement?.querySelector('form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    await harness.fixture.whenStable();
    harness.fixture.detectChanges();

    expect(harness.routeNativeElement?.querySelector('.result-panel')).not.toBeNull();
    expect(harness.routeNativeElement?.querySelector('.result-metrics')?.textContent)
      .toContain('Finiquito estimado');
    expect(harness.routeNativeElement?.querySelector('.result-metrics')?.textContent)
      .toContain('Indemnización estimada');
  });

  it('should associate reversed contract dates with an accessible validation message', async () => {
    const fixture = TestBed.createComponent(App);
    const router = TestBed.inject(Router);
    await router.navigateByUrl('/calculadora-finiquito-indemnizacion');
    fixture.componentInstance['severanceData'].contractStartDate = '2026-01-01';
    fixture.componentInstance['severanceData'].terminationDate = '2025-01-01';
    fixture.componentInstance['calculateSeverance']();
    fixture.detectChanges();

    const element = fixture.nativeElement as HTMLElement;
    const startDate = element.querySelector('#contract-start-date');
    const endDate = element.querySelector('#termination-date');
    const error = element.querySelector('#severance-date-error');
    expect(startDate?.getAttribute('aria-invalid')).toBe('true');
    expect(endDate?.getAttribute('aria-describedby')).toBe('severance-date-error');
    expect(error?.getAttribute('role')).toBe('alert');
    expect(error?.textContent).toContain('no puede ser posterior');
  });
});
