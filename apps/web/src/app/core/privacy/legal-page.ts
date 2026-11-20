import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { methodologyPage } from './methodology-content';
import { CanonicalLink } from '../../seo/canonical-link.directive';

type LegalPageId = 'legal' | 'privacy' | 'contact' | 'methodology' | 'about';

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalLink {
  label: string;
  url: string;
}

interface LegalSection {
  heading: string;
  paragraphs: string[];
  links?: LegalLink[];
}

interface LegalPageContent {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
  isContact?: boolean;
}

const legalPages: Record<LegalPageId, LegalPageContent> = {
  legal: {
    eyebrow: 'INFORMACIÓN DEL SITIO',
    title: 'Aviso legal',
    introduction: 'Información sobre la titularidad, el uso y las condiciones del sitio.',
    sections: [
      {
        heading: 'Titular e identificación',
        paragraphs: [
          'Titular del sitio: Mario Galindo.',
          'Ubicación: Murcia, España.',
          'Correo de contacto: cuentaclaracalc@gmail.com.',
          'CuentaClara es el nombre del sitio. La información sobre publicidad y tratamiento de datos se detalla en la política de privacidad.'
        ]
      },
      {
        heading: 'Uso de las calculadoras',
        paragraphs: [
          'Las herramientas ofrecen estimaciones orientativas a partir de los datos introducidos. No constituyen asesoramiento financiero, fiscal, laboral ni jurídico, ni una oferta de financiación.',
          'Comprueba las condiciones oficiales y los resultados antes de tomar decisiones.'
        ]
      },
      {
        heading: 'Exclusión de responsabilidad',
        paragraphs: [
          'Las normas fiscales, laborales y de Seguridad Social cambian con frecuencia y dependen de circunstancias personales que las calculadoras no recogen. No se garantiza que los resultados sean exactos o estén actualizados.',
          'El titular no se hace responsable de las decisiones tomadas a partir de los resultados, ni de interrupciones o errores en el funcionamiento del sitio.'
        ]
      },
      {
        heading: 'Propiedad intelectual',
        paragraphs: [
          'El diseño, el código y los textos de este sitio pertenecen a su titular, salvo indicación contraria. No se permite su reproducción o distribución sin autorización.'
        ]
      },
      {
        heading: 'Publicidad y modificaciones',
        paragraphs: [
          'El sitio carga el código de Google AdSense. Google y otros proveedores publicitarios pueden utilizar cookies o tecnologías similares según la configuración del servicio y las preferencias de la persona usuaria. Consulta la política de privacidad.',
          'El aviso puede modificarse si cambian la titularidad, el alojamiento, la actividad del sitio o la normativa aplicable.'
        ]
      },
      {
        heading: 'Legislación aplicable',
        paragraphs: [
          'Este aviso se rige por la legislación española. Si eres consumidor, te corresponde el fuero que establezca la normativa vigente.',
          'Este aviso puede modificarse para adaptarlo a cambios legales o del sitio.'
        ]
      }
    ]
  },
  privacy: {
    eyebrow: 'DATOS Y PRIVACIDAD',
    title: 'Política de privacidad',
    introduction: 'Información sobre los datos tratados por CuentaClara, el formulario de contacto, el alojamiento y la publicidad de terceros.',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        paragraphs: [
          'Responsable: Mario Galindo.',
          'Ubicación: Murcia, España.',
          'Correo de contacto: cuentaclaracalc@gmail.com.'
        ]
      },
      {
        heading: 'Datos introducidos en las calculadoras',
        paragraphs: [
          'Los cálculos se realizan en tu navegador y la aplicación no envía los valores introducidos en las calculadoras a un servidor de CuentaClara.',
          'El proveedor de alojamiento puede tratar datos técnicos de conexión necesarios para servir la web, como la dirección IP, información del navegador y registros de solicitudes, conforme a su configuración y política.',
          'El sitio carga el código de Google AdSense. Google y sus proveedores publicitarios pueden recibir datos técnicos e identificadores del dispositivo o del navegador y tratar información relacionada con la publicación, personalización o medición de anuncios, de acuerdo con la configuración del servicio y las preferencias registradas.'
        ]
      },
      {
        heading: 'Formulario de contacto',
        paragraphs: [
          'Si envías el formulario, se transmiten tu nombre, correo electrónico y mensaje a Formspree para que lo reenvíe al correo de CuentaClara. La finalidad es atender la consulta; el formulario solicita que confirmes que has leído esta política.',
          'No incluyas información financiera, fiscal ni otros datos sensibles en el mensaje.'
        ]
      },
      {
        heading: 'Finalidades, base jurídica y destinatarios',
        paragraphs: [
          'Los datos del formulario se utilizan para responder a la consulta.',
          'En el sitio intervienen Formspree para el formulario, Google para el correo y AdSense, y el proveedor de alojamiento.',
          'Google y sus proveedores publicitarios pueden tratar datos para mostrar y medir anuncios, según la configuración del servicio.'
        ]
      },
      {
        heading: 'Derechos',
        paragraphs: [
          'Puedes ejercer los derechos que correspondan en materia de protección de datos escribiendo a cuentaclaracalc@gmail.com. También puedes presentar una reclamación ante la Agencia Española de Protección de Datos.'
        ]
      },
      {
        heading: 'Cookies y publicidad',
        paragraphs: [
          'Las calculadoras no necesitan enviar los valores que introduces a CuentaClara. Sin embargo, el código de Google AdSense puede utilizar cookies o tecnologías similares para publicar y medir anuncios, limitar su frecuencia y, según la configuración del servicio, personalizar la publicidad.'
        ]
      }
    ]
  },
  about: {
    eyebrow: 'CUENTACLARA',
    title: 'Sobre nosotros',
    introduction: 'Quién desarrolla CuentaClara, cómo se preparan sus estimaciones y cómo se mantienen los contenidos.',
    sections: [
      {
        heading: 'Quién está detrás',
        paragraphs: [
          'CuentaClara es un proyecto de Mario Galindo, que vive en Murcia, España.',
          'Para contactar, proponer una corrección o enviar una sugerencia, escribe a cuentaclaracalc@gmail.com.'
        ]
      },
      {
        heading: 'Cómo elaboramos las herramientas',
        paragraphs: [
          'Las calculadoras ofrecen estimaciones y publican sus supuestos, limitaciones y fórmulas en la página «Cómo se calcula». Los resultados pueden diferir de los cálculos oficiales porque simplifican datos y circunstancias individuales.',
          'No presentamos las estimaciones como asesoramiento financiero, fiscal, laboral o jurídico. Para decisiones importantes, contrasta el resultado con la fuente oficial o con un profesional.'
        ],
        links: [{ label: 'Cómo se calcula', url: '/como-se-calcula/' }]
      },
      {
        heading: 'Actualización y correcciones',
        paragraphs: [
          'Las fechas de actualización y las fuentes consultadas se indican en las páginas correspondientes. Para señalar un error o sugerir una corrección, escribe a cuentaclaracalc@gmail.com.'
        ]
      }
    ]
  },
  contact: {
    eyebrow: 'CONTACTO',
    title: 'Contacto y sugerencias',
    introduction: 'Para consultas y sugerencias, puedes escribir a CuentaClara con este formulario.',
    isContact: true,
    sections: [
      {
        heading: 'Antes de escribir',
        paragraphs: [
          'Al enviar el formulario, tu nombre, correo y mensaje se transmiten a un servicio de formularios (Formspree) que los reenvía a mi correo. Solo los uso para responderte. No incluyas información financiera sensible.',
          'Más información en la política de privacidad.'
        ]
      }
    ]
  },
  methodology: methodologyPage
};

@Component({
  selector: 'app-legal-page',
  imports: [CanonicalLink, FormsModule],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss'
})
export class LegalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  private readonly http = inject(HttpClient);
  protected readonly content: LegalPageContent;

  protected readonly submitted = signal(false);
  protected readonly sendStatus = signal<'idle' | 'sending' | 'sent' | 'error'>('idle');
  protected form = { name: '', email: '', message: '', consent: false, website: '' };


  constructor() {
    const pageId = this.route.snapshot.data['legalPage'] as LegalPageId;
    this.content = legalPages[pageId];
    const description = this.route.snapshot.data['description'];
    if (typeof description === 'string') {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }

  protected sendMessage(contactForm: NgForm): void {
    this.submitted.set(true);

    if (contactForm.invalid) {
      return; // falta algún campo o la casilla de la política
    }
    if (this.form.website) {
      return; // campo trampa para bots
    }

    this.sendStatus.set('sending');
    this.http.post('https://formspree.io/f/mgaobnra', {
      name: this.form.name,
      email: this.form.email,
      message: this.form.message
    }, { headers: { Accept: 'application/json' } }).subscribe({
      next: () => {
        this.sendStatus.set('sent');
        this.submitted.set(false);
        this.form = { name: '', email: '', message: '', consent: false, website: '' };
        contactForm.resetForm(this.form);
      },
      error: () => this.sendStatus.set('error')
    });
  }
}
