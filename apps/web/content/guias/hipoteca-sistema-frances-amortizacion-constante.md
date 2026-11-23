---
slug: hipoteca-sistema-frances-amortizacion-constante
title: "Hipoteca: sistema francés o amortización constante, cuánto cambia la cuota y el coste"
summary: "Compara cuota inicial, pago medio, intereses y capital pendiente en dos sistemas con el mismo préstamo."
author: "Mario Galindo"
publishedAt: "2026-11-23"
updatedAt: "2026-11-23"
order: 0
relatedCalculators:
  - label: "Calculadora de hipoteca"
    url: "/calculadora-hipoteca/"
faqs:
  - question: "¿Qué sistema empieza con una cuota más baja?"
    answer: "En el ejemplo, el sistema francés empieza en 1.001,25 € al mes y el español de capital constante en 1.250,00 €. La diferencia depende del capital, el TIN y el plazo."
  - question: "¿Con qué sistema se pagan menos intereses en el ejemplo?"
    answer: "Con el sistema español de capital constante: 87.791,67 €, frente a 100.374,14 € con el francés, para el mismo capital, TIN y plazo."
  - question: "¿El sistema francés mantiene la misma cuota en una hipoteca variable?"
    answer: "Solo mientras se mantenga el tipo usado en el cálculo. Si cambia el interés, también puede cambiar la cuota."
  - question: "¿El coste total incluye comisiones y seguros?"
    answer: "No. En esta simulación es el capital más los intereses estimados. El motor no incorpora comisiones, seguros, impuestos ni gastos de compraventa."
sources:
  - label: "Banco de España: cuota hipotecaria"
    url: "https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Cuota_hipotecaria.html"
  - label: "Banco de España: simulador de préstamo hipotecario o personal"
    url: "https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/simulador_prestamo_hipotecario_personal.html"
---

Para una hipoteca de **200.000 € a 25 años y un TIN del 3,5 %**, la primera cuota es **1.001,25 €** con el sistema francés y **1.250,00 €** con el español de capital constante: este último empieza **248,75 € por encima**. La cuota española pasa a ser menor en el **mes 129** —**1.001,11 €**, frente a **1.001,25 €**— y el motor estima **12.582,48 € menos de intereses** al final.

El ejemplo compara cómo se distribuyen los pagos y cuánto interés suma cada calendario: **100.374,14 €** con el francés y **87.791,67 €** con el español de capital constante. Son resultados de un escenario matemático, no describen todas las ofertas hipotecarias ni recomiendan un sistema.

> **Estimación orientativa:** es un resultado teórico, no una oferta hipotecaria ni asesoramiento financiero.

## Mismo capital, mismo interés y mismo plazo

Para reproducir el caso en la [calculadora de hipoteca](/calculadora-hipoteca/), introduce un precio de vivienda de **200.000 €**, una aportación inicial de **0 €**, TIN anual de **3,5 %** y plazo de **25 años**. Ejecuta el cálculo una vez con «Francés» y otra con «Español». El capital financiado es 200.000 € y hay **300 cuotas mensuales** en ambos escenarios. El motor supone un tipo fijo y constante, sin comisiones, seguros ni amortizaciones anticipadas; una hipoteca variable cambia las cuotas cuando cambia el tipo.

La tabla usa las salidas del motor para primera y última cuota, intereses y total pagado. La cuota media se obtiene del total pagado dividido entre las 300 cuotas; no se redondean los pagos en los cálculos internos, solo en su presentación.

| Sistema de amortización | Primera cuota | Última cuota | Cuota media | Intereses totales | Coste total (capital + intereses) |
| --- | ---: | ---: | ---: | ---: | ---: |
| Francés: cuota constante | 1.001,25 € | 1.001,25 € | 1.001,25 € | 100.374,14 € | 300.374,14 € |
| Español: capital constante | 1.250,00 € | 668,61 € | 959,31 € | 87.791,67 € | 287.791,67 € |

En esta guía y en el selector de CuentaClara, «Francés» significa **cuota constante** y «Español» significa **amortización de capital constante**. El Banco de España también emplea «amortización constante» al explicar la cuota del sistema francés; aquí se distingue entre mantener constante la cuota y mantener constante el capital amortizado.

## Qué cambia dentro de cada cuota

En el **sistema francés**, cada pago contiene intereses sobre el capital pendiente y devolución de capital. En el primer mes de este ejemplo, los intereses son **583,33 €** en ambos sistemas. Como la cuota francesa es menor, ese mes amortiza **417,91 €** de capital, frente a los **666,67 €** del sistema español. Después, al reducirse el saldo, baja la parte destinada a intereses y aumenta la parte de capital dentro de la cuota fija. El Banco de España describe este comportamiento en su explicación de la [cuota hipotecaria](https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Cuota_hipotecaria.html).

En el **sistema español de capital constante**, se devuelven **666,67 € de capital** en cada mensualidad. Los intereses se calculan sobre un saldo que va disminuyendo, así que también baja el importe total de la cuota. Por eso la primera cuota del caso es la mayor y la última es menor. La media, **959,31 €**, queda por debajo de la cuota fija francesa, pero no describe lo que se paga en el primer mes.

Comparar solo la cuota inicial oculta el resto del recorrido. La primera cuota española es más alta, pero la deuda cae más deprisa. Con el francés, la cuota de entrada es más baja y previsible bajo el supuesto de interés fijo, aunque se acumulan más intereses durante todo el plazo. Las diferencias no se deben a que una opción financie menos capital: ambos escenarios comienzan en 200.000 € y duran 300 meses.

## Capital pendiente a los 5, 10 y 15 años

El calendario del motor permite consultar el saldo después de cada mensualidad. La tabla muestra el capital que quedaría justo tras la cuota del mes 60, 120 y 180, respectivamente:

| Momento | Francés: capital pendiente | Español: capital pendiente |
| --- | ---: | ---: |
| Tras 5 años (cuota 60) | 172.640,81 € | 160.000,00 € |
| Tras 10 años (cuota 120) | 140.057,57 € | 120.000,00 € |
| Tras 15 años (cuota 180) | 101.252,80 € | 80.000,00 € |

En los tres cortes, se ha devuelto más capital con amortización constante. Eso explica por qué su saldo pendiente cae más deprisa y por qué el interés acumulado termina siendo menor: cada mes los intereses se aplican sobre una deuda más reducida. En el sistema francés también disminuye el saldo, pero más despacio en los primeros años.

Los importes de capital pendiente son saldos teóricos del calendario, no la cifra de cancelación que necesariamente comunicaría una entidad. Una operación real puede tener una fecha de pago distinta, redondeos, comisiones u otras condiciones que la herramienta no incorpora.

## En qué mes se cruzan las cuotas

La primera mensualidad del sistema español supera a la francesa en **248,75 €**. La diferencia se estrecha con el paso del tiempo, pero no se invierte enseguida: en el mes **128**, la cuota española todavía es **1.003,06 €**, por encima de los **1.001,25 €** del francés.

En el mes **129**, el pago español baja a **1.001,11 €** y queda por debajo de la cuota francesa. Al final del plazo, el motor suma **87.791,67 €** de intereses con capital constante y **100.374,14 €** con el sistema francés: la diferencia de **12.582,48 €** se obtiene de los importes internos antes del redondeo de cada total. La tabla principal muestra esos totales redondeados por separado.

## Qué muestran los perfiles de pago

En este escenario, la cuota francesa permanece en **1.001,25 €** al mes. La española comienza en **1.250,00 €** y disminuye; desde el mes 129 queda por debajo de la francesa. El capital pendiente también evoluciona de forma distinta: tras cinco años, quedan **12.640,81 € menos** en el calendario español. Son diferencias de importe y calendario, no una conclusión sobre qué estructura conviene a cada persona.

Para leer una oferta completa, comprueba cómo se expresa el tipo y qué gastos incluye. La [guía de TIN, comisiones y TAE](/guias/tin-tae-comisiones-prestamo-personal/) explica por qué no basta con mirar un tipo aislado; sus ejemplos son de préstamos personales, pero la distinción entre tipo y costes ayuda a leer las condiciones de financiación. El simulador del Banco de España enlazado abajo calcula con el sistema francés, mientras que la calculadora de CuentaClara permite comparar también el sistema de capital constante.

## Qué queda fuera de esta tabla

La tabla de coste total suma el capital y los intereses del modelo, no todos los importes de una oferta. No calcula la TAE ni compara comisiones, tasación, impuestos, gastos de compraventa o condiciones de bonificación. La [guía de TIN, comisiones y TAE](/guias/tin-tae-comisiones-prestamo-personal/) y el simulador oficial enlazado en las fuentes ayudan a revisar otros componentes; las condiciones concretas deben contrastarse en la documentación de cada préstamo.

Para comparar escenarios, mantén iguales el capital y el plazo y modifica un solo supuesto cada vez. Si el tipo puede revisarse, la cuota real no seguirá necesariamente la trayectoria fija que muestra esta simulación.

### Sobre el autor

> **Sobre el autor:** CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a cuentaclaracalc@gmail.com.

**Datos revisados: 23 de noviembre de 2026.**
