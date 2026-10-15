import { Routes } from '@angular/router';
import { CalculatorPage } from './calculator-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CalculatorPage,
    title: 'CuentaClara | Calculadoras financieras',
    data: {
      description: 'Calculadoras financieras gratuitas para España: estima sueldo neto, hipoteca, préstamo personal, pensión, interés compuesto y finiquito.'
    }
  },
  {
    path: 'sueldo-neto',
    component: CalculatorPage,
    title: 'Calculadora de sueldo neto en España | CuentaClara',
    data: {
      calculator: 'salary',
      description: 'Estima tu sueldo neto en España a partir del salario bruto, las pagas y algunos datos personales. Resultado orientativo para 2026.'
    }
  },
  {
    path: 'calculadora-hipoteca',
    component: CalculatorPage,
    title: 'Calculadora de hipoteca: cuota y coste total | CuentaClara',
    data: {
      calculator: 'mortgage',
      description: 'Calcula una cuota hipotecaria orientativa con el precio, la entrada, el interés nominal y el plazo. No incluye gastos ni comisiones.'
    }
  },
  {
    path: 'calculadora-prestamo-personal',
    component: CalculatorPage,
    title: 'Calculadora de préstamo personal: cuota y coste total | CuentaClara',
    data: {
      calculator: 'personal-loan',
      description: 'Calcula la cuota, intereses, comisiones y coste total de un préstamo personal con TIN nominal y escenarios hipotéticos.'
    }
  },
  {
    path: 'calculadora-pension',
    component: CalculatorPage,
    title: 'Calculadora de pensión de jubilación | CuentaClara',
    data: {
      calculator: 'pension',
      description: 'Proyecta una pensión contributiva orientativa según edad, cotización y base media mensual. No sustituye el cálculo oficial.'
    }
  },
  {
    path: 'calculadora-interes-compuesto',
    component: CalculatorPage,
    title: 'Calculadora de interés compuesto | CuentaClara',
    data: {
      calculator: 'compound-interest',
      description: 'Proyecta el crecimiento hipotético de un capital con aportaciones mensuales y rentabilidad anual nominal. Sin impuestos ni inflación.'
    }
  },
  {
    path: 'calculadora-finiquito-indemnizacion',
    component: CalculatorPage,
    title: 'Calculadora de finiquito e indemnización | CuentaClara',
    data: {
      calculator: 'severance',
      description: 'Estima por separado el finiquito y la indemnización por despido objetivo o improcedente, con un cálculo orientativo de antigüedad.'
    }
  },
  {
    path: 'aviso-legal',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Aviso legal | CuentaClara',
    data: {
      legalPage: 'legal',
      description: 'Información sobre el uso de las calculadoras de CuentaClara y las obligaciones de identificación pendientes de revisión.'
    }
  },
  {
    path: 'politica-de-privacidad',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Política de privacidad | CuentaClara',
    data: {
      legalPage: 'privacy',
      description: 'Información sobre los datos que CuentaClara trata al usar las calculadoras o contactar por correo.'
    }
  },
  {
    path: 'politica-de-cookies',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Política de cookies | CuentaClara',
    data: {
      legalPage: 'cookies',
      description: 'Información sobre las cookies y el almacenamiento utilizados por CuentaClara.'
    }
  },
  {
    path: 'contacto',
    loadComponent: () => import('./core/privacy/legal-page').then(module => module.LegalPage),
    title: 'Contacto y sugerencias | CuentaClara',
    data: {
      legalPage: 'contact',
      description: 'Datos de contacto y correo electrónico de CuentaClara.'
    }
  },
  { path: '**', redirectTo: '' }
];
