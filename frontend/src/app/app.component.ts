import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faAngleRight,
  faBars,
  faChartSimple,
  faDice,
  faHome,
  faMoon,
  faPeopleGroup,
  faPlusCircle,
  faRightFromBracket,
  faSliders,
  faSun,
  faTrophy,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { TopbarComponent } from './shared/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NotificationsComponent,
    TopbarComponent,
    FontAwesomeModule,
    SidebarComponent,
  ],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fontAwesomeLibrary = inject(FaIconLibrary);

  constructor() {
    this.fontAwesomeLibrary.addIcons(
      faSliders,
      faWarning,
      faRightFromBracket,
      faHome,
      faUser,
      faPeopleGroup,
      faDice,
      faAngleRight,
      faTrophy,
      faChartSimple,
      faBars,
      faPlusCircle,
      faSun,
      faMoon,
    );
  }
}
