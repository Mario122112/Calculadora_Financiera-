import { Component, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

type LegalPageId = 'legal' | 'privacy' | 'contact';

interface LegalSection {
  heading: string;
  paragraphs: string[];
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
    introduction: 'CuentaClara es una marca gestionada por Mario Galindo, particular.',
    sections: [
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
        heading: 'Legislación aplicable y modificaciones',
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
    introduction: 'Información sobre cómo se tratan los datos al usar las calculadoras o al contactar por correo.',
    sections: [
      {
        heading: 'Responsable del tratamiento',
        paragraphs: [
          'Responsable: Mario Galindo, particular.',
          'Correo de contacto: cuentaclaracalc@gmail.com'
        ]
      },
      {
        heading: 'Datos introducidos en las calculadoras',
        paragraphs: [
          'Los cálculos se realizan en tu navegador. CuentaClara no envía, recibe ni guarda los valores que introduces en las calculadoras.'
        ]
      },
      {
        heading: 'Cookies y almacenamiento local',
        paragraphs: [
          'Este sitio no utiliza cookies propias ni de terceros, ni guarda información en el almacenamiento local de tu navegador.'
        ]
      },
      {
        heading: 'Formulario de contacto',
        paragraphs: [
          'Si usas el formulario, se envían tu nombre, tu correo y el contenido del mensaje al servicio Formspree, que los reenvía a mi correo. Solo recibiré esos datos si decides enviarlos.',
          'Finalidad: responder a tu consulta o sugerencia. Base jurídica: tu consentimiento, que das al marcar la casilla de la política de privacidad y enviar el formulario (art. 6.1.a RGPD).',
          'No incluyas información financiera, fiscal o personal sensible en tu mensaje.'
        ]
      },
      {
        heading: 'Conservación y destinatarios',
        paragraphs: [
          'Conservaré el mensaje el tiempo necesario para atender tu consulta y, después, hasta un máximo de 30 dias, salvo que tenga que conservarlo por una obligación legal.',
          'No cedo tus datos a terceros. El correo se recibe en una cuenta de Gmail, por lo que Google actúa como proveedor del servicio de correo y puede tratar el mensaje conforme a su propia política de privacidad.'
        ]
      },
      {
        heading: 'Alojamiento',
        paragraphs: [
          'Al cargar el sitio, el servicio de alojamiento puede recibir datos técnicos de conexión, como la dirección IP o el navegador utilizado, necesarios para ofrecerte la web. Este tratamiento lo realiza el proveedor de alojamiento conforme a su propia política de privacidad.'
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
  }
};

@Component({
  selector: 'app-legal-page',
  imports: [RouterLink, FormsModule],
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


