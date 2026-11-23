---
slug: tin-tae-comisiones-prestamo-personal
title: "TIN, comisiones y TAE: cómo comparar un préstamo personal"
summary: "Compara seis escenarios de un préstamo de 10.000 € a 48 meses y distingue cuota, intereses, comisión de apertura y coste total."
author: "Mario Galindo"
publishedAt: "2026-11-23"
updatedAt: "2026-11-23"
relatedCalculators:
  - label: "Calculadora de préstamo personal"
    url: "/calculadora-prestamo-personal/"
faqs:
  - question: "¿La calculadora de CuentaClara calcula la TAE?"
    answer: "No. Muestra cuotas, intereses y los costes que introduces, pero no calcula la TAE."
  - question: "¿La comisión de apertura cambia la cuota mensual?"
    answer: "En el modelo de CuentaClara, no. La comisión se calcula como porcentaje del capital solicitado y se añade aparte a los costes; no se financia ni se incorpora a la cuota."
  - question: "¿Por qué la primera y la última cuota no coinciden exactamente?"
    answer: "Las cuotas y los saldos se redondean a céntimos en cada periodo. En el último pago, el motor ajusta la amortización para cancelar el saldo que quede."
  - question: "¿Basta con comparar el TIN de dos ofertas?"
    answer: "No. Comprueba también el importe recibido, el plazo, las comisiones, los gastos vinculados y las condiciones completas de cada oferta."
sources:
  - label: "Banco de España: cuidado con el coste de la financiación (TIN y TAE)"
    url: "https://clientebancario.bde.es/pcb/es/blog/Cuidado_con_el_6edceea38293961.html"
  - label: "Banco de España: simulador de la TAE de un préstamo personal"
    url: "https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html"
  - label: "Banco de España: comparadores y simuladores financieros"
    url: "https://clientebancario.bde.es/pcb/es/menu-horizontal/actualidadeducac/educacion-financiera/comparadores-y-simuladores/"
---

Para un préstamo de **10.000 € a 48 meses**, pasar del 6 % al 8 % TIN eleva el coste de financiación de **1.272,82 € a 1.718,19 €**: **445,37 € más**. Llegar al 10 % lo eleva a **2.174,00 €**, **901,18 € más** que al 6 %. La comisión de apertura del 2 % suma **200 €**; en estos escenarios pesa menos que subir el TIN.

La comparación entre filas también importa: al 6 % con comisión, el coste es **1.472,82 €**; al 8 % sin comisión, **1.718,19 €**, es decir, **245,37 € más**. Para este ejemplo, reducir el TIN compensa más que eliminar la comisión por sí sola.

> **Estimación orientativa:** las cifras describen un modelo matemático con los parámetros indicados; una oferta real puede incluir condiciones y costes que esta calculadora no modela.

## Seis escenarios para el mismo préstamo

Los seis casos varían el TIN y la comisión de apertura, manteniendo iguales los demás parámetros:

| TIN anual | Comisión de apertura | Cuota mensual (primera / última) | Coste total de financiación |
| ---: | ---: | ---: | ---: |
| 6 % | 0 % (0 €) | 234,85 € / 234,87 € | 1.272,82 € |
| 6 % | 2 % (200 €) | 234,85 € / 234,87 € | 1.472,82 € |
| 8 % | 0 % (0 €) | 244,13 € / 244,08 € | 1.718,19 € |
| 8 % | 2 % (200 €) | 244,13 € / 244,08 € | 1.918,19 € |
| 10 % | 0 % (0 €) | 253,63 € / 253,39 € | 2.174,00 € |
| 10 % | 2 % (200 €) | 253,63 € / 253,39 € | 2.374,00 € |

**Parámetros reproducibles:** importe de **10.000 €**, plazo de **48 meses**, sistema **francés**, **0 €** de gastos iniciales y **0 €** de coste adicional mensual. El coste total de financiación suma intereses y comisión de apertura. Las cuotas se muestran como primera / última para reflejar el redondeo del motor.

Las diferencias de céntimos entre primera y última cuota se deben al redondeo de cada periodo; el motor ajusta la amortización final para cancelar el saldo. Todos los importes de la tabla son salidas de `calculatePersonalLoan`.

## Qué cambia más: el tipo o la comisión

Compara primero las filas sin comisión. Al pasar del 6 % al 8 %, el coste total de financiación sube de 1.272,82 € a 1.718,19 €, una diferencia de 445,37 €. Como ambas filas tienen comisión cero y los demás costes también son cero, esa diferencia corresponde al interés adicional del escenario con el TIN más alto. Al 10 %, el coste llega a 2.174,00 €: son 901,18 € más que al 6 %.

La comisión produce un efecto menor en este ejemplo. En cada pareja con el mismo TIN, pasar del 0 % al 2 % añade 200 € al coste de financiación: al 6 %, de 1.272,82 € a 1.472,82 €; al 8 %, de 1.718,19 € a 1.918,19 €; y al 10 %, de 2.174,00 € a 2.374,00 €. La cuota no cambia porque la comisión se paga aparte y no se suma al capital.

La comparación cruzada confirma el orden: el caso del 8 % sin comisión (1.718,19 €) cuesta 245,37 € más que el del 6 % con comisión (1.472,82 €). Por tanto, con estos importes y plazos, reducir el TIN tiene más efecto que quitar la comisión del 2 %. La diferencia entre ofertas reales puede ser otra si cambian el plazo o los gastos.

## La TAE para comparar ofertas

La **TAE** expresa en porcentaje anual el coste de una operación e incorpora el interés y los gastos o comisiones que correspondan. Por eso es la cifra adecuada para comparar ofertas con condiciones distintas: reúne más elementos del coste que el TIN por sí solo. Esta tabla, en cambio, compara el TIN y la comisión de apertura por separado para mostrar el efecto de cada uno bajo los mismos parámetros.

El motor de CuentaClara **no calcula la TAE**: su coste total de financiación es una cantidad en euros, no un porcentaje anual. Para estimarla a partir del importe, el plazo, el tipo y los costes aplicables, utiliza el [simulador de TAE del Banco de España](https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html). El simulador publica sus hipótesis; la TAE final de una entidad puede variar según las condiciones concretas de su oferta.

## Reproduce la tabla en la calculadora

Abre la [calculadora de préstamo personal](/calculadora-prestamo-personal/) e introduce estos valores:

1. **Importe solicitado:** 10.000 €.
2. **TIN anual:** primero 6 %, después 8 % y finalmente 10 %.
3. **Plazo:** cuatro años y cero meses adicionales (48 cuotas).
4. **Sistema:** francés, el valor predeterminado de la herramienta.
5. **Comisión de apertura:** 0 % para una pasada y 2 % para la otra.
6. **Gastos iniciales y coste adicional mensual:** 0 € en ambos campos.

Anota para cada cálculo la primera y la última cuota y el coste total de financiación. Al comparar dos ofertas, introduce también los gastos que se vayan a cobrar; no los incluyas en la comisión si ya aparecen en otro campo. Comprueba que el capital recibido y el plazo coinciden con la documentación de la entidad.

Para reconstruir una fila, selecciona el TIN indicado y ejecuta el cálculo una vez con comisión cero y otra con comisión del 2 %. Repite ambas pruebas para cada tipo, sin cambiar el importe, el plazo, el sistema ni los demás costes. En el resultado, usa «Coste total de financiación» para comparar lo que cuesta el crédito; no lo confundas con el total devuelto en cuotas, que también incluye el principal prestado. Las cifras de esta tabla corresponden a seis ejecuciones separadas del mismo motor.

## Qué mirar antes de firmar

- **Importe recibido:** confirma si la entidad entrega el capital solicitado completo o descuenta algún coste al inicio. En el ejemplo, el motor presupone que se reciben los 10.000 € íntegros.
- **TIN, TAE y plazo:** anota las condiciones de la oferta y verifica que comparas el mismo importe, periodicidad y duración. No elijas solo por la cuota más baja.
- **Comisión de apertura:** revisa el porcentaje o importe en euros, cuándo se paga y si la documentación indica que se financia. La calculadora de esta página la suma aparte; no supone que se añada al capital.
- **Otros gastos:** pregunta qué gastos iniciales, productos asociados o costes periódicos son obligatorios para obtener esas condiciones. Incluye los aplicables al comparar el coste, evitando contarlos dos veces.
- **Sistema, calendario y amortización anticipada:** confirma cómo se amortiza la deuda, cuándo se pagan las cuotas y qué condiciones aplican si devuelves parte o todo antes de tiempo. Estos escenarios no incluyen ese posible coste.
- **Presupuesto mensual real:** compara la cuota con el dinero disponible después de gastos habituales, no solo con el salario bruto. Para estimar el neto, consulta las guías de [salario bruto y salario neto](/guias/salario-bruto-neto/) y [retención de IRPF y declaración de la renta](/guias/retencion-irpf-nomina-renta/).

> **Sobre el autor:** CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a cuentaclaracalc@gmail.com.

**Datos revisados: 23 de noviembre de 2026.**
