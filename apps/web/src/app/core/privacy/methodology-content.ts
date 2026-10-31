export interface MethodologyLink {
  label: string;
  url: string;
}

export interface MethodologySection {
  heading: string;
  paragraphs: string[];
  links?: MethodologyLink[];
}

export interface MethodologyPage {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: MethodologySection[];
}

const BOE_ESTATUTO = 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430';
const BOE_LGSS = 'https://www.boe.es/buscar/act.php?id=BOE-A-2015-11724';
const BOE_IRPF = 'https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764';

export const methodologyPage: MethodologyPage = {
  eyebrow: 'TRANSPARENCIA',
  title: 'Cómo se calcula',
  introduction:
    'Aquí explicamos cómo funciona cada calculadora, qué datos de referencia usa y en qué normas se apoya. Todo se calcula en tu navegador. Los datos fiscales y de cotización son de referencia para 2026. Última revisión: octubre de 2026.',
  sections: [
    {
      heading: 'Criterios generales',
      paragraphs: [
        'Todas las calculadoras ofrecen estimaciones orientativas y simplificadas. No sustituyen al cálculo oficial de la Agencia Tributaria, la Seguridad Social, una entidad financiera o un profesional.',
        'Los importes se calculan sin redondear y se redondean solo al mostrarlos. Cada calculadora indica en su página qué no incluye. Si encuentras una cifra que no cuadra, escríbenos desde la página de contacto.'
      ]
    },
    {
      heading: 'Sueldo neto',
      paragraphs: [
        'Seguridad Social: la cotización del trabajador se calcula sobre el salario bruto anual con un máximo de 61.214 € de base (5.101,20 € al mes). Se aplican contingencias comunes (4,70 %), desempleo (1,55 % en contrato indefinido y 1,60 % en temporal), formación profesional (0,10 %) y mecanismo de equidad intergeneracional (0,15 %). Si el salario supera la base máxima, se añade una cuota de solidaridad por tramos (0,19 %, 0,21 % y 0,24 %) sobre el exceso.',
        'Base del IRPF: se parte del salario bruto y se restan la cotización a la Seguridad Social, 2.000 € de otros gastos deducibles, los gastos adicionales por discapacidad si procede y la reducción por rendimientos del trabajo. Esta reducción solo se aplica a salarios bajos y no se aplica si indicas otras rentas no exentas superiores a 6.500 € al año.',
        'Cuota del IRPF: sobre la base se aplica una escala general de seis tramos (19 % hasta 12.450 €, 24 % hasta 20.200 €, 30 % hasta 35.200 €, 37 % hasta 60.000 €, 45 % hasta 300.000 € y 47 % por encima) y se resta la cuota que corresponde al mínimo personal y familiar. Ese mínimo parte de 5.550 € y aumenta por edad (a partir de 65 y de 75 años), por descendientes (con un incremento por menores de 3 años), por discapacidad y por movilidad reducida.',
        'Es una aproximación: el IRPF real depende de tu comunidad autónoma y de otras circunstancias personales, y las retenciones de tu nómina las calcula tu empresa. El neto por paga es el neto anual dividido entre el número de pagas.'
      ],
      links: [
        { label: 'Ley 35/2006 del IRPF (BOE)', url: BOE_IRPF },
        { label: 'Ley General de la Seguridad Social (BOE)', url: BOE_LGSS },
        { label: 'Agencia Tributaria', url: 'https://sede.agenciatributaria.gob.es' },
        { label: 'Seguridad Social', url: 'https://www.seg-social.es' }
      ]
    },
    {
      heading: 'Hipoteca',
      paragraphs: [
        'El capital financiado es el precio de la vivienda menos la entrada. El tipo mensual es el TIN anual dividido entre 100 y entre 12.',
        'Sistema francés: la cuota es constante y se calcula como capital × i / (1 − (1 + i)^−n), donde i es el tipo mensual y n el número de cuotas. Cada mes los intereses son el capital pendiente por el tipo mensual, y el resto de la cuota amortiza capital.',
        'Sistema español: cada mes se amortiza el mismo capital (capital dividido entre n) y se pagan los intereses sobre el saldo pendiente, por lo que la cuota va bajando.',
        'El gráfico y la tabla por años suman el capital y los intereses de las cuotas de cada año. El cálculo supone un tipo de interés constante: en una hipoteca variable la cuota cambiaría con el Euríbor. No incluye comisiones, seguros, impuestos, tasación ni gastos de compraventa.'
      ],
      links: [{ label: 'Banco de España', url: 'https://www.bde.es' }]
    },
    {
      heading: 'Préstamo personal',
      paragraphs: [
        'Usa las mismas fórmulas que la hipoteca, con sistema francés o español. Cada cuota se redondea al céntimo y la última se ajusta para cancelar exactamente el saldo.',
        'La comisión de apertura es un porcentaje sobre el importe solicitado y se paga aparte: no se suma al capital ni a la cuota. Los gastos iniciales y el coste mensual adicional, como un seguro, también se muestran por separado y suman al coste total.',
        'El comparador de tipos recalcula el préstamo con un TIN un punto por debajo y un punto por encima del que indicas. Son escenarios matemáticos, no ofertas. La calculadora trabaja con el TIN y no calcula la TAE.'
      ],
      links: [{ label: 'Banco de España', url: 'https://www.bde.es' }]
    },
    {
      heading: 'Pensión de jubilación',
      paragraphs: [
        'Los años cotizados previstos son los que indicas más los que faltan hasta la edad de jubilación, suponiendo que cotizas de forma continua. La edad ordinaria de jubilación es 65 años si acreditas al menos 38 años y 3 meses cotizados para una jubilación en 2026, o 38 años y 6 meses desde 2027; si no, es de 66 años y 10 meses en 2026 y de 67 años desde 2027. Se exigen al menos 15 años cotizados.',
        'Con 15 años cotizados se aplica el 50 % de la base reguladora. Después se suma un 0,21 % por cada mes adicional durante los primeros 49 meses y un 0,19 % por cada mes de los 209 siguientes, de modo que se llega al 100 % con 36 años y 6 meses.',
        'La base reguladora es una estimación: la calculadora multiplica la base media mensual que introduces por un factor basado en las reglas de cálculo previstas para el año de jubilación. No reconstruye tus bases de cotización mes a mes, que es lo que hace el cálculo oficial.',
        'Si retrasas la jubilación, se aplica un incremento del 4 % por cada año completo de demora sobre la edad ordinaria. La pensión anual está limitada a un máximo de 47.034,40 € brutos en 14 pagas.',
        'El complemento por brecha de género se simula como 36,90 € al mes por hijo, hasta cuatro hijos. El complemento a mínimos solo se estima con las cuantías y los límites de ingresos de 2026 y únicamente si la jubilación prevista es en 2026; para años futuros no se proyectan importes. Tampoco se comprueba que dos de los años cotizados estén dentro de los 15 anteriores a la jubilación.'
      ],
      links: [
        { label: 'Ley General de la Seguridad Social (BOE)', url: BOE_LGSS },
        { label: 'Seguridad Social', url: 'https://www.seg-social.es' }
      ]
    },
    {
      heading: 'Interés compuesto',
      paragraphs: [
        'La rentabilidad anual nominal se divide entre 12 para obtener el tipo mensual. Cada mes el saldo se multiplica por uno más ese tipo y después se suma la aportación, que se hace al final del mes.',
        'El total aportado es el capital inicial más la aportación mensual por el número de meses. Los intereses estimados son el capital final menos el total aportado.',
        'La rentabilidad es un supuesto constante. No se descuentan impuestos, inflación ni comisiones, y las inversiones reales pueden dar rentabilidades distintas o pérdidas.'
      ]
    },
    {
      heading: 'Finiquito e indemnización',
      paragraphs: [
        'El salario diario es el salario bruto anual dividido entre 365. El salario pendiente son los días trabajados sin cobrar por el salario diario, y las vacaciones no disfrutadas son los días pendientes por el salario diario. Las pagas extra devengadas pendientes se suman con el importe bruto que indicas. El finiquito es la suma de estos conceptos.',
        'La antigüedad se calcula en meses entre la fecha de inicio y la de fin del contrato, y una fracción final de mes cuenta como un mes completo.',
        'Despido objetivo: 20 días de salario por año de servicio, con un máximo de 12 mensualidades. Despido improcedente: 45 días por año para el tiempo trabajado antes del 12 de febrero de 2012 y 33 días por año desde esa fecha, con topes de 720 días o, en el régimen transitorio, de 1.260 días.',
        'Fallecimiento del trabajador: el contrato se extingue sin indemnización por despido y solo se liquidan las cantidades ya devengadas, que cobran los herederos. Algunos convenios o seguros pueden prever una cuantía aparte, que la calculadora no incluye.',
        'El cálculo supone un salario fijo, no interpreta convenios y no determina si un despido es procedente.'
      ],
      links: [{ label: 'Estatuto de los Trabajadores (BOE)', url: BOE_ESTATUTO }]
    },
    {
      heading: 'Actualización y contraste de los datos',
      paragraphs: [
        'Los datos de referencia corresponden a 2026 y se actualizarán cuando cambien las normas. Antes de tomar una decisión importante, contrasta el resultado con las fuentes oficiales o con un profesional.'
      ]
    }
  ]
};