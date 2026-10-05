# Modelos de cálculo para España

Los resultados son estimaciones orientativas para el ejercicio 2026, no una nómina, liquidación del IRPF ni resolución de la Seguridad Social. Las reglas pueden cambiar; antes de tomar decisiones hay que contrastar los datos con la AEAT y la Seguridad Social.

## Sueldo neto por cuenta ajena

La calculadora supone doce meses trabajados durante todo el año y una relación laboral ordinaria. El bruto anual es la suma de todas las pagas; las pagas extra se prorratean para estimar la cotización mensual.

### Cotizaciones del trabajador en 2026

- Contingencias comunes: 4,70 %.
- Desempleo: 1,55 % con contrato indefinido y 1,60 % con contrato temporal.
- Formación profesional: 0,10 %.
- Mecanismo de Equidad Intergeneracional (MEI): 0,15 %.
- Cuota ordinaria resultante: 6,50 % o 6,55 %, aplicada como máximo a una base anual de 61.214,40 EUR (5.101,20 EUR al mes).
- Para la remuneración que supera esa base se añade la cotización de solidaridad: 0,19 % sobre el primer 10 % por encima del tope, 0,21 % sobre el siguiente 40 % y 0,24 % sobre el exceso restante. La cuota no aumenta la base de la pensión.

No se aplica una base mínima universal: depende del grupo de cotización y de la jornada. Tampoco se incluyen horas extraordinarias, situaciones laborales especiales ni cotizaciones empresariales.

### Retención estimada de IRPF

La base de trabajo se aproxima restando al salario bruto las cotizaciones del trabajador, 2.000 EUR de otros gastos deducibles y, si procede, los gastos adicionales por trabajador con discapacidad. Cuando el rendimiento neto del trabajo cumple los requisitos del artículo 20 de la LIRPF y no hay otras rentas no exentas superiores a 6.500 EUR, se aplica además la reducción anual correspondiente: 7.302 EUR hasta 14.852 EUR netos; después se reduce a razón de 1,75 EUR por cada euro que exceda ese umbral hasta 17.673,52 EUR; en el tramo siguiente disminuye a razón de 1,14 EUR por euro hasta 19.747,50 EUR. Se estima la cuota con los tramos marginales de referencia (19 %, 24 %, 30 %, 37 %, 45 % y 47 %) y se resta la cuota asociada al mínimo personal y familiar.

Se consideran el mínimo personal general de 5.550 EUR, los incrementos por edad (1.150 EUR desde los 65 y otros 1.400 EUR desde los 75), los mínimos por descendientes (2.400, 2.700, 4.000 y 4.500 EUR según orden, más 2.800 EUR por cada menor de tres años) y los mínimos por discapacidad (3.000 EUR desde el 33 %; 9.000 EUR desde el 65 %, más 3.000 EUR cuando corresponda por asistencia o movilidad). El mínimo por descendientes puede compartirse entre progenitores. La aplicación depende de requisitos de edad, convivencia y rentas que la calculadora no verifica.

Para un trabajador con discapacidad se aproxima además el gasto deducible adicional de 3.500 EUR, o 7.750 EUR desde el 65 % o con movilidad reducida que dé derecho a él, limitado al rendimiento neto del trabajo restante.

La retención mostrada es una aproximación, no el impuesto anual definitivo ni la aplicación íntegra del algoritmo de retenciones de la AEAT. No se calculan tributación conjunta, ascendientes, el efecto fiscal de otras rentas, deducciones, situaciones de varios pagadores ni todas las circunstancias declaradas mediante el modelo 145. El IRPF final también depende de la normativa autonómica. Para el porcentaje de nómina debe contrastarse con el [simulador de retenciones de la AEAT](https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml).

## Hipoteca

Se aplica el sistema de amortización francés, con interés nominal anual constante, pagos mensuales y sin gastos:

`cuota = capital × interés_mensual / (1 - (1 + interés_mensual)^(-número_de_pagos))`

Para un interés del 0 %, la cuota es el capital dividido entre el número de pagos. La entrada se resta del precio para obtener el capital financiado. No se convierten TAE a TIN ni se incluyen comisiones, seguros, impuestos, tasación o gastos de compraventa; en una oferta real también pueden cambiar el tipo y la cuota.

## Pensión contributiva de jubilación

La proyección suma los años ya cotizados a una cotización continua hasta la edad indicada. Se cuentan meses completos para el porcentaje: 15 años dan derecho al 50 %; en la escala aplicable en 2026, los primeros 49 meses adicionales suman 0,21 puntos por mes y los siguientes, hasta el máximo, 0,19 puntos por mes.

Desde 2026 la base reguladora tiene un cálculo transitorio alternativo: la normativa compara el método anterior (300 bases mensuales de 25 años divididas entre 350) con la selección legal de las bases de mayor importe dentro del período aplicable. El calendario transitorio fija para cada año el número de bases y el divisor; alcanza 324 bases seleccionadas de un período de 348 meses, divididas entre 378, desde 2037. Este formulario solo recoge una base media mensual: aplica los factores anuales como escenario simplificado y no reconstruye ni inventa bases históricas mes a mes, por lo que no puede seleccionar las bases más favorables ni reproducir la base reguladora oficial. El resultado puede diferir del cálculo de la Seguridad Social, que utiliza las bases históricas reales y considera las reglas aplicables, incluidas las lagunas. La cuantía contributiva se limita al máximo inicial de 2026: 47.034,40 EUR anuales (3.359,60 EUR por paga en 14 pagas).

La edad ordinaria en 2026 es 65 años con al menos 38 años y 3 meses cotizados; si no, 66 años y 10 meses. Desde 2027, la referencia legal es 65 años con al menos 38 años y 6 meses, o 67 años en caso contrario. La calculadora compara la edad prevista con esta edad ordinaria y no modela jubilación anticipada. El requisito de 15 años incluye 2 dentro de los 15 años anteriores; la proyección presupone que la cotización continua indicada permite cumplirlo.

El complemento para la reducción de la brecha de género se incorpora como escenario al indicar uno o más hijos (de cero a cuatro). La cuantía oficial de 2026 es 36,90 EUR al mes por hijo, hasta cuatro, en 14 pagas; no se comprueba el derecho ni qué progenitor lo percibiría, por lo que no implica que se cumplan los requisitos legales. Legalmente no cuenta para el límite máximo de pensión ni como ingreso para conceder el complemento a mínimos: si procede, se añade a la pensión mínima. La cifra futura no proyecta revalorizaciones.

El complemento a mínimos es otro concepto distinto. La interfaz recoge situación familiar, si el cónyuge tiene ingresos y otros ingresos propios, pero estar casado/a o declarar que el cónyuge no tiene ingresos no confirma por sí solo la dependencia económica legal. Para el año de referencia 2026, las cuantías anuales son 17.592,40 EUR con cónyuge a cargo, 13.106,80 EUR sin cónyuge y 12.441,80 EUR con cónyuge no a cargo; los límites de ingresos de referencia son 11.013 EUR con cónyuge a cargo y 9.442 EUR en los otros casos. Solo se estima una cuantía cuando el año proyectado es 2026. Para jubilaciones futuras no se reutilizan ni proyectan los importes de 2026: se informa que el complemento podría corresponder, sujeto a los requisitos, ingresos y cuantías vigentes en el año de jubilación. La estimación no verifica la convivencia/dependencia económica, el cómputo legal de rentas ni el resto de requisitos personales.

Fuentes oficiales:

- [Seguridad Social: cálculo de la base reguladora y transición desde 2026](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/PrestacionesPensionesTrabajadores/10963/28393/28396/28475)
- [Ley General de la Seguridad Social: texto consolidado](https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724)
- [Ley del IRPF: texto consolidado](https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764)
- [Ley del IRPF, artículo 20: reducción por rendimientos del trabajo](https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a20)
- [Seguridad Social: cotizaciones y bases de 2026](https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537)
- [Real Decreto-ley 3/2026: revalorización, máximos y mínimos de pensiones (BOE)](https://www.boe.es/buscar/act.php?id=BOE-A-2026-2548)

Las reglas y cuantías deberán revisarse y versionarse con las publicaciones oficiales de cada ejercicio antes de emplearse para decisiones fiscales o de jubilación.
