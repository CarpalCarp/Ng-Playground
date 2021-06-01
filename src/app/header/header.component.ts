import { Component } from '@angular/core';
import { MenuItem } from '../menu-item';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  menuItems: MenuItem[] = [
    {
      label: 'About Me',
      icon: 'account_box',
      route: '/about-me',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    {
      label: 'Projects',
      icon: 'assignment_turned_in',
      route: '/projects',
      showOnMobile: true,
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
      label: 'Chemistry Calculator',
      icon: 'science',
      route: '/chemistry',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'Tic Tac Toe',
      icon: 'extension',
      route: '/tic-tac-toe',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    },
    {
      label: 'More',
      icon: 'add',
      route: '/more',
      showOnMobile: false,
      showOnTablet: false,
      showOnDesktop: false
    }
  ];

}
