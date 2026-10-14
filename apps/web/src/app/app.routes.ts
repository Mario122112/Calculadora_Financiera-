import { Routes } from '@angular/router';
import { CalculatorPage } from './calculator-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CalculatorPage,
    title: 'Cuenta Clara | Calculadoras financieras',
    data: {
      description: 'Calculadoras financieras gratuitas para España: estima sueldo neto, hipoteca, préstamo personal, pensión, interés compuesto y finiquito.'
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
    path: 'calculadora-prestamo-personal',
    component: CalculatorPage,
    title: 'Calculadora de préstamo personal: cuota y coste total | Cuenta Clara',
    data: {
      calculator: 'personal-loan',
      description: 'Calcula la cuota, intereses, comisiones y coste total de un préstamo personal con TIN nominal y escenarios hipotéticos.'
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
  {
    path: 'aviso-legal',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Aviso legal | Cuenta Clara',
    data: {
      legalPage: 'legal',
      description: 'Información sobre la titularidad, el uso y las condiciones de Cuenta Clara.'
    }
  },
  {
    path: 'politica-de-privacidad',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Política de privacidad | Cuenta Clara',
    data: {
      legalPage: 'privacy',
      description: 'Consulta qué datos trata Cuenta Clara, para qué los utiliza y cómo ejercer tus derechos.'
    }
  },
  {
    path: 'politica-de-cookies',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Política de cookies | Cuenta Clara',
    data: {
      legalPage: 'cookies',
      description: 'Información sobre el almacenamiento local y las preferencias de privacidad de Cuenta Clara.'
    }
  },
  { path: '**', redirectTo: '' }
];
