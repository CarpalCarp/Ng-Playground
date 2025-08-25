import { Component } from '@angular/core';
import { MenuItem } from '../menu-item';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css'],
    standalone: false
})
export class HeaderComponent {

  menuItems: MenuItem[] = [
    {
      label: 'About Me',
      icon: 'account_box',
      route: '/',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Projects',
      icon: 'assignment_turned_in',
      route: '/projects',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Certificates',
      icon: 'stars',
      route: '/certificates',
      showOnMobile: false,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Coding Challenges',
      icon: 'psychology',
      route: '/coding-challenges',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    }
  ];

}
