import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faAngleRight, faBars,
  faCaretRight, faChartSimple,
  faDice,
  faHome,
  faPeopleGroup,
  faRightFromBracket,
  faSliders, faTrophy,
  faUser,
  faWarning,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { TopbarComponent } from './shared/topbar/topbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NotificationsComponent,
    NavigationComponent,
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
    this.fontAwesomeLibrary.addIcons(faSliders, faWarning, faRightFromBracket, faHome, faUser, faPeopleGroup, faDice, faAngleRight, faTrophy, faChartSimple, faBars);
  }
}
