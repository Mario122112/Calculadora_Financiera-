import { Location } from '@angular/common';
import { Directive, ElementRef, HostBinding, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';

function trailingSlashPath(value: string): string {
  const [path, suffix = ''] = value.split(/(?=[?#])/, 2);
  if (path === '/') return `${path}${suffix}`;
  return `${path.replace(/\/+$/, '')}/${suffix}`;
}

function routerPath(value: string): string {
  const [path, suffix = ''] = value.split(/(?=[?#])/, 2);
  return `${path === '/' ? path : path.replace(/\/+$/, '') || '/'}${suffix}`;
}

@Directive({
  selector: 'a[canonicalLink]',
  standalone: true
})
export class CanonicalLink {
  @Input({ required: true }) canonicalLink = '';

  private readonly element = inject(ElementRef<HTMLAnchorElement>);
  private readonly location = inject(Location);
  private readonly router = inject(Router);

  @HostBinding('attr.href')
  get href(): string {
    return trailingSlashPath(this.canonicalLink);
  }

  @HostListener('click', ['$event'])
  navigate(event: MouseEvent): void {
    const anchor = this.element.nativeElement;
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      anchor.target && anchor.target !== '_self' ||
      anchor.hasAttribute('download')
    ) {
      return;
    }

    event.preventDefault();
    const href = this.href;
    void this.router.navigateByUrl(routerPath(href)).then(navigated => {
      if (navigated) this.location.replaceState(href, '');
    });
  }
}
