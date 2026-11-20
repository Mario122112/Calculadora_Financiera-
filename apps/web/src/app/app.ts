import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SiteSeoService } from './seo/site-seo.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html'
})
export class App {
  constructor() {
    inject(SiteSeoService);
  }
}
