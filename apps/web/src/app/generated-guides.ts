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
