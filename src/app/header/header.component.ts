import { Component } from '@angular/core';
import { MenuItem } from '../menu-item';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  standalone: true
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
