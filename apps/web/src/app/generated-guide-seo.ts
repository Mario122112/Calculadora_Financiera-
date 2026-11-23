export interface GuideSeoData {
  slug: string;
  title: string;
  summary: string;
  author: string;
  updatedAt: string;
  publishedAtIso: string;
  updatedAtIso: string;
  faqs: { question: string; answer: string }[];
}

export const GUIDE_SEO_DATA: readonly GuideSeoData[] = [
  {
    "slug": "hipoteca-sistema-frances-amortizacion-constante",
    "title": "Hipoteca: sistema francés o amortización constante, cuánto cambia la cuota y el coste",
    "summary": "Compara cuota inicial, pago medio, intereses y capital pendiente en dos sistemas con el mismo préstamo.",
    "author": "Mario Galindo",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "faqs": [
      {
        "question": "¿Qué sistema empieza con una cuota más baja?",
        "answer": "En el ejemplo, el sistema francés empieza en 1.001,25 € al mes y el español de capital constante en 1.250,00 €. La diferencia depende del capital, el TIN y el plazo."
      },
      {
        "question": "¿Con qué sistema se pagan menos intereses en el ejemplo?",
        "answer": "Con el sistema español de capital constante: 87.791,67 €, frente a 100.374,14 € con el francés, para el mismo capital, TIN y plazo."
      },
      {
        "question": "¿El sistema francés mantiene la misma cuota en una hipoteca variable?",
        "answer": "Solo mientras se mantenga el tipo usado en el cálculo. Si cambia el interés, también puede cambiar la cuota."
      },
      {
        "question": "¿El coste total incluye comisiones y seguros?",
        "answer": "No. En esta simulación es el capital más los intereses estimados. El motor no incorpora comisiones, seguros, impuestos ni gastos de compraventa."
      }
    ]
  },
  {
    "slug": "12-o-14-pagas-que-cambia-en-tu-sueldo",
    "title": "12 o 14 pagas: qué cambia de verdad en tu sueldo",
    "summary": "Compara el neto anual, el promedio mensual y el importe medio por paga con el mismo salario bruto anual.",
    "author": "Mario Galindo",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "faqs": [
      {
        "question": "¿Las 12 pagas incluyen las extraordinarias?",
        "answer": "La tabla representa doce pagos iguales. El motor solo divide el neto anual entre el número de pagas; no comprueba si el convenio acuerda prorratear las extraordinarias."
      },
      {
        "question": "¿Por qué en junio y diciembre aparecen dos pagos en el escenario de 14 pagas?",
        "answer": "La distribución ilustrativa coloca una paga ordinaria y una extraordinaria en cada uno de esos meses. El motor no calcula fechas ni importes reales de nómina."
      },
      {
        "question": "¿Cobrar en 14 pagas aumenta el neto anual?",
        "answer": "No por sí solo. Con el mismo bruto anual y los mismos datos, el motor obtiene el mismo neto anual; cambia el importe y el calendario de cada pago."
      },
      {
        "question": "¿El neto por paga será exactamente el de mi nómina?",
        "answer": "No necesariamente. Es una estimación media del motor; no calcula la retención mensual real ni la distribución de tu nómina."
      }
    ]
  },
  {
    "slug": "que-incluye-un-finiquito-y-que-no",
    "title": "Qué incluye un finiquito y qué no",
    "summary": "Sigue un caso paso a paso para separar salario pendiente, vacaciones, pagas extra e indemnización.",
    "author": "Mario Galindo",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "faqs": [
      {
        "question": "¿Finiquito e indemnización son lo mismo?",
        "answer": "No. El finiquito reúne las cantidades devengadas que quedan por liquidar. La indemnización es un concepto distinto, ligado a determinadas causas de extinción; en el caso de baja voluntaria de esta guía, el motor devuelve 0 €."
      },
      {
        "question": "¿La calculadora determina cuántos días de vacaciones tengo pendientes?",
        "answer": "No. Hay que introducir el número de días. El motor calcula su importe con el salario diario que obtiene del salario bruto anual."
      },
      {
        "question": "¿El motor calcula la parte proporcional de las pagas extra?",
        "answer": "No. En el caso ilustrativo de 12 pagas con extras prorrateadas, se introduce 0 € como extra pendiente; el motor no comprueba el acuerdo ni calcula el prorrateo."
      },
      {
        "question": "¿El resultado es el importe neto que recibiré?",
        "answer": "No. El motor solo suma los conceptos que introduces; no lee tu nómina ni el documento de liquidación."
      }
    ]
  },
  {
    "slug": "tin-tae-comisiones-prestamo-personal",
    "title": "TIN, comisiones y TAE: cómo comparar un préstamo personal",
    "summary": "Compara seis escenarios de un préstamo de 10.000 € a 48 meses y distingue cuota, intereses, comisión de apertura y coste total.",
    "author": "Mario Galindo",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "faqs": [
      {
        "question": "¿La calculadora de CuentaClara calcula la TAE?",
        "answer": "No. Muestra cuotas, intereses y los costes que introduces, pero no calcula la TAE."
      },
      {
        "question": "¿La comisión de apertura cambia la cuota mensual?",
        "answer": "En el modelo de CuentaClara, no. La comisión se calcula como porcentaje del capital solicitado y se añade aparte a los costes; no se financia ni se incorpora a la cuota."
      },
      {
        "question": "¿Por qué la primera y la última cuota no coinciden exactamente?",
        "answer": "Las cuotas y los saldos se redondean a céntimos en cada periodo. En el último pago, el motor ajusta la amortización para cancelar el saldo que quede."
      },
      {
        "question": "¿Basta con comparar el TIN de dos ofertas?",
        "answer": "No. Comprueba también el importe recibido, el plazo, las comisiones, los gastos vinculados y las condiciones completas de cada oferta."
      }
    ]
  },
  {
    "slug": "salario-bruto-neto",
    "title": "Salario bruto y salario neto en España: qué cambia de una cifra a otra",
    "summary": "Aprende a leer una oferta de salario, distinguir las deducciones de una nómina y comparar pagas con un ejemplo reproducible.",
    "author": "Mario Galindo",
    "updatedAt": "20 de noviembre de 2026",
    "publishedAtIso": "2026-11-20",
    "updatedAtIso": "2026-11-20",
    "faqs": [
      {
        "question": "¿El salario bruto anual incluye las pagas extra?",
        "answer": "Sí. El salario bruto anual acordado reúne la retribución bruta de todo el año, incluidas las pagas extraordinarias. Que se cobre en doce o catorce pagos cambia el calendario y el importe de cada paga, no el total anual pactado."
      },
      {
        "question": "¿El salario neto de la calculadora será igual al de mi nómina?",
        "answer": "No necesariamente. La calculadora ofrece una estimación con información limitada y no reproduce todos los datos personales, fiscales, autonómicos ni el procedimiento oficial de retenciones. La nómina y el certificado anual de retenciones son las referencias de tu caso."
      },
      {
        "question": "¿La retención de IRPF es un impuesto distinto de la cotización?",
        "answer": "No. La cotización financia el sistema de Seguridad Social y la retención de IRPF es un pago a cuenta del impuesto sobre la renta. Son conceptos diferentes y aparecen separados en la nómina."
      }
    ]
  },
  {
    "slug": "retencion-irpf-nomina-renta",
    "title": "Retención de IRPF en la nómina: por qué no es la declaración de la renta",
    "summary": "Sigue el recorrido del dinero retenido durante el año y entiende cómo se compara con el impuesto anual al presentar la declaración.",
    "author": "Mario Galindo",
    "updatedAt": "20 de noviembre de 2026",
    "publishedAtIso": "2026-11-20",
    "updatedAtIso": "2026-11-20",
    "faqs": [
      {
        "question": "¿Que me devuelvan dinero significa que la empresa retuvo de más?",
        "answer": "No necesariamente. La declaración compara los pagos a cuenta con el resultado anual de todos los elementos que deban incluirse. Una devolución puede deberse a que los anticipos superaron la cuota final o a otros componentes de la declaración."
      },
      {
        "question": "¿Puede salir a pagar aunque haya tenido retenciones todos los meses?",
        "answer": "Sí. La retención es un anticipo, no una liquidación definitiva. Si el total ingresado a cuenta es inferior al resultado anual que corresponda, la declaración puede arrojar una diferencia a ingresar."
      },
      {
        "question": "¿Una calculadora de sueldo neto calcula mi retención mensual?",
        "answer": "No. CuentaClara estima una cuota anual simplificada para obtener un neto orientativo; no reproduce el procedimiento de retenciones de la AEAT ni todos los datos de tu nómina."
      },
      {
        "question": "¿Cuándo estoy obligado a presentar la declaración de la renta?",
        "answer": "Depende del ejercicio, del tipo y la cuantía de tus rentas y de circunstancias como tener varios pagadores o haber trabajado como autónomo. Consulta los límites oficiales de la campaña correspondiente y el apartado de esta guía."
      }
    ]
  }
];
