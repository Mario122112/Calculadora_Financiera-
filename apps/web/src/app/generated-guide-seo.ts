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
        "answer": "No en este caso: CuentaClara estima una cuota anual simplificada para obtener un neto orientativo. No reproduce el procedimiento de retenciones de la AEAT ni conoce todos los datos de tu nómina y situación fiscal."
      }
    ]
  }
];
