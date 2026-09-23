# Calculadora financiera

Plataforma para calcular sueldo neto, hipotecas, finiquitos y pensiones.

## Estructura

- `apps/web`: frontend Angular.
- `apps/api`: API NestJS con TypeScript.
- `packages/shared-types`: contratos y tipos compartidos entre frontend y backend.
- `packages/calculation-engine`: logica de calculo separada por dominio.
- `docs`: documentacion funcional y normativa.
- `tests`: pruebas unitarias y de integracion.
- `scripts`: automatizaciones del proyecto.

## Comandos

Desde la raiz del proyecto:

```bash
npm install
npm run start:web
npm run start:api
npm run build:web
npm run build:api
```

Las calculadoras previstas son sueldo neto, hipoteca, finiquito y pension. Las reglas fiscales y laborales deberan versionarse por pais, territorio y ejercicio antes de usarse en produccion.
