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
- `/aviso-legal`: uso del sitio y nota sobre la posible obligación de identificación legal pendiente de revisión.
- `/politica-de-privacidad`: información sobre el tratamiento realizado actualmente por el código de la aplicación.
- `/politica-de-cookies`: información sobre cookies y almacenamiento del navegador.
- `/contacto`: datos de contacto y enlace de correo electrónico `mailto:`.

Los titulos y las descripciones se configuran por ruta en Angular. La etiqueta canonical y el sitemap deben añadirse cuando se defina el dominio publico y las URLs definitivas; el alojamiento futuro tambien debe servir la aplicacion Angular para rutas directas.

La versión actual de la aplicación no utiliza cookies ni almacenamiento local. Los cálculos se realizan en el navegador y no se envían a una API de la aplicación.

El enlace de contacto abre el programa de correo de la persona usuaria; la aplicación no recibe el mensaje. La aplicabilidad de los requisitos de identificación de la LSSI-CE debe revisarse según la actividad y el alojamiento real.
