import { Component } from '@angular/core';
import { Project } from './project.model';

@Component({
    selector: 'app-projects',
    templateUrl: './projects.component.html',
    styleUrls: ['../shared-styles/card-styles.component.css'],
    standalone: false
})
export class ProjectsComponent {
  public projects = [
    [
      new Project('Fly Swatter', 'Angular 2+', './assets/projects/FlySwatter.PNG', "https://carpalcarp.github.io/fly-swatter/", `Fly Swatter is a game I made for fun as I've been practicing using Angular, even though Angular is not meant to be used for making games. I tried to replicate Fly Swatter from Super Mario Paint for the SNES. Here's a link to a video of how the original game was like: https://www.youtube.com/watch?v=vAQXJbfihxo. The game is meant to be played using a mouse.`),
      new Project('League Management Site', 'JS/HTML/CSS/jQuery', './assets/projects/LeagueManagement.PNG', "https://carpalcarp.github.io/League-Management-Website/", `This was a project I made in one of my web classes. It is the pure front-end of a league management system. Most of the links don't work since it only displays information about teams and players. This project was the preceding one before we had to create the backend in PHP. The backend is not provided.`)
    ],
    [
      new Project('Pizza Delivery', 'School Group Project in JS/HTML/CSS', './assets/projects/PizzaDelivery.PNG', "https://carpalcarp.github.io/pizza-delivery/", `This was a group project from a Human Computer Interactions class I took in the University. The purpose is to create a front-end app for those with visual disabilities. The problem was that none in our group including me knew a framework so we created multiple HTML pages and put them together. After I learned Angular, I recreated this project. See Pizza Delivery Angular App.`),
      new Project('Pizza Delivery App', 'Pizza Delivery recreated in Angular 2+', './assets/projects/PizzaDeliveryAppAngular.PNG', "https://carpalcarp.github.io/pizza-delivery-Angular/", `This is my recreation of the group project I made for the Human Computer Interactions class. I added a few more features as well such as taking card information and checking for form errors.`)
    ],
  ]
}
