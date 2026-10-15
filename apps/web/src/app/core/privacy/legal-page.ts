import { Component, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';

type LegalPageId = 'legal' | 'privacy' | 'cookies' | 'contact';

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
        heading: 'Identificación de quien presta el servicio',
        paragraphs: [
          'La aplicación de la Ley 34/2002 (LSSI-CE) depende, entre otros aspectos, de si la actividad constituye un servicio de la sociedad de la información prestado en el marco de una actividad económica. Si el artículo 10 resulta aplicable, puede exigir nombre, residencia o domicilio (o, en su defecto, la dirección de un establecimiento permanente en España), contacto directo y efectivo, NIF y otros datos según corresponda.',
          'La ubicación indicada en Contacto (Murcia) no es una dirección postal completa. Antes de publicar el sitio debe revisarse con asesoramiento jurídico si la ley aplica y qué dirección corresponde. Para reducir la exposición del domicilio particular, puede estudiarse una dirección profesional o de un establecimiento permanente real, si satisface el requisito legal.'
        ]
      }
    ]
  },
  privacy: {
    eyebrow: 'DATOS Y PRIVACIDAD',
    title: 'Política de privacidad',
    introduction: 'Qué ocurre con los datos al usar las calculadoras o contactar por correo.',
    sections: [
      {
        heading: 'Datos introducidos en las calculadoras',
        paragraphs: [
          'Los cálculos se realizan en tu navegador. CuentaClara no envía ni guarda los valores introducidos en las calculadoras.'
        ]
      },
      {
        heading: 'Contacto por correo',
        paragraphs: [
          'El enlace de Contacto abre tu programa de correo; la web no envía ni recibe el mensaje. Si decides enviarlo, el correo se dirige a una cuenta de Gmail de Google y Mario Galindo podrá tratar el contenido y tu dirección para responder. Tu proveedor de correo también puede procesar el mensaje. No incluyas información financiera sensible.'
        ]
      },
      {
        heading: 'Alojamiento',
        paragraphs: [
          'Al cargar el sitio, el servicio de alojamiento puede recibir datos técnicos de conexión. El proveedor y sus plazos de conservación no se pueden especificar hasta que se elija el alojamiento.'
        ]
      },
      {
        heading: 'Información pendiente',
        paragraphs: [
          'Antes de recibir mensajes debe confirmarse la base jurídica, el plazo de conservación y la información sobre derechos aplicable al correo de contacto. Esta página no sustituye una revisión legal de esos detalles.'
        ]
      }
    ]
  },
  cookies: {
    eyebrow: 'COOKIES Y ALMACENAMIENTO',
    title: 'Política de cookies',
    introduction: 'La versión actual de CuentaClara no instala cookies ni usa almacenamiento local.',
    sections: [
      {
        heading: 'Almacenamiento',
        paragraphs: [
          'La aplicación no guarda preferencias ni datos de las calculadoras en el navegador y no utiliza cookies propias. Una preferencia guardada en una versión anterior puede seguir en el almacenamiento del navegador hasta que se borren los datos del sitio. El servicio de alojamiento puede usar registros técnicos al entregar las páginas; consulta la Política de privacidad.'
        ]
      }
    ]
  },
  contact: {
    eyebrow: 'CONTACTO',
    title: 'Contacto y sugerencias',
    introduction: 'Para consultas y sugerencias, puedes escribir a CuentaClara.',
    isContact: true,
    sections: [
      {
        heading: 'Antes de escribir',
        paragraphs: [
          'El enlace abre tu programa de correo con la dirección de destino. La web no envía el mensaje: solo se transmite si lo revisas y pulsas Enviar en tu programa. El correo se recibe en una cuenta de Gmail de Google; no incluyas información financiera sensible.'
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
