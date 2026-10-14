# Calculadora financiera

Plataforma de calculadoras financieras: sueldo neto, hipoteca, pensión, interés compuesto y finiquito e indemnización.

## Estructura

- `apps/web`: frontend Angular.
- `packages/shared-types`: tipos compartidos y contratos del dominio.
- `packages/calculation-engine`: logica de calculo separada por dominio.
- `docs`: documentacion funcional y normativa.
- `tests`: pruebas unitarias y de integracion.
- `scripts`: automatizaciones del proyecto.

## Comandos

Desde la raiz del proyecto:

```bash
npm install
npm run start:web
npm run build:web
```

Las estimaciones no sustituyen cálculos oficiales ni asesoramiento financiero, fiscal o laboral. Las reglas fiscales y laborales deben versionarse por territorio y ejercicio. La calculadora de IRPF queda pendiente hasta verificar las escalas autonómicas oficiales para 2026.

## Rutas de la aplicacion web

- `/`: portada con enlaces a las calculadoras disponibles.
- `/sueldo-neto`: estimacion de sueldo neto.
- `/calculadora-hipoteca`: estimacion de cuota y coste de hipoteca.
- `/calculadora-prestamo-personal`: cuota, amortización, intereses y costes de un préstamo personal.
- `/calculadora-pension`: proyeccion orientativa de pension de jubilacion.
- `/calculadora-interes-compuesto`: proyección con aportaciones mensuales e interés nominal.
- `/calculadora-finiquito-indemnizacion`: estimación separada del finiquito y de la indemnización por despido.
- `/aviso-legal`: borrador de aviso legal con los datos del titular pendientes de completar.
- `/politica-de-privacidad`: borrador de privacidad que describe el estado actual de la aplicación.
- `/politica-de-cookies`: información del almacenamiento local y las preferencias.

Los titulos y las descripciones se configuran por ruta en Angular. La etiqueta canonical y el sitemap deben añadirse cuando se defina el dominio publico y las URLs definitivas; el alojamiento futuro tambien debe servir la aplicacion Angular para rutas directas.

La aplicación guarda localmente la decisión de privacidad y su fecha cuando la persona usuaria la elige; no envía esa decisión ni los datos de las calculadoras a una API de la aplicación.
