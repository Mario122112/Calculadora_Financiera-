import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'sueldo-neto', renderMode: RenderMode.Prerender },
  { path: 'calculadora-hipoteca', renderMode: RenderMode.Prerender },
  { path: 'calculadora-prestamo-personal', renderMode: RenderMode.Prerender },
  { path: 'calculadora-pension', renderMode: RenderMode.Prerender },
  { path: 'calculadora-interes-compuesto', renderMode: RenderMode.Prerender },
  { path: 'calculadora-finiquito-indemnizacion', renderMode: RenderMode.Prerender },
  { path: 'aviso-legal', renderMode: RenderMode.Prerender },
  { path: 'politica-de-privacidad', renderMode: RenderMode.Prerender },
  { path: 'politica-de-cookies', renderMode: RenderMode.Prerender },
  { path: 'contacto', renderMode: RenderMode.Prerender },
  { path: 'como-se-calcula', renderMode: RenderMode.Prerender },
  { path: '**', renderMode: RenderMode.Client }
];
