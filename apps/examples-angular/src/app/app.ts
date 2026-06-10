import { Component, signal } from '@angular/core';
import { CButton } from '@componentry/angular';

@Component({
  selector: 'app-root',
  imports: [CButton],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('examples-angular');

  onClick() {
    console.log('clicked!');
  }
}