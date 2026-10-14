import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

type LegalPageId = 'legal' | 'privacy' | 'cookies';

interface LegalSection {
  heading: string;
  paragraphs: string[];
}

interface LegalPageContent {
  eyebrow: string;
  title: string;
  introduction: string;
  sections: LegalSection[];
}

const legalPages: Record<LegalPageId, LegalPageContent> = {
  legal: {
    eyebrow: 'INFORMACIÓN DEL SITIO',
    title: 'Aviso legal',
    introduction: 'Información general sobre el uso de las calculadoras.',
    sections: [
      {
        heading: 'Uso de las calculadoras',
        paragraphs: [
          'Las herramientas ofrecen estimaciones orientativas a partir de los datos introducidos. No constituyen asesoramiento financiero, fiscal, laboral ni jurídico, ni una oferta de financiación.',
          'Comprueba las condiciones oficiales y los resultados antes de tomar decisiones.'
        ]
      }
    ]
  },
  privacy: {
    eyebrow: 'DATOS Y PRIVACIDAD',
    title: 'Política de privacidad',
    introduction: 'Resumen del tratamiento que realiza actualmente la aplicación según su código.',
    sections: [
      {
        heading: 'Datos introducidos en las calculadoras',
        paragraphs: [
          'Las operaciones de las calculadoras se realizan en el navegador. El código de la aplicación no envía los valores introducidos a una API ni los guarda en una cuenta.'
        ]
      },
      {
        heading: 'Preferencia de privacidad',
        paragraphs: [
          'Si eliges guardar una decisión en el panel, la aplicación conserva en el almacenamiento local del navegador la decisión (aceptar, rechazar o configurar), su fecha y la versión del formato. El código de la aplicación no envía esta información a un servicio externo.'
        ]
      }
    ]
  },
  cookies: {
    eyebrow: 'ALMACENAMIENTO LOCAL',
    title: 'Política de cookies',
    introduction: 'La aplicación no usa cookies propias en su código: guarda únicamente la decisión de privacidad en el navegador.',
    sections: [
      {
        heading: 'Almacenamiento utilizado',
        paragraphs: [
          'La preferencia se guarda mediante localStorage con la clave cuentaclara-privacy-choice-v2. El registro contiene la decisión, la fecha y la versión del formato; no contiene nombre, correo ni valores de las calculadoras.',
          'No se fija una fecha de caducidad: el registro permanece en el navegador hasta que se cambie la decisión o se borren los datos del sitio desde el navegador. No es una cookie HTTP.'
        ]
      },
      {
        heading: 'Elección y cambios',
        paragraphs: [
          'El panel ofrece aceptar, rechazar o configurar la decisión y mantiene el acceso «Privacidad y cookies» para cambiarla. En esta versión no hay categorías opcionales configuradas.',
          'Si el navegador bloquea el almacenamiento local, la aplicación informa del problema y mantiene la elección solo mientras la página siga abierta.'
        ]
      }
    ]
  }
};

@Component({
  selector: 'app-legal-page',
  imports: [RouterLink],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss'
})
export class LegalPage {
  private readonly route = inject(ActivatedRoute);
  private readonly meta = inject(Meta);
  protected readonly content: LegalPageContent;

  constructor() {
    const pageId = this.route.snapshot.data['legalPage'] as LegalPageId;
    this.content = legalPages[pageId];
    const description = this.route.snapshot.data['description'];
    if (typeof description === 'string') {
      this.meta.updateTag({ name: 'description', content: description });
    }
  }
}
