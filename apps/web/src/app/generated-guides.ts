export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  publishedAtIso: string;
  updatedAtIso: string;
  leadHtml: string;
  sections: { id: string; title: string; html: string }[];
  headings: { id: string; title: string }[];
  faqs: { question: string; answer: string }[];
  relatedCalculators: { label: string; url: string }[];
  sources: { label: string; url: string }[];
}

export const GUIDE_ARTICLES: readonly GuideArticle[] = [
  {
    "slug": "hipoteca-sistema-frances-amortizacion-constante",
    "title": "Hipoteca: sistema francés o amortización constante, cuánto cambia la cuota y el coste",
    "summary": "Compara cuota inicial, pago medio, intereses y capital pendiente en dos sistemas con el mismo préstamo.",
    "author": "Mario Galindo",
    "publishedAt": "23 de noviembre de 2026",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "leadHtml": "<p>Para una hipoteca de <strong>200.000 € a 25 años y un TIN del 3,5 %</strong>, la primera cuota es <strong>1.001,25 €</strong> con el sistema francés y <strong>1.250,00 €</strong> con el español de capital constante: este último empieza <strong>248,75 € por encima</strong>. La cuota española pasa a ser menor en el <strong>mes 129</strong> —<strong>1.001,11 €</strong>, frente a <strong>1.001,25 €</strong>— y el motor estima <strong>12.582,48 € menos de intereses</strong> al final.</p>\n<p>El ejemplo compara cómo se distribuyen los pagos y cuánto interés suma cada calendario: <strong>100.374,14 €</strong> con el francés y <strong>87.791,67 €</strong> con el español de capital constante. Son resultados de un escenario matemático, no describen todas las ofertas hipotecarias ni recomiendan un sistema.</p>\n<blockquote>\n<p><strong>Estimación orientativa:</strong> es un resultado teórico, no una oferta hipotecaria ni asesoramiento financiero.</p>\n</blockquote>\n",
    "sections": [
      {
        "id": "mismo-capital-mismo-interes-y-mismo-plazo",
        "title": "Mismo capital, mismo interés y mismo plazo",
        "html": "<p>Para reproducir el caso en la <a href=\"/calculadora-hipoteca/\">calculadora de hipoteca</a>, introduce un precio de vivienda de <strong>200.000 €</strong>, una aportación inicial de <strong>0 €</strong>, TIN anual de <strong>3,5 %</strong> y plazo de <strong>25 años</strong>. Ejecuta el cálculo una vez con «Francés» y otra con «Español». El capital financiado es 200.000 € y hay <strong>300 cuotas mensuales</strong> en ambos escenarios. El motor supone un tipo fijo y constante, sin comisiones, seguros ni amortizaciones anticipadas; una hipoteca variable cambia las cuotas cuando cambia el tipo.</p>\n<p>La tabla usa las salidas del motor para primera y última cuota, intereses y total pagado. La cuota media se obtiene del total pagado dividido entre las 300 cuotas; no se redondean los pagos en los cálculos internos, solo en su presentación.</p>\n<table>\n<thead>\n<tr>\n<th>Sistema de amortización</th>\n<th align=\"right\">Primera cuota</th>\n<th align=\"right\">Última cuota</th>\n<th align=\"right\">Cuota media</th>\n<th align=\"right\">Intereses totales</th>\n<th align=\"right\">Coste total (capital + intereses)</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Francés: cuota constante</td>\n<td align=\"right\">1.001,25 €</td>\n<td align=\"right\">1.001,25 €</td>\n<td align=\"right\">1.001,25 €</td>\n<td align=\"right\">100.374,14 €</td>\n<td align=\"right\">300.374,14 €</td>\n</tr>\n<tr>\n<td>Español: capital constante</td>\n<td align=\"right\">1.250,00 €</td>\n<td align=\"right\">668,61 €</td>\n<td align=\"right\">959,31 €</td>\n<td align=\"right\">87.791,67 €</td>\n<td align=\"right\">287.791,67 €</td>\n</tr>\n</tbody></table>\n<p>En esta guía y en el selector de CuentaClara, «Francés» significa <strong>cuota constante</strong> y «Español» significa <strong>amortización de capital constante</strong>. El Banco de España también emplea «amortización constante» al explicar la cuota del sistema francés; aquí se distingue entre mantener constante la cuota y mantener constante el capital amortizado.</p>\n"
      },
      {
        "id": "que-cambia-dentro-de-cada-cuota",
        "title": "Qué cambia dentro de cada cuota",
        "html": "<p>En el <strong>sistema francés</strong>, cada pago contiene intereses sobre el capital pendiente y devolución de capital. En el primer mes de este ejemplo, los intereses son <strong>583,33 €</strong> en ambos sistemas. Como la cuota francesa es menor, ese mes amortiza <strong>417,91 €</strong> de capital, frente a los <strong>666,67 €</strong> del sistema español. Después, al reducirse el saldo, baja la parte destinada a intereses y aumenta la parte de capital dentro de la cuota fija. El Banco de España describe este comportamiento en su explicación de la <a href=\"https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Cuota_hipotecaria.html\">cuota hipotecaria</a>.</p>\n<p>En el <strong>sistema español de capital constante</strong>, se devuelven <strong>666,67 € de capital</strong> en cada mensualidad. Los intereses se calculan sobre un saldo que va disminuyendo, así que también baja el importe total de la cuota. Por eso la primera cuota del caso es la mayor y la última es menor. La media, <strong>959,31 €</strong>, queda por debajo de la cuota fija francesa, pero no describe lo que se paga en el primer mes.</p>\n<p>Comparar solo la cuota inicial oculta el resto del recorrido. La primera cuota española es más alta, pero la deuda cae más deprisa. Con el francés, la cuota de entrada es más baja y previsible bajo el supuesto de interés fijo, aunque se acumulan más intereses durante todo el plazo. Las diferencias no se deben a que una opción financie menos capital: ambos escenarios comienzan en 200.000 € y duran 300 meses.</p>\n"
      },
      {
        "id": "capital-pendiente-a-los-5-10-y-15-anos",
        "title": "Capital pendiente a los 5, 10 y 15 años",
        "html": "<p>El calendario del motor permite consultar el saldo después de cada mensualidad. La tabla muestra el capital que quedaría justo tras la cuota del mes 60, 120 y 180, respectivamente:</p>\n<table>\n<thead>\n<tr>\n<th>Momento</th>\n<th align=\"right\">Francés: capital pendiente</th>\n<th align=\"right\">Español: capital pendiente</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Tras 5 años (cuota 60)</td>\n<td align=\"right\">172.640,81 €</td>\n<td align=\"right\">160.000,00 €</td>\n</tr>\n<tr>\n<td>Tras 10 años (cuota 120)</td>\n<td align=\"right\">140.057,57 €</td>\n<td align=\"right\">120.000,00 €</td>\n</tr>\n<tr>\n<td>Tras 15 años (cuota 180)</td>\n<td align=\"right\">101.252,80 €</td>\n<td align=\"right\">80.000,00 €</td>\n</tr>\n</tbody></table>\n<p>En los tres cortes, se ha devuelto más capital con amortización constante. Eso explica por qué su saldo pendiente cae más deprisa y por qué el interés acumulado termina siendo menor: cada mes los intereses se aplican sobre una deuda más reducida. En el sistema francés también disminuye el saldo, pero más despacio en los primeros años.</p>\n<p>Los importes de capital pendiente son saldos teóricos del calendario, no la cifra de cancelación que necesariamente comunicaría una entidad. Una operación real puede tener una fecha de pago distinta, redondeos, comisiones u otras condiciones que la herramienta no incorpora.</p>\n"
      },
      {
        "id": "en-que-mes-se-cruzan-las-cuotas",
        "title": "En qué mes se cruzan las cuotas",
        "html": "<p>La primera mensualidad del sistema español supera a la francesa en <strong>248,75 €</strong>. La diferencia se estrecha con el paso del tiempo, pero no se invierte enseguida: en el mes <strong>128</strong>, la cuota española todavía es <strong>1.003,06 €</strong>, por encima de los <strong>1.001,25 €</strong> del francés.</p>\n<p>En el mes <strong>129</strong>, el pago español baja a <strong>1.001,11 €</strong> y queda por debajo de la cuota francesa. Al final del plazo, el motor suma <strong>87.791,67 €</strong> de intereses con capital constante y <strong>100.374,14 €</strong> con el sistema francés: la diferencia de <strong>12.582,48 €</strong> se obtiene de los importes internos antes del redondeo de cada total. La tabla principal muestra esos totales redondeados por separado.</p>\n"
      },
      {
        "id": "que-muestran-los-perfiles-de-pago",
        "title": "Qué muestran los perfiles de pago",
        "html": "<p>En este escenario, la cuota francesa permanece en <strong>1.001,25 €</strong> al mes. La española comienza en <strong>1.250,00 €</strong> y disminuye; desde el mes 129 queda por debajo de la francesa. El capital pendiente también evoluciona de forma distinta: tras cinco años, quedan <strong>12.640,81 € menos</strong> en el calendario español. Son diferencias de importe y calendario, no una conclusión sobre qué estructura conviene a cada persona.</p>\n<p>Para leer una oferta completa, comprueba cómo se expresa el tipo y qué gastos incluye. La <a href=\"/guias/tin-tae-comisiones-prestamo-personal/\">guía de TIN, comisiones y TAE</a> explica por qué no basta con mirar un tipo aislado; sus ejemplos son de préstamos personales, pero la distinción entre tipo y costes ayuda a leer las condiciones de financiación. El simulador del Banco de España enlazado abajo calcula con el sistema francés, mientras que la calculadora de CuentaClara permite comparar también el sistema de capital constante.</p>\n"
      },
      {
        "id": "que-queda-fuera-de-esta-tabla",
        "title": "Qué queda fuera de esta tabla",
        "html": "<p>La tabla de coste total suma el capital y los intereses del modelo, no todos los importes de una oferta. No calcula la TAE ni compara comisiones, tasación, impuestos, gastos de compraventa o condiciones de bonificación. La <a href=\"/guias/tin-tae-comisiones-prestamo-personal/\">guía de TIN, comisiones y TAE</a> y el simulador oficial enlazado en las fuentes ayudan a revisar otros componentes; las condiciones concretas deben contrastarse en la documentación de cada préstamo.</p>\n<p>Para comparar escenarios, mantén iguales el capital y el plazo y modifica un solo supuesto cada vez. Si el tipo puede revisarse, la cuota real no seguirá necesariamente la trayectoria fija que muestra esta simulación.</p>\n<h3>Sobre el autor</h3>\n<blockquote>\n<p><strong>Sobre el autor:</strong> CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a <a href=\"mailto:cuentaclaracalc@gmail.com\">cuentaclaracalc@gmail.com</a>.</p>\n</blockquote>\n<p><strong>Datos revisados: 23 de noviembre de 2026.</strong></p>\n"
      }
    ],
    "headings": [
      {
        "id": "mismo-capital-mismo-interes-y-mismo-plazo",
        "title": "Mismo capital, mismo interés y mismo plazo"
      },
      {
        "id": "que-cambia-dentro-de-cada-cuota",
        "title": "Qué cambia dentro de cada cuota"
      },
      {
        "id": "capital-pendiente-a-los-5-10-y-15-anos",
        "title": "Capital pendiente a los 5, 10 y 15 años"
      },
      {
        "id": "en-que-mes-se-cruzan-las-cuotas",
        "title": "En qué mes se cruzan las cuotas"
      },
      {
        "id": "que-muestran-los-perfiles-de-pago",
        "title": "Qué muestran los perfiles de pago"
      },
      {
        "id": "que-queda-fuera-de-esta-tabla",
        "title": "Qué queda fuera de esta tabla"
      }
    ],
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
    ],
    "relatedCalculators": [
      {
        "label": "Calculadora de hipoteca",
        "url": "/calculadora-hipoteca/"
      }
    ],
    "sources": [
      {
        "label": "Banco de España: cuota hipotecaria",
        "url": "https://clientebancario.bde.es/pcb/es/menu-horizontal/productosservici/financiacion/hipotecas/guia-textual/primerospasoscon/Cuota_hipotecaria.html"
      },
      {
        "label": "Banco de España: simulador de préstamo hipotecario o personal",
        "url": "https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/simulador_prestamo_hipotecario_personal.html"
      }
    ]
  },
  {
    "slug": "12-o-14-pagas-que-cambia-en-tu-sueldo",
    "title": "12 o 14 pagas: qué cambia de verdad en tu sueldo",
    "summary": "Compara el neto anual, el promedio mensual y el importe medio por paga con el mismo salario bruto anual.",
    "author": "Mario Galindo",
    "publishedAt": "23 de noviembre de 2026",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "leadHtml": "<p>El neto anual estimado es <strong>23.124 €</strong> tanto en 12 como en 14 pagas, y el promedio mensual es <strong>1.927 €</strong> en ambos casos. El calendario sí cambia: en una distribución de 12 pagos se recibirían <strong>1.927 € al mes</strong>; en el escenario de 14, <strong>1.651,71 €</strong> en los meses ordinarios y <strong>3.303,43 €</strong> en junio y diciembre, al incluir una paga extra en cada uno.</p>\n<p>La tabla muestra el efecto sobre la liquidez, no un aumento del sueldo anual. Es una distribución simplificada: el motor reparte el neto en pagos iguales y no modela la retención mensual real ni el prorrateo de las extras.</p>\n<blockquote>\n<p><strong>Estimación orientativa:</strong> el motor estima un año completo con datos simplificados; no calcula una nómina ni la retención oficial de cada pago.</p>\n</blockquote>\n",
    "sections": [
      {
        "id": "calendario-mensual-con-extras-en-junio-y-diciembre",
        "title": "Calendario mensual con extras en junio y diciembre",
        "html": "<p>El cuadro usa como entrada anual <strong>30.000 € brutos</strong> y el mismo perfil en las dos ejecuciones: 35 años, contrato indefinido, cero descendientes, sin discapacidad ni movilidad reducida y sin otras rentas no exentas por encima del umbral indicado. Para el desglose de ese bruto a neto, consulta la guía de <a href=\"/guias/salario-bruto-neto/\">salario bruto y salario neto</a>. En la <a href=\"/sueldo-neto/\">calculadora de sueldo neto</a>, cambia únicamente el número de pagas.</p>\n<table>\n<thead>\n<tr>\n<th>Mes</th>\n<th align=\"right\">12 pagas: neto del mes</th>\n<th align=\"right\">Acumulado</th>\n<th align=\"right\">14 pagas: neto del mes</th>\n<th align=\"right\">Acumulado</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Enero</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">1.651,71 €</td>\n</tr>\n<tr>\n<td>Febrero</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">3.854,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">3.303,43 €</td>\n</tr>\n<tr>\n<td>Marzo</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">5.781,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">4.955,14 €</td>\n</tr>\n<tr>\n<td>Abril</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">7.708,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">6.606,86 €</td>\n</tr>\n<tr>\n<td>Mayo</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">9.635,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">8.258,57 €</td>\n</tr>\n<tr>\n<td>Junio</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">11.562,00 €</td>\n<td align=\"right\">3.303,43 €</td>\n<td align=\"right\">11.562,00 €</td>\n</tr>\n<tr>\n<td>Julio</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">13.489,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">13.213,71 €</td>\n</tr>\n<tr>\n<td>Agosto</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">15.416,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">14.865,43 €</td>\n</tr>\n<tr>\n<td>Septiembre</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">17.343,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">16.517,14 €</td>\n</tr>\n<tr>\n<td>Octubre</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">19.270,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">18.168,86 €</td>\n</tr>\n<tr>\n<td>Noviembre</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">21.197,00 €</td>\n<td align=\"right\">1.651,71 €</td>\n<td align=\"right\">19.820,57 €</td>\n</tr>\n<tr>\n<td>Diciembre</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">23.124,00 €</td>\n<td align=\"right\">3.303,43 €</td>\n<td align=\"right\">23.124,00 €</td>\n</tr>\n</tbody></table>\n<p>El motor devuelve <strong>1.927 € por paga</strong> en 12 pagos y <strong>1.651,714285… €</strong> en 14 pagas para este ejemplo. En junio y diciembre se suman dos salidas sin redondear; los acumulados usan esos valores antes de mostrar cada celda a céntimos.</p>\n"
      },
      {
        "id": "como-leer-los-importes-acumulados",
        "title": "Cómo leer los importes acumulados",
        "html": "<p>El acumulado muestra el dinero que habría entrado hasta el mes en esta distribución. En la modalidad de 12 pagos, crece con una cantidad igual todos los meses. En el escenario de 14, el saldo acumulado es menor en los meses ordinarios y aumenta en junio y diciembre, cuando se añade una paga extraordinaria.</p>\n<p>Por ejemplo, hasta mayo el acumulado es <strong>9.635 €</strong> con 12 pagos y <strong>8.258,57 €</strong> con 14. En junio, al incluir la extra en el segundo calendario, ambos acumulados llegan a <strong>11.562 €</strong>. En noviembre son <strong>21.197 €</strong> y <strong>19.820,57 €</strong>, respectivamente; tras los pagos de diciembre ambos cierran el año en <strong>23.124 €</strong>. Son importes de la tabla y sirven para visualizar el calendario, no para calcular una nómina real.</p>\n<p>Por eso el promedio mensual y el dinero disponible en una fecha concreta responden a preguntas distintas. El promedio resume el año; el acumulado ayuda a prever cuándo entra el dinero. Si tienes pagos periódicos, observa las filas de cada mes y no uses el promedio anual como si fuera el abono bancario garantizado en todas las mensualidades.</p>\n"
      },
      {
        "id": "que-hace-el-motor-con-el-numero-de-pagas",
        "title": "Qué hace el motor con el número de pagas",
        "html": "<p>La calculadora recibe el bruto anual y los datos del perfil, estima el neto anual y presenta dos divisiones: promedio mensual y neto por paga. Al elegir 12 o 14, el neto anual de este caso permanece igual; cambia el número por el que se divide para mostrar el neto por paga. El motor no conoce los meses en que se ingresan las extras ni transforma el importe en doce nóminas ordinarias y dos nóminas extraordinarias.</p>\n<p>Para formar la tabla, se ejecutó el motor con las opciones 12 y 14. Después, se distribuyó el resultado mensual en los meses: un neto por paga cada mes en la primera columna y, en la segunda, una paga adicional en junio y diciembre. El acumulado conserva los decimales internos del resultado y solo se redondea para presentar cada celda.</p>\n"
      },
      {
        "id": "las-12-pagas-incluyen-las-extraordinarias",
        "title": "¿Las 12 pagas incluyen las extraordinarias?",
        "html": "<p>En esta distribución, sí: los doce pagos iguales representan el neto anual repartido a lo largo de los doce meses, como si las pagas extraordinarias estuvieran prorrateadas. El motor no verifica si esa distribución es la acordada ni calcula el prorrateo de una nómina real.</p>\n<p>En la columna de 14 pagas, el ejemplo sitúa doce pagos ordinarios y dos extras, en junio y diciembre. El importe de cada paga parte del neto por paga que devuelve el motor; en esos dos meses se suman dos pagos. Es una forma de visualizar el calendario solicitado, no una liquidación real.</p>\n<p>El artículo 31 del Estatuto de los Trabajadores reconoce dos gratificaciones extraordinarias: una con ocasión de Navidad y otra en el mes fijado por convenio colectivo o acuerdo. Establece que puede acordarse en convenio colectivo su prorrateo en las doce mensualidades. Por tanto, tener doce abonos no basta para deducir qué incluye cada uno: comprueba lo que se aplica a tu caso en el convenio y el contrato. No se puede concluir por esta simulación que una modalidad corresponda automáticamente a todas las nóminas.</p>\n"
      },
      {
        "id": "como-afecta-a-tu-presupuesto",
        "title": "Cómo afecta a tu presupuesto",
        "html": "<ul>\n<li><strong>Reserva parte de las pagas extra</strong> para gastos anuales o irregulares, en vez de comprometerlas enteras en gastos fijos mensuales.</li>\n<li><strong>Compara ofertas por el total anual</strong>, el salario fijo y los conceptos variables antes de fijarte en el importe de una paga.</li>\n<li><strong>Revisa el contrato:</strong> comprueba si se indican 12 o 14 pagos, si las extras se prorratean y cuándo se abonan. Para entender retenciones y deducciones, consulta la guía de <a href=\"/guias/retencion-irpf-nomina-renta/\">IRPF en nómina y declaración de la renta</a>.</li>\n</ul>\n<blockquote>\n<p><strong>Sobre el autor:</strong> CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a <a href=\"mailto:cuentaclaracalc@gmail.com\">cuentaclaracalc@gmail.com</a>.</p>\n</blockquote>\n<p><strong>Datos revisados: 23 de noviembre de 2026.</strong></p>\n"
      }
    ],
    "headings": [
      {
        "id": "calendario-mensual-con-extras-en-junio-y-diciembre",
        "title": "Calendario mensual con extras en junio y diciembre"
      },
      {
        "id": "como-leer-los-importes-acumulados",
        "title": "Cómo leer los importes acumulados"
      },
      {
        "id": "que-hace-el-motor-con-el-numero-de-pagas",
        "title": "Qué hace el motor con el número de pagas"
      },
      {
        "id": "las-12-pagas-incluyen-las-extraordinarias",
        "title": "¿Las 12 pagas incluyen las extraordinarias?"
      },
      {
        "id": "como-afecta-a-tu-presupuesto",
        "title": "Cómo afecta a tu presupuesto"
      }
    ],
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
    ],
    "relatedCalculators": [
      {
        "label": "Calculadora de sueldo neto",
        "url": "/sueldo-neto/"
      }
    ],
    "sources": [
      {
        "label": "Estatuto de los Trabajadores, artículo 31 (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a31"
      }
    ]
  },
  {
    "slug": "que-incluye-un-finiquito-y-que-no",
    "title": "Qué incluye un finiquito y qué no",
    "summary": "Sigue un caso paso a paso para separar salario pendiente, vacaciones, pagas extra e indemnización.",
    "author": "Mario Galindo",
    "publishedAt": "23 de noviembre de 2026",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "leadHtml": "<p>En el caso de ejemplo, la calculadora estima <strong>3.123,29 € de finiquito</strong>: 2.465,75 € de salario pendiente y 657,53 € por 8 días de vacaciones. Suponemos 12 pagas con las extras prorrateadas, así que no queda una paga extra separada pendiente. Como es una baja voluntaria, la indemnización estimada es <strong>0 €</strong>.</p>\n<p>La clave es no mezclar conceptos: el finiquito liquida importes ya devengados y no cobrados; la indemnización, si corresponde según la causa, va aparte. El motor muestra ambas cantidades separadas, pero no decide qué días de vacaciones se han generado ni calcula por sí solo la parte proporcional de las pagas extra.</p>\n<blockquote>\n<p><strong>Estimación orientativa:</strong> el resultado depende de los días y cantidades que introduzcas; no sustituye la revisión de la liquidación real.</p>\n</blockquote>\n",
    "sections": [
      {
        "id": "el-caso-que-datos-se-introducen",
        "title": "El caso: qué datos se introducen",
        "html": "<p>Imaginemos a una persona con salario bruto anual de <strong>30.000 €</strong> que comunica una baja voluntaria con fecha de fin <strong>30 de septiembre de 2026</strong>. Para poder reproducir el ejemplo, suponemos <strong>12 pagas con las extras prorrateadas</strong>, <strong>30 días de salario pendientes</strong> y <strong>8 días de vacaciones no disfrutadas</strong>. La fecha de inicio del contrato es <strong>1 de mayo de 2022</strong>.</p>\n<p>En la <a href=\"/calculadora-finiquito-indemnizacion/\">calculadora de finiquito e indemnización</a>, introduce estos valores:</p>\n<table>\n<thead>\n<tr>\n<th>Campo del motor</th>\n<th align=\"right\">Entrada del caso</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Salario bruto anual</td>\n<td align=\"right\">30.000 €</td>\n</tr>\n<tr>\n<td>Pagas del supuesto</td>\n<td align=\"right\">12, con extras prorrateadas</td>\n</tr>\n<tr>\n<td>Días de salario pendientes</td>\n<td align=\"right\">30</td>\n</tr>\n<tr>\n<td>Días de vacaciones no disfrutadas</td>\n<td align=\"right\">8</td>\n</tr>\n<tr>\n<td>Pagas extra pendientes</td>\n<td align=\"right\">0 €</td>\n</tr>\n<tr>\n<td>Fecha de inicio</td>\n<td align=\"right\">01/05/2022</td>\n</tr>\n<tr>\n<td>Fecha de fin</td>\n<td align=\"right\">30/09/2026</td>\n</tr>\n<tr>\n<td>Causa de extinción</td>\n<td align=\"right\">Baja voluntaria</td>\n</tr>\n</tbody></table>\n<p>Los 30 días son el salario de septiembre que suponemos aún no abonado; los 8 días se justifican en el paso de vacaciones. La persona cobra 12 veces al año porque en este supuesto las extras ya se prorratean; por eso el campo de pagas extra pendientes es 0 €.</p>\n<p>El motor calcula el salario diario dividiendo el salario bruto anual entre <strong>365</strong>; la guía de uso de la calculadora indica que ese salario anual incluye las pagas extra, por lo que su importe medio ya queda repartido a lo largo del año. El campo de extra pendiente se añade aparte. Con 14 pagos sin prorratear puede haber solapamiento: no introduzcas en ambos campos la misma cantidad. La herramienta no ofrece un ajuste para separar los componentes; si no puedes comprobar que el importe pendiente está separado de la base anual usada, no tomes el total como una liquidación fiable.</p>\n"
      },
      {
        "id": "paso-1-localizar-el-salario-que-falta-por-cobrar",
        "title": "Paso 1: localizar el salario que falta por cobrar",
        "html": "<p>El motor obtiene un salario diario de <strong>82,19 €</strong> a partir del salario bruto anual indicado. Con 30 días pendientes, calcula <strong>2.465,75 €</strong> de salario pendiente. En esta simulación, los días se introducen directamente: no se determina automáticamente qué días del último mes están pagados ni se consulta el calendario de nómina.</p>\n<p>Comprueba hasta qué fecha se ha abonado el salario ordinario. El ejemplo supone que la nómina de agosto está pagada y que los 30 días de septiembre siguen pendientes. Si la empresa ya ha abonado parte del mes, ajusta los días para no contar dos veces el mismo periodo.</p>\n"
      },
      {
        "id": "paso-2-anadir-las-vacaciones-pendientes",
        "title": "Paso 2: añadir las vacaciones pendientes",
        "html": "<p>Para explicar de dónde salen los <strong>8 días</strong>, supongamos que el contrato reconoce <strong>30 días naturales</strong> de vacaciones por año completo y que el periodo de cómputo de este ejemplo coincide con el año natural. Desde el 1 de enero hasta el 30 de septiembre han transcurrido nueve meses: <strong>30 × 9 ÷ 12 = 22,5 días generados</strong>. Si la persona ya ha disfrutado <strong>14,5 días</strong>, el saldo es <strong>22,5 − 14,5 = 8 días pendientes</strong>. Esta regla de tres es el supuesto ilustrativo de la guía, no una fórmula universal; el artículo 38 establece que la duración se pacta en convenio o contrato y que no puede ser inferior a treinta días naturales al año, pero no fija esta operación mensual para todos los casos.</p>\n<p>Al introducir los 8 días, el motor estima <strong>657,53 €</strong> con el mismo salario diario. La herramienta no calcula el saldo vacacional. El artículo 38 del Estatuto regula las vacaciones anuales retribuidas; el SEPE explica que, si quedan días sin disfrutar al terminar el contrato, se abonan en la liquidación o finiquito. Contrasta los días disfrutados y pendientes con el registro de vacaciones y con el contrato o convenio aplicable.</p>\n<p>Para entender cuánto pueden cambiar las vacaciones y las pagas en una nómina a lo largo del año, consulta también <a href=\"/guias/12-o-14-pagas-que-cambia-en-tu-sueldo/\">12 o 14 pagas: qué cambia de verdad en tu sueldo</a>. La guía explica el reparto del salario, no determina el saldo vacacional de este ejemplo.</p>\n"
      },
      {
        "id": "paso-3-comprobar-como-se-cobran-las-pagas-extra",
        "title": "Paso 3: comprobar cómo se cobran las pagas extra",
        "html": "<p>Este caso elige <strong>12 pagas con las extras prorrateadas</strong>: los 30.000 € anuales ya se reparten entre los pagos del año y el campo de extra pendiente se deja en <strong>0 €</strong>. El motor divide el salario anual entre 365 para obtener el salario diario e incorpora las pagas en esa base; no calcula el calendario ni verifica si el prorrateo se acordó.</p>\n<p>El artículo 31 reconoce dos gratificaciones extraordinarias y contempla que su prorrateo en doce mensualidades pueda acordarse en convenio colectivo. El número de pagos, por sí solo, no permite saber qué se acordó en un contrato concreto. Comprueba la nómina, el contrato y el convenio. La guía de <a href=\"/guias/salario-bruto-neto/\">salario bruto y salario neto</a> explica cómo interpretar el bruto anual y las pagas.</p>\n"
      },
      {
        "id": "paso-4-leer-el-resultado-sin-sumar-conceptos-dos-veces",
        "title": "Paso 4: leer el resultado sin sumar conceptos dos veces",
        "html": "<p>Con las entradas del caso, el resultado del motor queda así:</p>\n<table>\n<thead>\n<tr>\n<th>Concepto</th>\n<th align=\"right\">Resultado del motor</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Salario diario usado por el motor</td>\n<td align=\"right\">82,19 €</td>\n</tr>\n<tr>\n<td>Salario pendiente (30 días)</td>\n<td align=\"right\">2.465,75 €</td>\n</tr>\n<tr>\n<td>Vacaciones no disfrutadas (8 días)</td>\n<td align=\"right\">657,53 €</td>\n</tr>\n<tr>\n<td>Pagas extra pendientes</td>\n<td align=\"right\">0,00 €</td>\n</tr>\n<tr>\n<td><strong>Finiquito estimado</strong></td>\n<td align=\"right\"><strong>3.123,29 €</strong></td>\n</tr>\n<tr>\n<td>Indemnización por baja voluntaria</td>\n<td align=\"right\">0,00 €</td>\n</tr>\n<tr>\n<td><strong>Total estimado</strong></td>\n<td align=\"right\"><strong>3.123,29 €</strong></td>\n</tr>\n</tbody></table>\n<p>El desglose se reproduce con salario anual de 30.000 €, 12 pagas con extras prorrateadas, 30 días de salario pendientes, 8 días de vacaciones, 0 € de extras pendientes, inicio el 1 de mayo de 2022, fin el 30 de septiembre de 2026 y causa «Baja voluntaria».</p>\n<p>El finiquito es el subtotal que reúne las partidas pendientes; no vuelvas a sumarlo a cada línea. En este escenario, el motor devuelve 0 € de indemnización por baja voluntaria.</p>\n"
      },
      {
        "id": "comparar-la-misma-liquidacion-con-un-despido-objetivo",
        "title": "Comparar la misma liquidación con un despido objetivo",
        "html": "<p>Sin cambiar salario, fechas ni cantidades pendientes, ejecuta el motor otra vez y selecciona «Despido objetivo». El resultado conserva el mismo finiquito y calcula aparte una indemnización distinta de cero:</p>\n<table>\n<thead>\n<tr>\n<th>Causa elegida en el motor</th>\n<th align=\"right\">Finiquito</th>\n<th align=\"right\">Indemnización</th>\n<th align=\"right\">Total</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Baja voluntaria</td>\n<td align=\"right\">3.123,29 €</td>\n<td align=\"right\">0,00 €</td>\n<td align=\"right\">3.123,29 €</td>\n</tr>\n<tr>\n<td>Despido objetivo</td>\n<td align=\"right\">3.123,29 €</td>\n<td align=\"right\">7.260,27 €</td>\n<td align=\"right\">10.383,56 €</td>\n</tr>\n</tbody></table>\n<p>La indemnización de la segunda fila corresponde al cálculo del motor para un despido objetivo: <strong>20 días de salario por año de servicio</strong>, según el artículo 53 del Estatuto de los Trabajadores. Otros tipos de despido se calculan de otra forma; aquí no se ofrecen cifras para ellos. La tabla reproduce una simulación y no determina si un caso real cumple los requisitos para calificarse como despido objetivo.</p>\n<p><strong>Alcance de los importes:</strong> todas las cantidades de los dos escenarios son brutas. A los conceptos salariales del finiquito se les aplican las cotizaciones y retenciones de IRPF que correspondan; esta guía y el motor no calculan esos descuentos ni el líquido final.</p>\n"
      },
      {
        "id": "lo-que-el-calculo-no-resuelve",
        "title": "Lo que el cálculo no resuelve",
        "html": "<p>La herramienta no lee nóminas ni contratos, no determina si el motivo declarado coincide con la calificación legal de la extinción y no interpreta convenios o salarios variables.</p>\n<p>El artículo 49.2 del Estatuto de los Trabajadores prevé que, al comunicar la extinción, se acompañe una propuesta del documento de liquidación de las cantidades adeudadas. Compara ese documento con los conceptos y periodos que ya tienes registrados. Si existe una diferencia, pide el detalle del cálculo antes de dar por buena una cifra que no puedas reconstruir.</p>\n"
      },
      {
        "id": "comprobaciones-antes-de-firmar",
        "title": "Comprobaciones antes de firmar",
        "html": "<ul>\n<li>Confirma la fecha de baja y hasta qué día está abonado el salario ordinario.</li>\n<li>Contrasta los días de vacaciones pendientes con el saldo que te comunica la empresa.</li>\n<li>Revisa si las pagas extra se pagan aparte o se prorratean y cómo se obtiene el importe pendiente.</li>\n<li>Comprueba que cada concepto del documento de liquidación aparece una sola vez.</li>\n<li>Separa el finiquito de cualquier indemnización y verifica que la causa de extinción introducida sea la correcta.</li>\n<li>Guarda las nóminas y justificantes que respaldan cada cantidad introducida.</li>\n</ul>\n<blockquote>\n<p><strong>Sobre el autor:</strong> CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a <a href=\"mailto:cuentaclaracalc@gmail.com\">cuentaclaracalc@gmail.com</a>.</p>\n</blockquote>\n<p><strong>Datos revisados: 23 de noviembre de 2026.</strong></p>\n"
      }
    ],
    "headings": [
      {
        "id": "el-caso-que-datos-se-introducen",
        "title": "El caso: qué datos se introducen"
      },
      {
        "id": "paso-1-localizar-el-salario-que-falta-por-cobrar",
        "title": "Paso 1: localizar el salario que falta por cobrar"
      },
      {
        "id": "paso-2-anadir-las-vacaciones-pendientes",
        "title": "Paso 2: añadir las vacaciones pendientes"
      },
      {
        "id": "paso-3-comprobar-como-se-cobran-las-pagas-extra",
        "title": "Paso 3: comprobar cómo se cobran las pagas extra"
      },
      {
        "id": "paso-4-leer-el-resultado-sin-sumar-conceptos-dos-veces",
        "title": "Paso 4: leer el resultado sin sumar conceptos dos veces"
      },
      {
        "id": "comparar-la-misma-liquidacion-con-un-despido-objetivo",
        "title": "Comparar la misma liquidación con un despido objetivo"
      },
      {
        "id": "lo-que-el-calculo-no-resuelve",
        "title": "Lo que el cálculo no resuelve"
      },
      {
        "id": "comprobaciones-antes-de-firmar",
        "title": "Comprobaciones antes de firmar"
      }
    ],
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
    ],
    "relatedCalculators": [
      {
        "label": "Calculadora de finiquito e indemnización",
        "url": "/calculadora-finiquito-indemnizacion/"
      }
    ],
    "sources": [
      {
        "label": "Estatuto de los Trabajadores, artículo 31: gratificaciones extraordinarias (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a31"
      },
      {
        "label": "Estatuto de los Trabajadores, artículo 38: vacaciones anuales (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a38"
      },
      {
        "label": "Estatuto de los Trabajadores, artículo 49: extinción del contrato (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a49"
      },
      {
        "label": "Estatuto de los Trabajadores, artículo 53: despido objetivo (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2015-11430#a53"
      },
      {
        "label": "SEPE: vacaciones no disfrutadas y liquidación o finiquito",
        "url": "https://www.sepe.es/HomeSepe/preguntas-frecuentes/detalle-pregunta?detail=/preguntas/prestaciones-por-desempleo/pago-y-cuant-a/cobro-el-paro-desde-el-dia-siguiente-al-que-dejo-de-trabajar-o-tengo-que-esperar-al-fin-del-periodo-de-vacaciones-no-disfrutadas-o-a-estar-de-alta-medica-si-me-encuentro-de-baja-medica"
      },
      {
        "label": "Seguridad Social: vacaciones no disfrutadas y abonadas al extinguirse el contrato",
        "url": "https://www.seg-social.es/wps/portal/wss/internet/PortalEducativo/Profesores/Unidad6/pess602/edu_001163?changeLanguage=es"
      },
      {
        "label": "Agencia Tributaria: retenciones del IRPF",
        "url": "https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml"
      }
    ]
  },
  {
    "slug": "tin-tae-comisiones-prestamo-personal",
    "title": "TIN, comisiones y TAE: cómo comparar un préstamo personal",
    "summary": "Compara seis escenarios de un préstamo de 10.000 € a 48 meses y distingue cuota, intereses, comisión de apertura y coste total.",
    "author": "Mario Galindo",
    "publishedAt": "23 de noviembre de 2026",
    "updatedAt": "23 de noviembre de 2026",
    "publishedAtIso": "2026-11-23",
    "updatedAtIso": "2026-11-23",
    "leadHtml": "<p>Para un préstamo de <strong>10.000 € a 48 meses</strong>, pasar del 6 % al 8 % TIN eleva el coste de financiación de <strong>1.272,82 € a 1.718,19 €</strong>: <strong>445,37 € más</strong>. Llegar al 10 % lo eleva a <strong>2.174,00 €</strong>, <strong>901,18 € más</strong> que al 6 %. La comisión de apertura del 2 % suma <strong>200 €</strong>; en estos escenarios pesa menos que subir el TIN.</p>\n<p>La comparación entre filas también importa: al 6 % con comisión, el coste es <strong>1.472,82 €</strong>; al 8 % sin comisión, <strong>1.718,19 €</strong>, es decir, <strong>245,37 € más</strong>. Para este ejemplo, reducir el TIN compensa más que eliminar la comisión por sí sola.</p>\n<blockquote>\n<p><strong>Estimación orientativa:</strong> las cifras describen un modelo matemático con los parámetros indicados; una oferta real puede incluir condiciones y costes que esta calculadora no modela.</p>\n</blockquote>\n",
    "sections": [
      {
        "id": "seis-escenarios-para-el-mismo-prestamo",
        "title": "Seis escenarios para el mismo préstamo",
        "html": "<p>Los seis casos varían el TIN y la comisión de apertura, manteniendo iguales los demás parámetros:</p>\n<table>\n<thead>\n<tr>\n<th align=\"right\">TIN anual</th>\n<th align=\"right\">Comisión de apertura</th>\n<th align=\"right\">Cuota mensual (primera / última)</th>\n<th align=\"right\">Coste total de financiación</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"right\">6 %</td>\n<td align=\"right\">0 % (0 €)</td>\n<td align=\"right\">234,85 € / 234,87 €</td>\n<td align=\"right\">1.272,82 €</td>\n</tr>\n<tr>\n<td align=\"right\">6 %</td>\n<td align=\"right\">2 % (200 €)</td>\n<td align=\"right\">234,85 € / 234,87 €</td>\n<td align=\"right\">1.472,82 €</td>\n</tr>\n<tr>\n<td align=\"right\">8 %</td>\n<td align=\"right\">0 % (0 €)</td>\n<td align=\"right\">244,13 € / 244,08 €</td>\n<td align=\"right\">1.718,19 €</td>\n</tr>\n<tr>\n<td align=\"right\">8 %</td>\n<td align=\"right\">2 % (200 €)</td>\n<td align=\"right\">244,13 € / 244,08 €</td>\n<td align=\"right\">1.918,19 €</td>\n</tr>\n<tr>\n<td align=\"right\">10 %</td>\n<td align=\"right\">0 % (0 €)</td>\n<td align=\"right\">253,63 € / 253,39 €</td>\n<td align=\"right\">2.174,00 €</td>\n</tr>\n<tr>\n<td align=\"right\">10 %</td>\n<td align=\"right\">2 % (200 €)</td>\n<td align=\"right\">253,63 € / 253,39 €</td>\n<td align=\"right\">2.374,00 €</td>\n</tr>\n</tbody></table>\n<p><strong>Parámetros reproducibles:</strong> importe de <strong>10.000 €</strong>, plazo de <strong>48 meses</strong>, sistema <strong>francés</strong>, <strong>0 €</strong> de gastos iniciales y <strong>0 €</strong> de coste adicional mensual. El coste total de financiación suma intereses y comisión de apertura. Las cuotas se muestran como primera / última para reflejar el redondeo del motor.</p>\n<p>Las diferencias de céntimos entre primera y última cuota se deben al redondeo de cada periodo; el motor ajusta la amortización final para cancelar el saldo. Todos los importes de la tabla son salidas de <code>calculatePersonalLoan</code>.</p>\n"
      },
      {
        "id": "que-cambia-mas-el-tipo-o-la-comision",
        "title": "Qué cambia más: el tipo o la comisión",
        "html": "<p>Compara primero las filas sin comisión. Al pasar del 6 % al 8 %, el coste total de financiación sube de 1.272,82 € a 1.718,19 €, una diferencia de 445,37 €. Como ambas filas tienen comisión cero y los demás costes también son cero, esa diferencia corresponde al interés adicional del escenario con el TIN más alto. Al 10 %, el coste llega a 2.174,00 €: son 901,18 € más que al 6 %.</p>\n<p>La comisión produce un efecto menor en este ejemplo. En cada pareja con el mismo TIN, pasar del 0 % al 2 % añade 200 € al coste de financiación: al 6 %, de 1.272,82 € a 1.472,82 €; al 8 %, de 1.718,19 € a 1.918,19 €; y al 10 %, de 2.174,00 € a 2.374,00 €. La cuota no cambia porque la comisión se paga aparte y no se suma al capital.</p>\n<p>La comparación cruzada confirma el orden: el caso del 8 % sin comisión (1.718,19 €) cuesta 245,37 € más que el del 6 % con comisión (1.472,82 €). Por tanto, con estos importes y plazos, reducir el TIN tiene más efecto que quitar la comisión del 2 %. La diferencia entre ofertas reales puede ser otra si cambian el plazo o los gastos.</p>\n"
      },
      {
        "id": "la-tae-para-comparar-ofertas",
        "title": "La TAE para comparar ofertas",
        "html": "<p>La <strong>TAE</strong> expresa en porcentaje anual el coste de una operación e incorpora el interés y los gastos o comisiones que correspondan. Por eso es la cifra adecuada para comparar ofertas con condiciones distintas: reúne más elementos del coste que el TIN por sí solo. Esta tabla, en cambio, compara el TIN y la comisión de apertura por separado para mostrar el efecto de cada uno bajo los mismos parámetros.</p>\n<p>El motor de CuentaClara <strong>no calcula la TAE</strong>: su coste total de financiación es una cantidad en euros, no un porcentaje anual. Para estimarla a partir del importe, el plazo, el tipo y los costes aplicables, utiliza el <a href=\"https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html\">simulador de TAE del Banco de España</a>. El simulador publica sus hipótesis; la TAE final de una entidad puede variar según las condiciones concretas de su oferta.</p>\n"
      },
      {
        "id": "reproduce-la-tabla-en-la-calculadora",
        "title": "Reproduce la tabla en la calculadora",
        "html": "<p>Abre la <a href=\"/calculadora-prestamo-personal/\">calculadora de préstamo personal</a> e introduce estos valores:</p>\n<ol>\n<li><strong>Importe solicitado:</strong> 10.000 €.</li>\n<li><strong>TIN anual:</strong> primero 6 %, después 8 % y finalmente 10 %.</li>\n<li><strong>Plazo:</strong> cuatro años y cero meses adicionales (48 cuotas).</li>\n<li><strong>Sistema:</strong> francés, el valor predeterminado de la herramienta.</li>\n<li><strong>Comisión de apertura:</strong> 0 % para una pasada y 2 % para la otra.</li>\n<li><strong>Gastos iniciales y coste adicional mensual:</strong> 0 € en ambos campos.</li>\n</ol>\n<p>Anota para cada cálculo la primera y la última cuota y el coste total de financiación. Al comparar dos ofertas, introduce también los gastos que se vayan a cobrar; no los incluyas en la comisión si ya aparecen en otro campo. Comprueba que el capital recibido y el plazo coinciden con la documentación de la entidad.</p>\n<p>Para reconstruir una fila, selecciona el TIN indicado y ejecuta el cálculo una vez con comisión cero y otra con comisión del 2 %. Repite ambas pruebas para cada tipo, sin cambiar el importe, el plazo, el sistema ni los demás costes. En el resultado, usa «Coste total de financiación» para comparar lo que cuesta el crédito; no lo confundas con el total devuelto en cuotas, que también incluye el principal prestado. Las cifras de esta tabla corresponden a seis ejecuciones separadas del mismo motor.</p>\n"
      },
      {
        "id": "que-mirar-antes-de-firmar",
        "title": "Qué mirar antes de firmar",
        "html": "<ul>\n<li><strong>Importe recibido:</strong> confirma si la entidad entrega el capital solicitado completo o descuenta algún coste al inicio. En el ejemplo, el motor presupone que se reciben los 10.000 € íntegros.</li>\n<li><strong>TIN, TAE y plazo:</strong> anota las condiciones de la oferta y verifica que comparas el mismo importe, periodicidad y duración. No elijas solo por la cuota más baja.</li>\n<li><strong>Comisión de apertura:</strong> revisa el porcentaje o importe en euros, cuándo se paga y si la documentación indica que se financia. La calculadora de esta página la suma aparte; no supone que se añada al capital.</li>\n<li><strong>Otros gastos:</strong> pregunta qué gastos iniciales, productos asociados o costes periódicos son obligatorios para obtener esas condiciones. Incluye los aplicables al comparar el coste, evitando contarlos dos veces.</li>\n<li><strong>Sistema, calendario y amortización anticipada:</strong> confirma cómo se amortiza la deuda, cuándo se pagan las cuotas y qué condiciones aplican si devuelves parte o todo antes de tiempo. Estos escenarios no incluyen ese posible coste.</li>\n<li><strong>Presupuesto mensual real:</strong> compara la cuota con el dinero disponible después de gastos habituales, no solo con el salario bruto. Para estimar el neto, consulta las guías de <a href=\"/guias/salario-bruto-neto/\">salario bruto y salario neto</a> y <a href=\"/guias/retencion-irpf-nomina-renta/\">retención de IRPF y declaración de la renta</a>.</li>\n</ul>\n<blockquote>\n<p><strong>Sobre el autor:</strong> CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España. Para contactar, proponer una corrección o enviar una sugerencia, escribe a <a href=\"mailto:cuentaclaracalc@gmail.com\">cuentaclaracalc@gmail.com</a>.</p>\n</blockquote>\n<p><strong>Datos revisados: 23 de noviembre de 2026.</strong></p>\n"
      }
    ],
    "headings": [
      {
        "id": "seis-escenarios-para-el-mismo-prestamo",
        "title": "Seis escenarios para el mismo préstamo"
      },
      {
        "id": "que-cambia-mas-el-tipo-o-la-comision",
        "title": "Qué cambia más: el tipo o la comisión"
      },
      {
        "id": "la-tae-para-comparar-ofertas",
        "title": "La TAE para comparar ofertas"
      },
      {
        "id": "reproduce-la-tabla-en-la-calculadora",
        "title": "Reproduce la tabla en la calculadora"
      },
      {
        "id": "que-mirar-antes-de-firmar",
        "title": "Qué mirar antes de firmar"
      }
    ],
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
    ],
    "relatedCalculators": [
      {
        "label": "Calculadora de préstamo personal",
        "url": "/calculadora-prestamo-personal/"
      }
    ],
    "sources": [
      {
        "label": "Banco de España: cuidado con el coste de la financiación (TIN y TAE)",
        "url": "https://clientebancario.bde.es/pcb/es/blog/Cuidado_con_el_6edceea38293961.html"
      },
      {
        "label": "Banco de España: simulador de la TAE de un préstamo personal",
        "url": "https://clientebancario.bde.es/pcb/es/menu-horizontal/podemosayudarte/simuladores/calculo_tae_prestamo_personal.html"
      },
      {
        "label": "Banco de España: comparadores y simuladores financieros",
        "url": "https://clientebancario.bde.es/pcb/es/menu-horizontal/actualidadeducac/educacion-financiera/comparadores-y-simuladores/"
      }
    ]
  },
  {
    "slug": "salario-bruto-neto",
    "title": "Salario bruto y salario neto en España: qué cambia de una cifra a otra",
    "summary": "Aprende a leer una oferta de salario, distinguir las deducciones de una nómina y comparar pagas con un ejemplo reproducible.",
    "author": "Mario Galindo",
    "publishedAt": "20 de noviembre de 2026",
    "updatedAt": "20 de noviembre de 2026",
    "publishedAtIso": "2026-11-20",
    "updatedAtIso": "2026-11-20",
    "leadHtml": "<p>Con <strong>30.000 € brutos al año en 14 pagas</strong>, el motor de CuentaClara estima <strong>23.124 € netos al año</strong>, equivalentes a <strong>1.927 € al mes de media</strong> o unos <strong>1.651,71 € por paga</strong>. El promedio mensual divide el neto anual entre doce; no significa que las catorce transferencias sean iguales. A continuación se explica qué se descuenta, se comparan cinco salarios y se muestran ejemplos para distintas situaciones familiares y laborales.</p>\n<blockquote>\n<p><strong>Alcance de las cifras:</strong> son salidas del modelo actual de CuentaClara, que simplifica cotizaciones e IRPF y no calcula una nómina ni la retención oficial de cada persona. Contrasta los datos vigentes con las fuentes oficiales enlazadas al final.</p>\n</blockquote>\n",
    "sections": [
      {
        "id": "bruto-anual-pagas-y-neto",
        "title": "Bruto anual, pagas y neto",
        "html": "<p>El bruto anual es la retribución antes de deducciones. Si una oferta indica 30.000 €, pregunta si incluye complementos y qué parte es fija: un bonus condicionado no equivale a salario garantizado. En 12 pagas, 30.000 € se reparten en 2.500 € brutos por pago; en 14, el promedio aritmético es 2.142,86 €. El calendario de pagas extraordinarias puede hacer que cada nómina difiera de ese promedio.</p>\n<p>El neto resta cotizaciones del trabajador e IRPF del bruto, junto con otras partidas que pueda tener una nómina concreta. Para las personas y condiciones de la tabla, el modelo calcula 1.950 € de Seguridad Social y 4.926 € de IRPF sobre 30.000 €; quedan 23.124 €. El IRPF no es una cotización: es un impuesto distinto, cuyo pago anticipado en nómina se regulariza en la declaración. La <a href=\"/guias/retencion-irpf-nomina-renta/\">guía sobre retención de IRPF y declaración de la renta</a> explica esa diferencia.</p>\n"
      },
      {
        "id": "cinco-salarios-con-el-mismo-perfil",
        "title": "Cinco salarios con el mismo perfil",
        "html": "<p>En todos los casos se introducen 35 años, contrato indefinido, 14 pagas, ningún hijo, sin discapacidad y sin otras rentas no exentas por encima del umbral del formulario. «Descuentos» suma Seguridad Social e IRPF del motor; el porcentaje se calcula sobre el bruto anual.</p>\n<table>\n<thead>\n<tr>\n<th align=\"right\">Bruto anual</th>\n<th align=\"right\">Neto anual</th>\n<th align=\"right\">Neto medio mensual (÷12)</th>\n<th align=\"right\">Descuentos totales</th>\n<th align=\"right\">Descuentos / bruto</th>\n</tr>\n</thead>\n<tbody><tr>\n<td align=\"right\">18.000 €</td>\n<td align=\"right\">16.454,18 €</td>\n<td align=\"right\">1.371,18 €</td>\n<td align=\"right\">1.545,82 €</td>\n<td align=\"right\">8,59 %</td>\n</tr>\n<tr>\n<td align=\"right\">24.000 €</td>\n<td align=\"right\">19.197,00 €</td>\n<td align=\"right\">1.599,75 €</td>\n<td align=\"right\">4.803,00 €</td>\n<td align=\"right\">20,01 %</td>\n</tr>\n<tr>\n<td align=\"right\">30.000 €</td>\n<td align=\"right\">23.124,00 €</td>\n<td align=\"right\">1.927,00 €</td>\n<td align=\"right\">6.876,00 €</td>\n<td align=\"right\">22,92 %</td>\n</tr>\n<tr>\n<td align=\"right\">40.000 €</td>\n<td align=\"right\">29.655,00 €</td>\n<td align=\"right\">2.471,25 €</td>\n<td align=\"right\">10.345,00 €</td>\n<td align=\"right\">25,86 %</td>\n</tr>\n<tr>\n<td align=\"right\">50.000 €</td>\n<td align=\"right\">35.545,50 €</td>\n<td align=\"right\">2.962,13 €</td>\n<td align=\"right\">14.454,50 €</td>\n<td align=\"right\">28,91 %</td>\n</tr>\n</tbody></table>\n<p>Para repetir la comparación, abre la <a href=\"/sueldo-neto/\">calculadora de sueldo neto</a> e introduce el importe bruto de cada fila. Mantén 14 pagas, 35 años, contrato indefinido, ningún hijo, sin discapacidad y sin otras rentas no exentas por encima del umbral indicado en el formulario. Anota el neto anual y divide por doce para obtener el promedio mensual; resta ese neto al bruto para hallar los descuentos y expresa la diferencia como porcentaje del bruto. Por ejemplo, para 40.000 €, el resultado de la tabla deja 29.655 € netos: 10.345 € de descuentos, el 25,86 % del bruto.</p>\n"
      },
      {
        "id": "nomina-ilustrativa-de-30-000",
        "title": "Nómina ilustrativa de 30.000 €",
        "html": "<p>La siguiente tabla muestra una <strong>vista mensual equivalente de doce meses</strong>: divide los totales anuales del motor entre doce. No es el líquido real de una nómina en 14 pagas. Con catorce pagos, 30.000 € equivalen a 2.142,86 € brutos por paga y el promedio neto por paga calculado es 1.651,71 €. El motor no distribuye la cotización y el IRPF según el calendario real de nóminas.</p>\n<table>\n<thead>\n<tr>\n<th>Concepto</th>\n<th align=\"right\">Total anual del modelo</th>\n<th align=\"right\">Equivalente mensual (÷12)</th>\n</tr>\n</thead>\n<tbody><tr>\n<td>Devengos salariales brutos</td>\n<td align=\"right\">30.000,00 €</td>\n<td align=\"right\">2.500,00 €</td>\n</tr>\n<tr>\n<td>Base de cotización anual usada por el modelo</td>\n<td align=\"right\">30.000,00 €</td>\n<td align=\"right\">2.500,00 €</td>\n</tr>\n<tr>\n<td>Contingencias comunes (4,70 %)</td>\n<td align=\"right\">−1.410,00 €</td>\n<td align=\"right\">−117,50 €</td>\n</tr>\n<tr>\n<td>Desempleo, contrato indefinido (1,55 %)</td>\n<td align=\"right\">−465,00 €</td>\n<td align=\"right\">−38,75 €</td>\n</tr>\n<tr>\n<td>Formación profesional (0,10 %)</td>\n<td align=\"right\">−30,00 €</td>\n<td align=\"right\">−2,50 €</td>\n</tr>\n<tr>\n<td>Mecanismo de Equidad Intergeneracional (0,15 %)</td>\n<td align=\"right\">−45,00 €</td>\n<td align=\"right\">−3,75 €</td>\n</tr>\n<tr>\n<td>Total de cotizaciones del trabajador</td>\n<td align=\"right\">−1.950,00 €</td>\n<td align=\"right\">−162,50 €</td>\n</tr>\n<tr>\n<td>IRPF estimado, distribuido como promedio</td>\n<td align=\"right\">−4.926,00 €</td>\n<td align=\"right\">−410,50 €</td>\n</tr>\n<tr>\n<td>Líquido resultante del modelo</td>\n<td align=\"right\">23.124,00 €</td>\n<td align=\"right\">1.927,00 €</td>\n</tr>\n</tbody></table>\n<p>Las líneas de cotización suman 6,50 % de la base anual usada por el motor. La columna mensual facilita ver la resta: 2.500 € menos 162,50 € de cotización y 410,50 € de IRPF deja 1.927 €. Las retenciones reales pueden variar entre periodos; revisa las bases y conceptos de tu propia nómina.</p>\n"
      },
      {
        "id": "tres-comparaciones-con-30-000-brutos",
        "title": "Tres comparaciones con 30.000 € brutos",
        "html": "<p>Los siguientes casos mantienen 35 años, 14 pagas, contrato indefinido y el resto de datos del perfil base, salvo el factor que se compara:</p>\n<ol>\n<li><strong>Un hijo frente a ninguno.</strong> Con cero hijos, el neto es 23.124 €. Con un descendiente que da derecho al mínimo, compartido con otra persona progenitora, el motor da 23.352 €: 228 € más al año, o 19 € de promedio mensual. El resultado depende del derecho al mínimo y de si se comparte.</li>\n<li><strong>Discapacidad reconocida del 33 %.</strong> El neto pasa a 24.744 €, frente a 23.124 € sin discapacidad: 1.620 € más al año (135 € al mes de promedio). El caso no marca movilidad reducida; el motor aplica sus supuestos para ese grado.</li>\n<li><strong>Contrato temporal frente a indefinido.</strong> El neto del caso indefinido es 23.124 €; con contrato temporal, 23.113,50 €. La diferencia del modelo es −10,50 € al año: la cotización social calculada pasa de 1.950 € a 1.965 €.</li>\n</ol>\n"
      },
      {
        "id": "errores-habituales-al-comparar-ofertas",
        "title": "Errores habituales al comparar ofertas",
        "html": "<ul>\n<li><strong>Comparar solo el sueldo mensual.</strong> 30.000 € en 12 pagas son 2.500 € brutos por paga; en 14, 2.142,86 € de promedio. Compara primero el total anual.</li>\n<li><strong>Creer que al subir de tramo se puede cobrar menos neto.</strong> El IRPF es progresivo: el tipo superior se aplica a la parte que cae en ese tramo, no a todo el salario. En la tabla, al pasar de 30.000 € a 40.000 €, el neto del modelo sube de 23.124 € a 29.655 €; aumenta el descuento medio, pero no cae el neto.</li>\n<li><strong>Confundir retención con impuesto final.</strong> La retención es un pago a cuenta; la declaración suma los ingresos y circunstancias del ejercicio. Consulta la <a href=\"/guias/retencion-irpf-nomina-renta/\">guía de retención de IRPF</a> para ver el recorrido.</li>\n<li><strong>Contar un variable como garantizado.</strong> Si 4.000 € dependen de objetivos, no los compares como si fueran parte fija de la oferta.</li>\n<li><strong>Sumar cotizaciones e IRPF como si fueran lo mismo.</strong> En el ejemplo de 30.000 €, son 1.950 € y 4.926 € respectivamente, con reglas y finalidad diferentes.</li>\n</ul>\n"
      },
      {
        "id": "como-revisar-una-oferta",
        "title": "Cómo revisar una oferta",
        "html": "<p>Pide el salario fijo anual, los complementos y las condiciones del variable por separado. Confirma si las pagas extra se abonan aparte o se prorratean: un anuncio de «2.500 € al mes» puede significar 30.000 € anuales en 12 pagos, no 35.000 € en 14. Si recibes dos ofertas, anualiza los conceptos garantizados antes de comparar el neto mensual.</p>\n<p>Introduce después los datos en la <a href=\"/sueldo-neto/\">calculadora de sueldo neto</a> y conserva el perfil usado. Si la oferta cambia de 30.000 € a 40.000 €, la tabla estima 544,25 € más de neto medio al mes (2.471,25 € frente a 1.927 €), bajo el mismo perfil del motor. Al recibir la nómina, compara cada línea con el contrato y pregunta por diferencias concretas. Para una retención personalizada, utiliza el servicio de la Agencia Tributaria y revisa la <a href=\"/como-se-calcula/\">metodología de CuentaClara</a>.</p>\n"
      },
      {
        "id": "que-no-debe-concluirse-de-un-simulador",
        "title": "Qué no debe concluirse de un simulador",
        "html": "<p>El resultado no determina cuánto retendrá tu empresa en cada nómina ni el importe final de tu declaración.<br>Tampoco decide qué oferta te conviene: pueden cambiar jornada, horario, variables y beneficios.<br>Para un caso concreto, contrasta los datos con la AEAT y con tu nómina.</p>\n<h3>Sobre el autor</h3>\n<p>CuentaClara es un proyecto de <strong>Mario Galindo</strong>, que vive en <strong>Murcia, España</strong>. Para proponer una corrección o hacer una consulta, escribe a <strong><a href=\"mailto:cuentaclaracalc@gmail.com\">cuentaclaracalc@gmail.com</a></strong>. Para entender por qué la retención de una nómina puede diferir de la renta, continúa con la <a href=\"/guias/retencion-irpf-nomina-renta/\">guía sobre retención de IRPF y declaración</a>.</p>\n"
      }
    ],
    "headings": [
      {
        "id": "bruto-anual-pagas-y-neto",
        "title": "Bruto anual, pagas y neto"
      },
      {
        "id": "cinco-salarios-con-el-mismo-perfil",
        "title": "Cinco salarios con el mismo perfil"
      },
      {
        "id": "nomina-ilustrativa-de-30-000",
        "title": "Nómina ilustrativa de 30.000 €"
      },
      {
        "id": "tres-comparaciones-con-30-000-brutos",
        "title": "Tres comparaciones con 30.000 € brutos"
      },
      {
        "id": "errores-habituales-al-comparar-ofertas",
        "title": "Errores habituales al comparar ofertas"
      },
      {
        "id": "como-revisar-una-oferta",
        "title": "Cómo revisar una oferta"
      },
      {
        "id": "que-no-debe-concluirse-de-un-simulador",
        "title": "Qué no debe concluirse de un simulador"
      }
    ],
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
    ],
    "relatedCalculators": [
      {
        "label": "Calculadora de sueldo neto",
        "url": "/sueldo-neto/"
      },
      {
        "label": "Calculadora de finiquito e indemnización",
        "url": "/calculadora-finiquito-indemnizacion/"
      }
    ],
    "sources": [
      {
        "label": "Agencia Tributaria: retenciones",
        "url": "https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml"
      },
      {
        "label": "Seguridad Social: bases y tipos de cotización",
        "url": "https://www.seg-social.es/wps/portal/wss/internet/Trabajadores/CotizacionRecaudacionTrabajadores/36537"
      },
      {
        "label": "Ley del Impuesto sobre la Renta de las Personas Físicas (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764"
      }
    ]
  },
  {
    "slug": "retencion-irpf-nomina-renta",
    "title": "Retención de IRPF en la nómina: por qué no es la declaración de la renta",
    "summary": "Sigue el recorrido del dinero retenido durante el año y entiende cómo se compara con el impuesto anual al presentar la declaración.",
    "author": "Mario Galindo",
    "publishedAt": "20 de noviembre de 2026",
    "updatedAt": "20 de noviembre de 2026",
    "publishedAtIso": "2026-11-20",
    "updatedAtIso": "2026-11-20",
    "leadHtml": "<p>La retención de IRPF de la nómina es un pago a cuenta, no el impuesto anual definitivo. La empresa descuenta e ingresa anticipos durante el ejercicio; después, la declaración reúne las rentas y circunstancias que correspondan y calcula si queda una diferencia por pagar o devolver.</p>\n<blockquote>\n<p><strong>Alcance:</strong> la calculadora de CuentaClara estima una cuota anual simplificada para orientar sobre el sueldo neto. No calcula la retención que debe aplicar una empresa ni el resultado de tu declaración.</p>\n</blockquote>\n",
    "sections": [
      {
        "id": "de-la-nomina-a-la-declaracion-un-recorrido",
        "title": "De la nómina a la declaración: un recorrido",
        "html": "<p>La empresa calcula la retención de cada pago de acuerdo con el procedimiento reglamentario y los datos disponibles sobre la retribución prevista y las circunstancias comunicadas por la persona trabajadora. No basta con aplicar un porcentaje fijo al sueldo mensual: si cambia el salario previsto, el tiempo de trabajo o la información personal relevante, el cálculo puede revisarse. La retención que aparece en la nómina se ingresa a la Administración como pago a cuenta del IRPF.</p>\n<p>Al cerrar el ejercicio, cada pagador comunica cuánto abonó y retuvo. La suma puede diferir de la previsión inicial: quizá hubo dos empleos sucesivos, un bonus o meses sin trabajar. En la declaración se analizan conjuntamente las rentas del año y las circunstancias del contribuyente, en lugar de mirar cada nómina por separado. Por eso el porcentaje retenido sobre el salario no tiene por qué coincidir con el tipo efectivo anual.</p>\n<p>Si trabajaste para dos empresas, no compares únicamente el porcentaje que aparece en la última nómina con el resultado de la declaración. Reúne las nóminas y los certificados de retenciones de ambos pagadores; cada documento cubre solo lo que pagó esa empresa. Los datos fiscales de la AEAT permiten revisar ingresos y anticipos comunicados antes de confirmar el borrador.</p>\n<p>La declaración determina la cuota que corresponde según las reglas del ejercicio y después descuenta los pagos a cuenta, incluidas las retenciones soportadas. De forma simplificada:</p>\n<blockquote>\n<p><strong>Resultado de la declaración = cuota anual − pagos a cuenta</strong></p>\n</blockquote>\n<p>Si las retenciones y otros pagos a cuenta superan la cuota, puede resultar una devolución. Si no llegan a cubrirla, puede salir una cantidad a ingresar. Una devolución no demuestra por sí sola que la empresa se equivocara, y haber tenido retenciones todos los meses tampoco garantiza que el resultado sea a devolver. La operación explica la diferencia final, pero el importe concreto depende de los datos y reglas de la declaración.</p>\n"
      },
      {
        "id": "por-que-te-puede-salir-a-pagar",
        "title": "Por qué te puede salir a pagar",
        "html": "<ul>\n<li><strong>Dos pagadores o cambio de empresa.</strong> Cada empresa puede calcular la retención considerando solo lo que prevé pagarte; al sumar los empleos, las retenciones conjuntas pueden quedar por debajo de la cuota anual. <em>Ejemplo: trabajas para una empresa hasta junio y empiezas en otra en julio.</em></li>\n<li><strong>Otras rentas.</strong> Ingresos distintos del sueldo pueden aumentar la cuota y no siempre llevan retención suficiente. <em>Ejemplo: además de la nómina, cobras un alquiler durante parte del año.</em></li>\n<li><strong>Variable no prevista.</strong> Un pago variable puede elevar el total anual por encima de la previsión usada para calcular los anticipos. <em>Ejemplo: recibes un bonus que no estaba incluido en el salario previsto al inicio del año.</em></li>\n<li><strong>Datos personales desactualizados.</strong> Si comunicaste una circunstancia que reducía la retención y ya no se cumple, el anticipo puede ser inferior al correspondiente a tus datos actuales. <em>Ejemplo: la empresa sigue aplicando datos familiares que han cambiado.</em></li>\n<li><strong>Retención voluntariamente baja.</strong> Si pediste que te aplicaran un porcentaje inferior al cálculo ordinario, quizá hayas ingresado menos a cuenta durante el año. <em>Ejemplo: solicitaste reducir voluntariamente la retención que te propuso la empresa.</em></li>\n</ul>\n"
      },
      {
        "id": "por-que-te-puede-salir-a-devolver",
        "title": "Por qué te puede salir a devolver",
        "html": "<ul>\n<li><strong>Retención superior a la cuota final.</strong> Si la empresa retuvo más de lo que resulta al calcular el ejercicio completo, la diferencia puede salir a devolver. <em>Ejemplo: tus ingresos finales fueron inferiores a los previstos cuando se fijó el porcentaje.</em></li>\n<li><strong>Cambio familiar durante el año.</strong> Una circunstancia familiar puede modificar el resultado y quizá no se reflejó desde el primer pago. <em>Ejemplo: comunicas un nacimiento a mitad de año y revisas su efecto al presentar la declaración.</em></li>\n<li><strong>Deducciones autonómicas.</strong> Una deducción aplicable en tu comunidad puede reducir la cuota aunque no aparezca en la nómina. <em>Ejemplo: cumples los requisitos de una deducción autonómica que no se aplica mediante la retención mensual.</em></li>\n<li><strong>Aportaciones a sistemas de previsión.</strong> Una aportación con derecho a reducción puede cambiar la base liquidable; revisa las condiciones y límites vigentes. <em>Ejemplo: haces aportaciones individuales a un plan de pensiones que la empresa no conoce.</em></li>\n<li><strong>Ingresos inferiores a los previstos.</strong> Si trabajaste menos meses o cobraste menos variable, las retenciones pueden superar la cuota final. <em>Ejemplo: el contrato termina antes de acabar el año y no tienes otro empleo.</em></li>\n</ul>\n"
      },
      {
        "id": "ejemplo-con-dos-pagadores",
        "title": "Ejemplo con dos pagadores",
        "html": "<p>Si cambias de empresa a mitad de año, revisa por separado los certificados de retenciones de ambas. La declaración suma los ingresos y pagos a cuenta de los dos pagadores; no basta con mirar el último porcentaje de la nómina. El ejemplo numérico se completará con los resultados contrastados del simulador oficial de la AEAT.</p>\n"
      },
      {
        "id": "que-puedes-hacer-durante-el-ano",
        "title": "Qué puedes hacer durante el año",
        "html": "<ol>\n<li><strong>Comunica tus circunstancias.</strong> Entrega a tu empresa el <a href=\"https://sede.agenciatributaria.gob.es/Sede/procedimientos/G603.shtml\">modelo 145 de la AEAT</a> si procede y actualízalo cuando cambien los datos. Se entrega al pagador, no se presenta en la Agencia Tributaria.</li>\n<li><strong>Pide una retención mayor si lo necesitas.</strong> Si prevés un bonus, un cambio de empresa u otros ingresos, puedes solicitar por escrito un tipo superior para reducir la posibilidad de que los anticipos se queden cortos.</li>\n<li><strong>Guarda documentos.</strong> Conserva las nóminas y el certificado anual de retenciones de cada pagador. Comprueba en los datos fiscales que figuren todos los ingresos y pagos a cuenta.</li>\n</ol>\n"
      },
      {
        "id": "estas-obligado-a-declarar",
        "title": "¿Estás obligado a declarar?",
        "html": "<p>Los límites dependen del ejercicio y del tipo de renta. Para la <strong>declaración de Renta 2025, presentada en 2026</strong>, la AEAT indica estos límites principales para rendimientos del trabajo:</p>\n<ul>\n<li><strong>22.000 € anuales</strong>, como regla general si hay un solo pagador. Se mantiene el límite si hay varios pagadores cuando lo cobrado del segundo y restantes, ordenados por cuantía, no supera en conjunto <strong>1.500 €</strong>.</li>\n<li><strong>15.876 € anuales</strong> en ciertos supuestos, entre ellos varios pagadores cuando se supera el límite anterior, pensiones compensatorias, anualidades por alimentos no exentas o pagadores no obligados a retener.</li>\n<li>Si se obtienen exclusivamente las rentas indicadas por la AEAT, existen límites separados: <strong>1.600 €</strong> conjuntos para determinados rendimientos del capital mobiliario y ganancias sometidos a retención; <strong>1.000 €</strong> conjuntos para ciertas rentas imputadas y ayudas. También hay una regla de rentas totales de hasta <strong>1.000 €</strong> y pérdidas patrimoniales inferiores a <strong>500 €</strong> para los casos previstos por la AEAT.</li>\n</ul>\n<p>Hay excepciones importantes: las personas titulares del ingreso mínimo vital y quienes integran su unidad de convivencia deben declarar; también quienes hayan estado de alta como autónomos durante el ejercicio. Además, ejercitar determinados derechos a reducción o deducción —por ejemplo, aportaciones a sistemas de previsión social— puede implicar obligación. Estos límites no cubren todos los casos: consulta la página de <a href=\"https://sede.agenciatributaria.gob.es/Sede/Ayuda/25Presentacion/100/2.html\">obligación de declarar de la AEAT</a> y el <a href=\"https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a96\">artículo 96 de la Ley del IRPF</a> para el ejercicio aplicable. Tener una declaración a devolver no elimina por sí solo la obligación de presentarla.</p>\n"
      },
      {
        "id": "que-aporta-una-calculadora-de-sueldo-neto",
        "title": "Qué aporta una calculadora de sueldo neto",
        "html": "<p>La <a href=\"/sueldo-neto/\">calculadora de sueldo neto</a> estima el neto anual a partir de datos limitados; no predice la retención de cada nómina. En un ejemplo con 30.000 € brutos, su resultado orientativo no sustituye los certificados de dos empleadores ni incorpora automáticamente alquileres, deducciones autonómicas o todas las circunstancias familiares. La <a href=\"/como-se-calcula/\">metodología de CuentaClara</a> detalla sus supuestos. Para comparar bruto y neto, consulta también la guía de <a href=\"/guias/salario-bruto-neto/\">diferencia entre salario bruto y neto</a>.</p>\n"
      },
      {
        "id": "sobre-el-autor-y-revision",
        "title": "Sobre el autor y revisión",
        "html": "<blockquote>\n<p><strong>CuentaClara</strong> es un proyecto de <strong>Mario Galindo</strong>, que vive en <strong>Murcia, España</strong>. Para proponer una corrección o hacer una consulta, escribe a <strong><a href=\"mailto:cuentaclaracalc@gmail.com\">cuentaclaracalc@gmail.com</a></strong>.</p>\n</blockquote>\n<p><strong>Datos revisados: 20 de noviembre de 2026.</strong></p>\n"
      }
    ],
    "headings": [
      {
        "id": "de-la-nomina-a-la-declaracion-un-recorrido",
        "title": "De la nómina a la declaración: un recorrido"
      },
      {
        "id": "por-que-te-puede-salir-a-pagar",
        "title": "Por qué te puede salir a pagar"
      },
      {
        "id": "por-que-te-puede-salir-a-devolver",
        "title": "Por qué te puede salir a devolver"
      },
      {
        "id": "ejemplo-con-dos-pagadores",
        "title": "Ejemplo con dos pagadores"
      },
      {
        "id": "que-puedes-hacer-durante-el-ano",
        "title": "Qué puedes hacer durante el año"
      },
      {
        "id": "estas-obligado-a-declarar",
        "title": "¿Estás obligado a declarar?"
      },
      {
        "id": "que-aporta-una-calculadora-de-sueldo-neto",
        "title": "Qué aporta una calculadora de sueldo neto"
      },
      {
        "id": "sobre-el-autor-y-revision",
        "title": "Sobre el autor y revisión"
      }
    ],
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
    ],
    "relatedCalculators": [
      {
        "label": "Calculadora de sueldo neto",
        "url": "/sueldo-neto/"
      },
      {
        "label": "Cómo se calcula la estimación de sueldo neto",
        "url": "/como-se-calcula/"
      }
    ],
    "sources": [
      {
        "label": "Agencia Tributaria: retenciones",
        "url": "https://sede.agenciatributaria.gob.es/Sede/Retenciones.shtml"
      },
      {
        "label": "Agencia Tributaria: obligación de declarar (Renta 2025)",
        "url": "https://sede.agenciatributaria.gob.es/Sede/Ayuda/25Presentacion/100/2.html"
      },
      {
        "label": "Agencia Tributaria: modelo 145",
        "url": "https://sede.agenciatributaria.gob.es/Sede/procedimientos/G603.shtml"
      },
      {
        "label": "Ley del IRPF, artículo 99 (pagos a cuenta) (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a99"
      },
      {
        "label": "Ley del IRPF, artículo 96 (obligación de declarar) (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a96"
      },
      {
        "label": "Reglamento del IRPF: procedimiento general de retención (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6820#a80"
      }
    ]
  }
];
