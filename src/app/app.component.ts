import { Component } from '@angular/core';
import { CarrosComponent } from './carros/carros.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CarrosComponent],
  template: `<app-carros />`,
  styles: []
})
export class AppComponent {}
