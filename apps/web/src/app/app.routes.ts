import { Routes } from '@angular/router';
import { CalculatorPage } from './calculator-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CalculatorPage,
    title: 'Cuenta Clara | Calculadoras financieras',
    data: {
      description: 'Calculadoras financieras gratuitas para España: estima sueldo neto, hipoteca, pensión, interés compuesto y finiquito.'
    }
  },
  {
    path: 'sueldo-neto',
    component: CalculatorPage,
    title: 'Calculadora de sueldo neto en España | Cuenta Clara',
    data: {
      calculator: 'salary',
      description: 'Estima tu sueldo neto en España a partir del salario bruto, las pagas y algunos datos personales. Resultado orientativo para 2026.'
    }
  },
  {
    path: 'calculadora-hipoteca',
    component: CalculatorPage,
    title: 'Calculadora de hipoteca: cuota y coste total | Cuenta Clara',
    data: {
      calculator: 'mortgage',
      description: 'Calcula una cuota hipotecaria orientativa con el precio, la entrada, el interés nominal y el plazo. No incluye gastos ni comisiones.'
    }
  },
  {
    path: 'calculadora-pension',
    component: CalculatorPage,
    title: 'Calculadora de pensión de jubilación | Cuenta Clara',
    data: {
      calculator: 'pension',
      description: 'Proyecta una pensión contributiva orientativa según edad, cotización y base media mensual. No sustituye el cálculo oficial.'
    }
  },
  {
    path: 'calculadora-interes-compuesto',
    component: CalculatorPage,
    title: 'Calculadora de interés compuesto | Cuenta Clara',
    data: {
      calculator: 'compound-interest',
      description: 'Proyecta el crecimiento hipotético de un capital con aportaciones mensuales y rentabilidad anual nominal. Sin impuestos ni inflación.'
    }
  },
  {
    path: 'calculadora-finiquito-indemnizacion',
    component: CalculatorPage,
    title: 'Calculadora de finiquito e indemnización | Cuenta Clara',
    data: {
      calculator: 'severance',
      description: 'Estima por separado el finiquito y la indemnización por despido objetivo o improcedente, con un cálculo orientativo de antigüedad.'
    }
  },
  { path: '**', redirectTo: '' }
];
