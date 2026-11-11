import { Component, DestroyRef, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <main>
      <h1>Esta página no existe</h1>
      <p>La dirección que has abierto no corresponde a una página de CuentaClara.</p>
      <a routerLink="/">Volver al inicio</a>
    </main>
  `
})
export class NotFound {
  private readonly meta = inject(Meta);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
    this.destroyRef.onDestroy(() => this.meta.removeTag('name="robots"'));
  }
}
