import { Component } from '@angular/core';
import { Project } from './project.model';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../shared-styles/card-styles.component.css']
})
export class ProjectsComponent {
  public projects = [
    [
      new Project('Fly Swatter', 'Angular 2+', './assets/projects/FlySwatter.PNG'),
      new Project('League Management Site', 'JS/HTML/CSS/jQuery', './assets/projects/LeagueManagement.PNG')
    ],
    [
      new Project('Pizza Delivery', 'School Group Project in JS/HTML/CSS', './assets/projects/PizzaDelivery.PNG'),
      new Project('Pizza Delivery App', 'Pizza Delivery recreated in Angular 2+', './assets/projects/PizzaDeliveryAppAngular.PNG')
    ],
  ]
}
