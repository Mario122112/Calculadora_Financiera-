---
slug: que-incluye-un-finiquito-y-que-no
title: "Qué incluye un finiquito y qué no"
summary: "Sigue un caso paso a paso para separar salario pendiente, vacaciones, pagas extra e indemnización."
author: "Mario Galindo"
publishedAt: "2026-11-23"
updatedAt: "2026-11-23"
order: 2
relatedCalculators:
  - label: "Calculadora de finiquito e indemnización"
    url: "/calculadora-finiquito-indemnizacion/"
faqs:
  - question: "¿Finiquito e indemnización son lo mismo?"
    answer: "No. El finiquito reúne las cantidades devengadas que quedan por liquidar. La indemnización es un concepto distinto, ligado a determinadas causas de extinción; en el caso de baja voluntaria de esta guía, el motor devuelve 0 €."
  - question: "¿La calculadora determina cuántos días de vacaciones tengo pendientes?"
    answer: "No. Hay que introducir el número de días. El motor calcula su importe con el salario diario que obtiene del salario bruto anual."
  - question: "¿El motor calcula la parte proporcional de las pagas extra?"
    answer: "No. En el caso ilustrativo de 12 pagas con extras prorrateadas, se introduce 0 € como extra pendiente; el motor no comprueba el acuerdo ni calcula el prorrateo."
  - question: "¿El resultado es el importe neto que recibiré?"
    answer: "No. El motor solo suma los conceptos que introduces; no lee tu nómina ni el documento de liquidación."
sources:
  - label: "Estatuto de los Trabajadores, artículo 31: gratificaciones extraordinarias (BOE)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a31"
  - label: "Estatuto de los Trabajadores, artículo 38: vacaciones anuales (BOE)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a38"
  - label: "Estatuto de los Trabajadores, artículo 49: extinción del contrato (BOE)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a49"
  - label: "Estatuto de los Trabajadores, artículo 53: despido objetivo (BOE)"
    url: "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a53"
  - label: "SEPE: vacaciones no disfrutadas y liquidación o finiquito"
    url: "https://www.sepe.es/HomeSepe/preguntas-frecuentes/detalle-pregunta?detail=/preguntas/prestaciones-por-desempleo/pago-y-cuant-a/cobro-el-paro-desde-el-dia-siguiente-al-que-dejo-de-trabajar-o-tengo-que-esperar-al-fin-del-periodo-de-vacaciones-no-disfrutadas-o-a-estar-de-alta-medica-si-me-encuentro-de-baja-medica"
  - label: "Seguridad Social: vacaciones no disfrutadas y abonadas al extinguirse el contrato"
    url: "https://www.seg-social.es/wps/portal/wss/internet/PortalEducativo/Profesores/Unidad6/pess602/edu_001163?changeLanguage=es"
  - label: "Agencia Tributaria: retenciones del IRPF"
    url: "https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml"
---

En el caso de ejemplo, la calculadora estima **3.123,29 € de finiquito**: 2.465,75 € de salario pendiente y 657,53 € por 8 días de vacaciones. Suponemos 12 pagas con las extras prorrateadas, así que no queda una paga extra separada pendiente. Como es una baja voluntaria, la indemnización estimada es **0 €**.

La clave es no mezclar conceptos: el finiquito liquida importes ya devengados y no cobrados; la indemnización, si corresponde según la causa, va aparte. El motor muestra ambas cantidades separadas, pero no decide qué días de vacaciones se han generado ni calcula por sí solo la parte proporcional de las pagas extra.

> **Estimación orientativa:** el resultado depende de los días y cantidades que introduzcas; no sustituye la revisión de la liquidación real.

## El caso: qué datos se introducen

Imaginemos a una persona con salario bruto anual de **30.000 €** que comunica una baja voluntaria con fecha de fin **30 de septiembre de 2026**. Para poder reproducir el ejemplo, suponemos **12 pagas con las extras prorrateadas**, **30 días de salario pendientes** y **8 días de vacaciones no disfrutadas**. La fecha de inicio del contrato es **1 de mayo de 2022**.

En la [calculadora de finiquito e indemnización](/calculadora-finiquito-indemnizacion/), introduce estos valores:

| Campo del motor | Entrada del caso |
| --- | ---: |
| Salario bruto anual | 30.000 € |
| Pagas del supuesto | 12, con extras prorrateadas |
| Días de salario pendientes | 30 |
| Días de vacaciones no disfrutadas | 8 |
| Pagas extra pendientes | 0 € |
| Fecha de inicio | 01/05/2022 |
| Fecha de fin | 30/09/2026 |
| Causa de extinción | Baja voluntaria |

Los 30 días son el salario de septiembre que suponemos aún no abonado; los 8 días se justifican en el paso de vacaciones. La persona cobra 12 veces al año porque en este supuesto las extras ya se prorratean; por eso el campo de pagas extra pendientes es 0 €.

El motor calcula el salario diario dividiendo el salario bruto anual entre **365**; la guía de uso de la calculadora indica que ese salario anual incluye las pagas extra, por lo que su importe medio ya queda repartido a lo largo del año. El campo de extra pendiente se añade aparte. Con 14 pagos sin prorratear puede haber solapamiento: no introduzcas en ambos campos la misma cantidad. La herramienta no ofrece un ajuste para separar los componentes; si no puedes comprobar que el importe pendiente está separado de la base anual usada, no tomes el total como una liquidación fiable.

## Paso 1: localizar el salario que falta por cobrar

El motor obtiene un salario diario de **82,19 €** a partir del salario bruto anual indicado. Con 30 días pendientes, calcula **2.465,75 €** de salario pendiente. En esta simulación, los días se introducen directamente: no se determina automáticamente qué días del último mes están pagados ni se consulta el calendario de nómina.

Comprueba hasta qué fecha se ha abonado el salario ordinario. El ejemplo supone que la nómina de agosto está pagada y que los 30 días de septiembre siguen pendientes. Si la empresa ya ha abonado parte del mes, ajusta los días para no contar dos veces el mismo periodo.

## Paso 2: añadir las vacaciones pendientes

Para explicar de dónde salen los **8 días**, supongamos que el contrato reconoce **30 días naturales** de vacaciones por año completo y que el periodo de cómputo de este ejemplo coincide con el año natural. Desde el 1 de enero hasta el 30 de septiembre han transcurrido nueve meses: **30 × 9 ÷ 12 = 22,5 días generados**. Si la persona ya ha disfrutado **14,5 días**, el saldo es **22,5 − 14,5 = 8 días pendientes**. Esta regla de tres es el supuesto ilustrativo de la guía, no una fórmula universal; el artículo 38 establece que la duración se pacta en convenio o contrato y que no puede ser inferior a treinta días naturales al año, pero no fija esta operación mensual para todos los casos.

Al introducir los 8 días, el motor estima **657,53 €** con el mismo salario diario. La herramienta no calcula el saldo vacacional. El artículo 38 del Estatuto regula las vacaciones anuales retribuidas; el SEPE explica que, si quedan días sin disfrutar al terminar el contrato, se abonan en la liquidación o finiquito. Contrasta los días disfrutados y pendientes con el registro de vacaciones y con el contrato o convenio aplicable.

Para entender cuánto pueden cambiar las vacaciones y las pagas en una nómina a lo largo del año, consulta también [12 o 14 pagas: qué cambia de verdad en tu sueldo](/guias/12-o-14-pagas-que-cambia-en-tu-sueldo/). La guía explica el reparto del salario, no determina el saldo vacacional de este ejemplo.

## Paso 3: comprobar cómo se cobran las pagas extra

Este caso elige **12 pagas con las extras prorrateadas**: los 30.000 € anuales ya se reparten entre los pagos del año y el campo de extra pendiente se deja en **0 €**. El motor divide el salario anual entre 365 para obtener el salario diario e incorpora las pagas en esa base; no calcula el calendario ni verifica si el prorrateo se acordó.

El artículo 31 reconoce dos gratificaciones extraordinarias y contempla que su prorrateo en doce mensualidades pueda acordarse en convenio colectivo. El número de pagos, por sí solo, no permite saber qué se acordó en un contrato concreto. Comprueba la nómina, el contrato y el convenio. La guía de [salario bruto y salario neto](/guias/salario-bruto-neto/) explica cómo interpretar el bruto anual y las pagas.

## Paso 4: leer el resultado sin sumar conceptos dos veces

Con las entradas del caso, el resultado del motor queda así:

| Concepto | Resultado del motor |
| --- | ---: |
| Salario diario usado por el motor | 82,19 € |
| Salario pendiente (30 días) | 2.465,75 € |
| Vacaciones no disfrutadas (8 días) | 657,53 € |
| Pagas extra pendientes | 0,00 € |
| **Finiquito estimado** | **3.123,29 €** |
| Indemnización por baja voluntaria | 0,00 € |
| **Total estimado** | **3.123,29 €** |

El desglose se reproduce con salario anual de 30.000 €, 12 pagas con extras prorrateadas, 30 días de salario pendientes, 8 días de vacaciones, 0 € de extras pendientes, inicio el 1 de mayo de 2022, fin el 30 de septiembre de 2026 y causa «Baja voluntaria».

El finiquito es el subtotal que reúne las partidas pendientes; no vuelvas a sumarlo a cada línea. En este escenario, el motor devuelve 0 € de indemnización por baja voluntaria.

## Comparar la misma liquidación con un despido objetivo

Sin cambiar salario, fechas ni cantidades pendientes, ejecuta el motor otra vez y selecciona «Despido objetivo». El resultado conserva el mismo finiquito y calcula aparte una indemnización distinta de cero:

| Causa elegida en el motor | Finiquito | Indemnización | Total |
| --- | ---: | ---: | ---: |
| Baja voluntaria | 3.123,29 € | 0,00 € | 3.123,29 € |
| Despido objetivo | 3.123,29 € | 7.260,27 € | 10.383,56 € |

La indemnización de la segunda fila corresponde al cálculo del motor para un despido objetivo: **20 días de salario por año de servicio**, según el artículo 53 del Estatuto de los Trabajadores. Otros tipos de despido se calculan de otra forma; aquí no se ofrecen cifras para ellos. La tabla reproduce una simulación y no determina si un caso real cumple los requisitos para calificarse como despido objetivo.

**Alcance de los importes:** todas las cantidades de los dos escenarios son brutas. A los conceptos salariales del finiquito se les aplican las cotizaciones y retenciones de IRPF que correspondan; esta guía y el motor no calculan esos descuentos ni el líquido final.

## Lo que el cálculo no resuelve

La herramienta no lee nóminas ni contratos, no determina si el motivo declarado coincide con la calificación legal de la extinción y no interpreta convenios o salarios variables.

El artículo 49.2 del Estatuto de los Trabajadores prevé que, al comunicar la extinción, se acompañe una propuesta del documento de liquidación de las cantidades adeudadas. Compara ese documento con los conceptos y periodos que ya tienes registrados. Si existe una diferencia, pide el detalle del cálculo antes de dar por buena una cifra que no puedas reconstruir.

## Comprobaciones antes de firmar

- Confirma la fecha de baja y hasta qué día está abonado el salario ordinario.
- Contrasta los días de vacaciones pendientes con el saldo que te comunica la empresa.
- Revisa si las pagas extra se pagan aparte o se prorratean y cómo se obtiene el importe pendiente.
- Comprueba que cada concepto del documento de liquidación aparece una sola vez.
- Separa el finiquito de cualquier indemnización y verifica que la causa de extinción introducida sea la correcta.
- Guarda las nóminas y justificantes que respaldan cada cantidad introducida.

> **Sobre el autor:** CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a cuentaclaracalc@gmail.com.

**Datos revisados: 23 de noviembre de 2026.**
