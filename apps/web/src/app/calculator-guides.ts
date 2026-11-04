import type { Calculator } from './calculator-page';

export interface GuideExample {
    title: string;
    paragraphs: string[];
}

export interface GuideFaq {
    question: string;
    answer: string;
}

export interface CalculatorGuide {
    howTo: string[];
    examples: GuideExample[];
    faq: GuideFaq[];
}

export const calculatorGuides: Record<Calculator, CalculatorGuide> = {
    salary: {
        howTo: [
            'Elige si vas a introducir el salario bruto anual o el importe bruto de cada paga. Lo encuentras en tu contrato o en tu nómina.',
            'Indica en cuántas pagas se reparte tu sueldo: 12 o 14.',
            'Selecciona el tipo de contrato, indefinido o temporal.',
            'Completa tu situación personal: edad, hijos o descendientes que dan derecho al mínimo fiscal, discapacidad reconocida y si tienes otras rentas no exentas superiores a 6.500 € al año.',
            'Pulsa «Calcular sueldo neto». Verás el neto medio por paga, el neto anual y el desglose de Seguridad Social e IRPF.',
            'Si cambias algún dato después de calcular, el resultado se actualiza solo.'
        ],
        examples: [
            {
                title: 'Ejemplo: 30.000 € brutos anuales en 14 pagas',
                paragraphs: [
                    'Imagina un trabajador de 35 años, con contrato indefinido, sin hijos ni discapacidad y con un salario bruto de 30.000 € al año repartido en 14 pagas.',
                    'La calculadora estima unos 1.950 € de Seguridad Social (un 6,5 % del bruto) y unos 4.926 € de IRPF. El neto anual sería de unos 23.124 €, lo que equivale a unos 1.651,71 € por paga en 14 pagas, o a unos 1.927 € de media al mes. En total se queda en impuestos y cotizaciones cerca del 22,9 % del bruto.',
                    'Si el mismo sueldo se cobrara en 12 pagas, el neto anual no cambiaría: serían unos 1.927 € netos en cada una. Cambiar el número de pagas solo modifica cómo se reparte el dinero a lo largo del año, no cuánto cobras.'
                ]
            },
            {
                title: 'Ejemplo: contrato temporal frente a indefinido',
                paragraphs: [
                    'Con los mismos datos del ejemplo anterior y un contrato temporal, la calculadora estima unos 23.113,50 € netos al año, frente a 23.124 € con contrato indefinido.',
                    'La diferencia aproximada de 10,50 € al año se debe a la cotización por desempleo algo mayor del contrato temporal; el número de pagas no altera el neto anual.'
                ]
            }
        ],
        faq: [
            {
                question: '¿Qué diferencia hay entre cobrar en 12 o en 14 pagas?',
                answer: 'Ninguna en el total anual: el salario bruto y el neto del año son los mismos. Con 14 pagas cada una es más pequeña, pero cobras dos extras (normalmente en verano y Navidad). Con 12 pagas el dinero llega repartido de forma uniforme cada mes. El neto medio mensual coincide en ambos casos.'
            },
            {
                question: '¿Qué se descuenta del salario bruto?',
                answer: 'Dos cosas: las cotizaciones a la Seguridad Social y el IRPF. En la estimación, la Seguridad Social suma contingencias comunes (4,70 %), desempleo (1,55 % en contrato indefinido y 1,60 % en temporal), formación profesional (0,10 %) y el Mecanismo de Equidad Intergeneracional (0,15 %).'
            },
            {
                question: '¿Por qué con contrato temporal cobro algo menos?',
                answer: 'Porque la cotización por desempleo es ligeramente mayor en los contratos temporales (1,60 % frente a 1,55 %). Con 30.000 € brutos la diferencia es de unos 10,50 € netos al año.'
            },
            {
                question: '¿El IRPF que calcula es el mismo que me retiene mi empresa?',
                answer: 'No necesariamente. La calculadora estima el impuesto con la escala general y los datos que introduces. La retención de tu nómina la calcula tu empresa con tu situación a principios de año y puede ser distinta, sobre todo si cambia tu situación familiar o la normativa de tu comunidad autónoma. La diferencia se regulariza en la declaración de la renta.'
            },
            {
                question: '¿Cómo influyen los hijos en el sueldo neto?',
                answer: 'Los hijos que dan derecho al mínimo por descendientes aumentan el mínimo personal y familiar, y eso reduce el IRPF. Por ejemplo, con 36.000 € brutos y 2 hijos, el IRPF baja de unos 6.609 € a unos 5.640 €, es decir, unos 969 € netos más al año. Si el mínimo se comparte con la otra persona progenitora, el efecto se reparte a la mitad.'
            },
            {
                question: '¿Qué efecto tiene la discapacidad?',
                answer: 'Una discapacidad reconocida aumenta el mínimo personal y permite descontar gastos adicionales de la base del IRPF, y el efecto es mayor con un grado del 65 % o con movilidad reducida. Con 30.000 € brutos y un grado del 33 %, el neto anual sube de unos 23.124 € a unos 24.744 €.'
            },
            {
                question: '¿Qué pasa si mi salario supera la base máxima de cotización?',
                answer: 'La cotización ordinaria se calcula solo hasta la base máxima (unos 61.214 € al año en esta herramienta). Por encima de ese tope se aplica la cuota de solidaridad, un porcentaje pequeño sobre el exceso que la calculadora también incluye.'
            },
            {
                question: '¿Qué conceptos no incluye?',
                answer: 'No incluye retribución en especie, pluses, deducciones autonómicas, aportaciones a planes de pensiones, pagos de hipoteca ni otras deducciones personales. Es una estimación para comparar y planificar, no sustituye a tu nómina ni a tu declaración de la renta.'
            }
        ]
    },

    mortgage: {
        howTo: [
            'Introduce el precio de la vivienda y el porcentaje que aportas como entrada. La calculadora resta la entrada para saber cuánto capital financias.',
            'Indica el interés anual (TIN) que te ofrece el banco y el plazo en años, de 1 a 50.',
            'Elige el sistema de amortización. Si dudas, deja el francés, que es el más habitual.',
            'Pulsa «Calcular hipoteca» y consulta la cuota mensual, los intereses totales y el total pagado.',
            'Mira el gráfico y despliega la tabla por años para ver cuánto de lo que pagas cada año es capital y cuánto son intereses.'
        ],
        examples: [{
            title: 'Ejemplo: hipoteca de 192.000 € a 25 años',
            paragraphs: [
                'Imagina un piso de 240.000 € con una entrada del 20 % (48.000 €). Financias 192.000 € a un TIN del 3,2 % durante 25 años.',
                'Con el sistema francés pagarías una cuota constante de unos 931 € al mes. En total devolverías unos 279.175 €, de los que unos 87.175 € son intereses.',
                'En el primer año pagas unos 11.167 €: 6.070 € son intereses y solo 5.097 € amortizan capital. En el último año ocurre lo contrario, con 10.976 € de capital y 191 € de intereses. Por eso al principio parece que la deuda baja muy despacio.',
                'Con el sistema español la primera cuota sería de unos 1.152 € y la última de unos 642 €. Los intereses totales bajarían a unos 77.056 €, es decir, unos 10.119 € menos que en el francés, a cambio de empezar pagando bastante más cada mes.'
            ]
        }],
        faq: [
            {
                question: '¿Qué diferencia hay entre el sistema francés y el español?',
                answer: 'En el francés la cuota es constante: al principio la mayor parte son intereses y con el tiempo pesa más el capital. En el español se amortiza el mismo capital cada mes, así que la cuota baja con el tiempo; la primera es más alta y los intereses totales, menores.'
            },
            {
                question: '¿Por qué pago tantos intereses al principio?',
                answer: 'Porque los intereses se calculan sobre el capital que todavía debes, y ese capital es máximo al empezar. A medida que amortizas, el interés de cada mes disminuye.'
            },
            {
                question: '¿Qué es el TIN?',
                answer: 'Es el tipo de interés nominal anual: solo el interés del préstamo, sin comisiones ni otros gastos. La TAE sí los incluye y sirve para comparar ofertas.'
            },
            {
                question: '¿Puedo usarla con una hipoteca variable?',
                answer: 'Solo como estimación con un tipo fijo hipotético. En una hipoteca variable la cuota cambia en cada revisión según el Euríbor, así que el resultado real será distinto.'
            },
            {
                question: '¿Qué gastos no incluye?',
                answer: 'No incluye comisiones, seguros, impuestos, tasación ni gastos de compraventa. Una oferta real puede usar tipos, condiciones o calendarios diferentes.'
            }
        ]
    },

    pension: {
        howTo: [
            'Indica tu edad actual y los años que llevas cotizados. Los años cotizados no pueden superar los transcurridos desde que cumpliste 16.',
            'Escribe la edad a la que prevés jubilarte.',
            'Introduce la base media mensual de cotización. No es lo que pagas de cuota, sino la base mensual que aparece en tu informe de cotización.',
            'Si quieres, añade los complementos opcionales: hijos para simular el complemento por brecha de género o el posible complemento a mínimos.',
            'Pulsa «Estimar pensión» para ver una cuantía bruta orientativa en 14 pagas.'
        ],
        examples: [{
            title: 'Ejemplo: jubilación a los 65 años con 40 años cotizados',
            paragraphs: [
                'Imagina una persona de 40 años que lleva 15 años cotizados, piensa jubilarse a los 65, tiene una base media de cotización de 2.200 € al mes y 2 hijos.',
                'Al jubilarse habría cotizado 40 años, y se jubilaría en torno a 2051. Como supera los 38,5 años exigidos, podría jubilarse a los 65 sin penalización. Con 40 años cotizados se alcanza el 100 % de la base reguladora. La calculadora estima una base reguladora de unos 1.886 €, así que la pensión bruta sería de unos 1.886 € al mes en 14 pagas, es decir, unos 26.400 € al año.',
                'Si además se simula el complemento por brecha de género, con 2 hijos se sumarían unos 73,80 € al mes, hasta unos 1.960 € brutos mensuales.',
                'Si la misma persona retrasara su jubilación hasta los 67 años, tendría 42 años cotizados y 2 años de demora sobre la edad ordinaria. Eso añade un incentivo del 8 % y la pensión subiría a unos 2.037 € brutos al mes, unos 28.512 € al año.'
            ]
        }],
        faq: [
            {
                question: '¿Es la pensión que cobraré realmente?',
                answer: 'No, es una estimación orientativa. La calculadora parte de una única base media de cotización que tú introduces. La pensión oficial se calcula con tus bases mensuales reales de los últimos años y compara varios métodos legales, así que el resultado real puede ser distinto. Para una cifra precisa, consulta a la Seguridad Social.'
            },
            {
                question: '¿Cuántos años necesito cotizar para tener derecho a pensión?',
                answer: 'Como mínimo 15 años. Con ese mínimo se cobra el 50 % de la base reguladora, y el porcentaje va subiendo con cada mes adicional hasta alcanzar el 100 % con unos 36 años y 6 meses cotizados según el calendario de 2026. La calculadora usa ese calendario como referencia y lo actualizará cuando cambien las reglas.'
            },
            {
                question: '¿A qué edad puedo jubilarme sin penalización?',
                answer: 'A los 65 años si acreditas al menos 38 años y 6 meses cotizados (38 años y 3 meses si te jubilas en 2026). Si no llegas a ese periodo, la edad ordinaria es de 67 años (66 años y 10 meses en 2026).'
            },
            {
                question: '¿Qué pasa si retraso la jubilación?',
                answer: 'Cada año completo que pospones la jubilación más allá de la edad ordinaria suma un 4 % a la pensión. La calculadora cuenta años completos de demora, así que los meses sueltos no se tienen en cuenta.'
            },
            {
                question: '¿Qué base de cotización debo introducir?',
                answer: 'La media mensual de las bases de cotización que figuran en tu informe de bases de cotización de la Seguridad Social, no el importe que pagas de cuota. Una base más alta o más baja en los últimos años de tu carrera cambia mucho la pensión estimada.'
            },
            {
                question: '¿Cómo se simula el complemento por hijos?',
                answer: 'La calculadora lo trata como un importe fijo por hijo (36,90 € al mes en 14 pagas, hasta 4 hijos). El derecho real depende de tu situación y de quién de los progenitores lo solicite, así que úsalo solo como referencia.'
            },
            {
                question: '¿Qué es el complemento a mínimos?',
                answer: 'Es una ayuda que eleva las pensiones contributivas más bajas hasta una cuantía mínima, siempre que los ingresos y la situación familiar cumplan los límites establecidos. La calculadora solo estima un importe con los datos de 2026 y, para años futuros, indica si sería posible sin proyectar cuantías.'
            },
            {
                question: '¿Hay un límite máximo de pensión?',
                answer: 'Sí. La pensión contributiva está limitada a una cuantía máxima anual (47.034,40 € brutos en esta herramienta, en 14 pagas). Si el cálculo la supera, la calculadora aplica ese tope.'
            },
            {
                question: '¿El resultado es bruto o neto?',
                answer: 'Es bruto, antes de impuestos. Las pensiones tributan como rendimientos del trabajo en el IRPF, por lo que el importe que ingreses cada mes dependerá de tu retención.'
            }
        ]
    },

    'compound-interest': {
        howTo: [
            'Introduce el capital inicial con el que empiezas. Puede ser cero si solo vas a hacer aportaciones.',
            'Indica cuánto aportarás al final de cada mes.',
            'Escribe una rentabilidad anual nominal hipotética. Es un supuesto de cálculo, no una promesa de rendimiento.',
            'Fija el plazo en años, de 1 a 100.',
            'Pulsa «Calcular proyección». Verás el capital final, lo aportado, los intereses estimados y un gráfico con la evolución año a año.'
        ],
        examples: [
            {
                title: 'Ejemplo: 5.000 € iniciales y 200 € al mes durante 20 años',
                paragraphs: [
                    'Imagina que empiezas con 5.000 €, aportas 200 € al final de cada mes y supones una rentabilidad anual nominal del 6 % durante 20 años.',
                    'En total habrás aportado 53.000 €: los 5.000 € iniciales más 48.000 € en cuotas mensuales. El capital final estimado sería de unos 108.959 €, de los que unos 55.959 € serían intereses.',
                    'A los 10 años tendrías unos 41.873 € habiendo aportado 29.000 €, es decir, unos 12.873 € de intereses. En la segunda mitad del plazo se generan unos 43.086 € de intereses, más del triple. Es el efecto del interés compuesto: los intereses ya ganados empiezan a generar sus propios intereses, y por eso el tiempo pesa más que el importe de cada aportación.'
                ]
            },
            {
                title: 'Ejemplo: empezar sin capital inicial',
                paragraphs: [
                    'También puedes empezar desde cero. Si aportas 100 € al final de cada mes durante 10 años y supones una rentabilidad nominal del 5 % anual, habrás aportado 12.000 €.',
                    'La proyección estima un capital final de unos 15.528 €, incluidos unos 3.528 € de intereses. Es una simulación constante: no contempla cambios de rentabilidad, comisiones, impuestos ni inflación.'
                ]
            }
        ],
        faq: [
            {
                question: '¿Qué es el interés compuesto?',
                answer: 'Es el que se calcula sobre el capital acumulado, que incluye los intereses ya generados. Así, cada mes los intereses producen a su vez nuevos intereses, y el crecimiento se acelera con el paso del tiempo.'
            },
            {
                question: '¿Cuándo se aplican las aportaciones mensuales?',
                answer: 'La calculadora supone que cada aportación se hace al final del mes, así que ese mes aún no genera intereses. Si aportas a principio de mes, el resultado real será algo superior.'
            },
            {
                question: '¿Cómo se capitalizan los intereses?',
                answer: 'Mensualmente. La rentabilidad anual nominal se divide entre 12 y se aplica cada mes, por lo que la rentabilidad efectiva anual es ligeramente mayor que la nominal. Con un 6 % nominal, la efectiva es de aproximadamente el 6,17 %.'
            },
            {
                question: '¿Qué rentabilidad debo poner?',
                answer: 'Es un supuesto, no una previsión. Ninguna inversión garantiza una rentabilidad constante: los mercados suben y bajan, y los depósitos o cuentas remuneradas suelen ofrecer menos. Conviene probar varios escenarios, por ejemplo uno prudente y otro optimista.'
            },
            {
                question: '¿Incluye impuestos, comisiones o inflación?',
                answer: 'No. El resultado es bruto y está expresado en euros nominales. Los impuestos sobre las ganancias, las comisiones del producto y la pérdida de poder adquisitivo por la inflación reducirían el valor real del capital final.'
            },
            {
                question: '¿Qué pesa más: aportar más o empezar antes?',
                answer: 'Empezar antes suele pesar más cuando el plazo es largo, porque el capital tiene más tiempo para generar intereses sobre intereses. Puedes comprobarlo cambiando el plazo y la aportación y comparando los resultados.'
            },
            {
                question: '¿Puedo usarla para un plan de pensiones, un fondo indexado o un depósito?',
                answer: 'Sí, como proyección orientativa con una rentabilidad media hipotética. Los productos reales tienen rentabilidades variables, comisiones y fiscalidad propias que esta herramienta no refleja.'
            }
        ]
    },

    severance: {
        howTo: [
            'Introduce tu salario bruto anual incluyendo las pagas extra.',
            'Indica los días trabajados pendientes de cobrar y los días de vacaciones que no has disfrutado.',
            'Si hay pagas extra devengadas pendientes, escribe el importe bruto que figura en la nómina o el convenio.',
            'Selecciona la fecha de inicio del contrato y la de fin. En caso de fallecimiento, la fecha de fin es la del fallecimiento.',
            'Elige la causa de extinción: despido objetivo o improcedente, baja voluntaria, fin de contrato temporal o fallecimiento.',
            'Pulsa «Estimar cantidades». El resultado separa el finiquito, que son las cantidades ya devengadas, de la indemnización. La baja voluntaria no genera indemnización; el fin de contrato temporal se estima, como regla general, a 12 días por año trabajado.'
        ],
        examples: [
            {
                title: 'Ejemplo: despido objetivo o improcedente',
                paragraphs: [
                    'Imagina un salario bruto anual de 30.000 €, cuatro años trabajados y 8 días de salario pendientes, 12 días de vacaciones sin disfrutar y 500 € de pagas extra pendientes. El finiquito estimado sería de unos 2.144 € brutos.',
                    'Si la extinción es un despido objetivo, la indemnización estimada sería de 80 días, unos 6.575 €, para un total de unos 8.719 €. Si se trata de un despido improcedente posterior al 12/02/2012, serían 132 días, unos 10.849 €, y unos 12.993 € en total. Son escenarios alternativos: la calculadora no determina la calificación legal del despido.'
                ]
            },
            {
                title: 'Ejemplo: baja voluntaria',
                paragraphs: [
                    'Con el mismo salario y cantidades pendientes del ejemplo anterior, el finiquito seguiría siendo de unos 2.144 € brutos.',
                    'La indemnización sería de 0 €, así que el total estimado coincide con el finiquito. El posible preaviso que haya que dar depende del convenio o contrato.'
                ]
            },
            {
                title: 'Ejemplo: fin de contrato temporal',
                paragraphs: [
                    'Para un salario anual de 30.000 € y un año trabajado, la regla general de 12 días por año da una indemnización orientativa de unos 986 € brutos, antes de sumar cualquier finiquito pendiente.',
                    'Algunos contratos y supuestos están excluidos legalmente de esta indemnización, como los contratos formativos o de sustitución. Comprueba el tipo de contrato y el convenio aplicable.'
                ]
            },
            {
                title: 'Ejemplo: finiquito por fallecimiento',
                paragraphs: [
                    'Imagina un trabajador con un salario bruto de 30.000 € al año que fallece con 10 días de salario pendientes de cobrar y 12 días de vacaciones sin disfrutar, sin pagas extra pendientes.',
                    'Con la causa «Fallecimiento» la calculadora estima unos 822 € de salario pendiente y unos 986 € de vacaciones, es decir, un finiquito de unos 1.808 € brutos. La indemnización es de 0 €, porque la muerte extingue el contrato pero no es un despido.'
                ]
            }
        ],
        faq: [
            {
                question: '¿Hay indemnización si el trabajador fallece?',
                answer: 'No por despido: el fallecimiento extingue el contrato, pero no es un despido. Se liquidan las cantidades ya devengadas. Algunos convenios colectivos o seguros contratados por la empresa pueden prever una cuantía aparte, así que conviene revisar el convenio aplicable.'
            },
            {
                question: '¿Quién cobra el finiquito?',
                answer: 'Los herederos o derechohabientes del trabajador. Suelen pedir el certificado de defunción, el certificado de últimas voluntades y documentación que acredite quiénes son los herederos.'
            },
            {
                question: '¿Qué conceptos se incluyen?',
                answer: 'El salario pendiente hasta el día del fallecimiento, las vacaciones devengadas y no disfrutadas, la parte proporcional de las pagas extra si no estaban prorrateadas y otros conceptos que fije el convenio.'
            },
            {
                question: '¿La pensión de viudedad o de orfandad forma parte del finiquito?',
                answer: 'No. Son prestaciones de la Seguridad Social que se solicitan por separado y no se calculan en esta herramienta.'
            },
            {
                question: '¿Cómo calculo un finiquito por fallecimiento con esta herramienta?',
                answer: 'Elige la causa «Fallecimiento del trabajador», pon como fecha de fin la del fallecimiento e introduce los días y las cantidades pendientes. La indemnización saldrá a 0 € y el total coincidirá con el finiquito.'
            },
            {
                question: '¿Me corresponde indemnización si dimito o pido la baja voluntaria?',
                answer: 'No. La baja voluntaria no genera indemnización, aunque sí corresponde liquidar el salario y demás cantidades devengadas pendientes, incluidas las vacaciones no disfrutadas y pagas extra pendientes. Comprueba también el preaviso previsto en tu convenio o contrato.'
            },
            {
                question: '¿Qué indemnización se cobra al terminar un contrato temporal?',
                answer: 'Como regla general, 12 días de salario por año trabajado, prorrateados por el tiempo de servicio. Hay contratos y supuestos excluidos legalmente —como los contratos formativos o de sustitución—, por lo que el resultado es orientativo y debe comprobarse el tipo de contrato y el convenio aplicable.'
            }
        ]
    },

    'personal-loan': {
        howTo: [
            'Introduce el importe solicitado y el TIN anual que te ofrece la entidad.',
            'Indica el plazo en años y, si hace falta, meses adicionales. El plazo total debe estar entre 1 y 600 meses.',
            'Elige el sistema de amortización. Si dudas, deja el francés, el más habitual en préstamos personales.',
            'Añade la comisión de apertura, otros gastos iniciales y cualquier coste mensual adicional, como un seguro. Se muestran por separado y no se suman al capital financiado.',
            'Pulsa «Calcular préstamo». Verás la cuota, los intereses, el coste total y lo que sale realmente de tu bolsillo.',
            'Usa el comparador de tipos para ver cómo cambiaría el coste con un TIN un punto por debajo o por encima, y despliega la tabla de amortización para ver cada cuota.'
        ],
        examples: [{
            title: 'Ejemplo: préstamo de 10.000 € a 5 años',
            paragraphs: [
                'Imagina un préstamo de 10.000 € a un TIN del 8,5 % durante 5 años (60 cuotas) y una comisión de apertura del 1,5 %.',
                'Con el sistema francés pagarías una cuota constante de unos 205,17 € al mes. Los intereses totales serían de unos 2.309,87 € y la comisión de apertura, 150 €, que se paga aparte. El coste total de la financiación sería de unos 2.459,87 € y lo que sale de tu bolsillo, unos 12.459,87 €.',
                'Con el sistema español la primera cuota sería de unos 237,50 € y la última de unos 167,65 €, con unos 2.160,36 € de intereses.'
            ]
        }],
        faq: [
            {
                question: '¿Qué diferencia hay entre TIN y TAE?',
                answer: 'El TIN es solo el interés nominal. La TAE incluye además comisiones y otros gastos, y permite comparar ofertas. Esta calculadora trabaja con el TIN y no calcula la TAE.'
            },
            {
                question: '¿Cómo afecta la comisión de apertura?',
                answer: 'Se calcula sobre el importe solicitado y se paga aparte, así que aumenta el coste total pero no se suma al capital ni a la cuota.'
            },
            {
                question: '¿Qué muestra el comparador de tipos?',
                answer: 'Tres escenarios con el mismo importe, plazo y costes: un TIN un punto por debajo del tuyo, el tuyo y uno un punto por encima. Son escenarios matemáticos, no ofertas bancarias.'
            },
            {
                question: '¿Por qué la última cuota puede variar unos céntimos?',
                answer: 'Porque cada cuota se redondea al céntimo y la última se ajusta para cancelar exactamente el saldo pendiente.'
            }
        ]
    }
};