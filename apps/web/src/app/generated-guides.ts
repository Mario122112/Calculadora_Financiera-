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
    "leadHtml": "<p>La retención de IRPF que aparece en la nómina suele confundirse con «el impuesto que pago». En realidad, son momentos distintos de un mismo proceso. Durante el año, la empresa descuenta e ingresa cantidades a cuenta. Después, la declaración anual determina el resultado que corresponde según las rentas, circunstancias y reglas del ejercicio completo.</p>\n<p>La diferencia explica por qué puede salir a devolver o a ingresar incluso si la nómina tuvo retenciones todos los meses. Para verlo con claridad, sigamos tres momentos: el cálculo de cada anticipo, el cierre del ejercicio y la liquidación anual.</p>\n",
    "sections": [
      {
        "id": "primer-momento-la-empresa-calcula-pagos-a-cuenta",
        "title": "Primer momento: la empresa calcula pagos a cuenta",
        "html": "<p>La empresa que paga rendimientos del trabajo puede estar obligada a practicar retención e ingresarla a la Administración tributaria. La Ley del IRPF trata las retenciones como pagos a cuenta del impuesto, no como una declaración completa de la persona trabajadora. El procedimiento reglamentario determina cómo se calcula el porcentaje aplicable a cada pago.</p>\n<p>El cálculo de nómina utiliza información sobre remuneración prevista y circunstancias personales que se comunican al pagador. No equivale simplemente a tomar la escala del IRPF y aplicarla al sueldo de ese mes. Influyen, entre otros elementos, la remuneración anual prevista, la duración de la relación laboral, los datos personales relevantes y las reglas de cálculo del ejercicio.</p>\n<p>Una retención es un anticipo. Si una persona recibe 2.000 euros brutos en un pago y su nómina descuenta 300 euros como retención, esos 300 euros se ingresan como pago a cuenta. La operación no declara que su impuesto anual definitivo vaya a ser exactamente 300 euros, ni que cada paga siguiente deba repetir necesariamente esa cantidad.</p>\n<p>La retención puede revisarse si cambia lo que se prevé pagar o si se actualizan circunstancias comunicadas. Por eso, al cambiar de empleo, cobrar una parte variable o atravesar una modificación personal, conviene comprobar que los datos usados por el pagador siguen siendo correctos. La guía no reemplaza el procedimiento oficial: la AEAT publica para cada ejercicio el servicio y la documentación aplicables.</p>\n"
      },
      {
        "id": "segundo-momento-se-cierra-el-ejercicio",
        "title": "Segundo momento: se cierra el ejercicio",
        "html": "<p>Al terminar el año, el importe realmente cobrado puede no coincidir con la previsión usada para calcular las retenciones. Puede haber cambios de salario, periodos sin empleo, pagos variables, varios pagadores o ingresos de otras clases. Cada pagador ha ingresado anticipos según la información de la que disponía, pero el impuesto anual considera el conjunto que deba declararse.</p>\n<p>La diferencia esencial es el ámbito. La nómina mira un pago y una relación con el pagador; la declaración reúne las rentas y circunstancias del contribuyente durante el ejercicio. La cuota anual puede incluir componentes estatales y autonómicos y tener en cuenta elementos que no aparecen en la nómina. Por ello, un porcentaje retenido sobre el sueldo no representa necesariamente el tipo efectivo final.</p>\n<p>Imagina que una persona tiene dos empleos sucesivos. Cada empresa puede calcular sus pagos a cuenta a partir de la retribución que prevé pagar ella misma. Al sumar el año, los ingresos y los anticipos de ambos periodos se consideran conjuntamente en la declaración que corresponda. Ninguna nómina aislada contiene por sí sola el resultado total.</p>\n"
      },
      {
        "id": "tercer-momento-la-declaracion-compara-cuota-y-anticipos",
        "title": "Tercer momento: la declaración compara cuota y anticipos",
        "html": "<p>La declaración anual calcula el resultado de acuerdo con las reglas aplicables a las rentas y circunstancias de ese ejercicio. Después se tienen en cuenta, entre otros conceptos, los pagos a cuenta ya soportados. De manera simplificada:</p>\n<blockquote>\n<p><strong>Resultado de la declaración = cuota anual que corresponde − pagos a cuenta realizados</strong></p>\n</blockquote>\n<p>Si los pagos a cuenta superan la cuota anual, puede quedar una cantidad a devolver. Si son inferiores, puede resultar una cantidad a ingresar. Esta resta explica el signo del resultado, pero no sustituye las casillas ni las reglas de la declaración real.</p>\n<p>Una devolución no es una bonificación automática ni una prueba de que una empresa haya cometido un error. Puede indicar que durante el año se anticipó más de lo que resultó al cerrar el cálculo, pero también influyen otros elementos declarados. Del mismo modo, tener retenciones en todas las nóminas no garantiza una devolución: el total ingresado puede quedar por debajo de la cuota anual.</p>\n"
      },
      {
        "id": "un-ejemplo-numerico-sin-convertirlo-en-una-regla-fiscal",
        "title": "Un ejemplo numérico sin convertirlo en una regla fiscal",
        "html": "<p>Tomemos ahora un caso distinto: 36.000 euros brutos al año en doce pagas, 35 años, contrato indefinido, sin descendientes ni discapacidad y sin otras rentas no exentas por encima del umbral del formulario. Con esos datos, el modelo actual de CuentaClara estima 2.340 euros de cotización, 6.609 euros de IRPF y 27.051 euros netos al año, es decir, un promedio de 2.254,25 euros al mes.</p>\n<p>Los 6.609 euros de IRPF son la salida de una aproximación simplificada, no el resultado de una declaración oficial ni el cálculo de la retención de una nómina concreta. La herramienta resta una estimación anual al salario para ilustrar el neto; no calcula cuánto debe retener el empleador en cada una de las doce nóminas.</p>\n<p>Para entender la diferencia aritmética, supongamos solo a efectos didácticos que a lo largo del año se ingresan 6.000 euros a cuenta. Si la cuota anual real fuese 6.609 euros, la resta simplificada daría 609 euros por ingresar. Si se hubieran anticipado 7.000 euros y esa misma cuota anual correspondiese, la diferencia sería de 391 euros a devolver. Los importes son hipótesis para explicar el mecanismo, no tipos legales ni una previsión de tu declaración.</p>\n<p>En un caso real no se debe reemplazar la cuota por la salida de esta calculadora ni tratar una devolución como ahorro ganado. La declaración puede considerar más rentas, deducciones, pagos a cuenta y datos personales. El ejemplo muestra únicamente por qué el anticipo y el resultado final no tienen que coincidir.</p>\n"
      },
      {
        "id": "como-comprobar-una-discrepancia-de-forma-ordenada",
        "title": "Cómo comprobar una discrepancia de forma ordenada",
        "html": "<p>Si el neto de una nómina no coincide con lo que esperabas, empieza por comparar conceptos equivalentes. Revisa el bruto devengado, las cotizaciones, la retención de IRPF y las deducciones adicionales. Después contrasta las pagas extra, los días trabajados y los conceptos variables con el contrato y el calendario.</p>\n<p>Si cambia el porcentaje de retención, pregunta qué previsión o dato ha cambiado. Guarda las nóminas y el certificado de retenciones anual. Este certificado reúne información útil para preparar la declaración y comparar los pagos a cuenta; no sustituye la revisión del borrador ni confirma por sí solo que todas las rentas estén incluidas.</p>\n<p>En la declaración, comprueba los datos fiscales, los pagadores y los pagos a cuenta antes de confirmar. Si falta un pagador, un ingreso o una circunstancia personal, la cifra sugerida puede necesitar revisión. La obligación de presentar declaración y el resultado son cuestiones distintas: un resultado a devolver no determina por sí mismo si había obligación de presentarla.</p>\n"
      },
      {
        "id": "que-muestra-y-que-no-muestra-cuentaclara",
        "title": "Qué muestra y qué no muestra CuentaClara",
        "html": "<p>La <a href=\"/sueldo-neto/\">calculadora de sueldo neto</a> estima el neto anual a partir de un conjunto limitado de datos. Para hacerlo, calcula componentes aproximados de cotización e IRPF y distribuye el resultado en el número de pagas indicado. No ejecuta el algoritmo de retenciones de la AEAT ni predice cada línea de una nómina.</p>\n<p>La <a href=\"/como-se-calcula/\">metodología de cálculo</a> detalla las fórmulas y límites de ese modelo. Para una retención de nómina o una liquidación anual, utiliza los servicios de la Agencia Tributaria y las normas oficiales del ejercicio correspondiente. Si hay varios pagadores, ingresos adicionales o una situación fiscal no estándar, una estimación de salario neto no puede resolver el caso completo.</p>\n"
      }
    ],
    "headings": [
      {
        "id": "primer-momento-la-empresa-calcula-pagos-a-cuenta",
        "title": "Primer momento: la empresa calcula pagos a cuenta"
      },
      {
        "id": "segundo-momento-se-cierra-el-ejercicio",
        "title": "Segundo momento: se cierra el ejercicio"
      },
      {
        "id": "tercer-momento-la-declaracion-compara-cuota-y-anticipos",
        "title": "Tercer momento: la declaración compara cuota y anticipos"
      },
      {
        "id": "un-ejemplo-numerico-sin-convertirlo-en-una-regla-fiscal",
        "title": "Un ejemplo numérico sin convertirlo en una regla fiscal"
      },
      {
        "id": "como-comprobar-una-discrepancia-de-forma-ordenada",
        "title": "Cómo comprobar una discrepancia de forma ordenada"
      },
      {
        "id": "que-muestra-y-que-no-muestra-cuentaclara",
        "title": "Qué muestra y qué no muestra CuentaClara"
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
        "answer": "No en este caso: CuentaClara estima una cuota anual simplificada para obtener un neto orientativo. No reproduce el procedimiento de retenciones de la AEAT ni conoce todos los datos de tu nómina y situación fiscal."
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
        "label": "Ley del IRPF, artículo 99 (pagos a cuenta) (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2006-20764#a99"
      },
      {
        "label": "Reglamento del IRPF: procedimiento general de retención (BOE)",
        "url": "https://www.boe.es/buscar/act.php?id=BOE-A-2007-6820#a80"
      }
    ]
  }
];
