import { Component, ViewEncapsulation } from '@angular/core';
import { Certificate } from './certificate.model';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['../shared-styles/card-styles.component.css'],
    standalone: false
})
export class CertificatesComponent {
  public certificates = [
    [
      new Certificate("Angular Vue React Comparison", "Udemy", './assets/certificates/Angular-Vue-React-Certificate.PNG'),
      new Certificate("Angular4", "Mosh", "./assets/certificates/Angular4Completion.PNG")
    ],
    [
      new Certificate("Modern JavaScript", "Udemy", "./assets/certificates/javascriptCourse.png"),
      new Certificate("OOP in JavaScript", "Mosh", "./assets/certificates/OOJavascript.png")
    ],
  ]
}