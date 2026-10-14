import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieConsent } from './core/privacy/cookie-consent';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieConsent],
  templateUrl: './app.html'
})
export class App {}
