import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { faSliders, faWarning } from '@fortawesome/free-solid-svg-icons';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { NotificationsComponent } from './shared/notifications/notifications.component';
import { TopbarComponent } from './shared/topbar/topbar.component';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NotificationsComponent,
    NavigationComponent,
    TopbarComponent,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  fontAwesomeLibrary = inject(FaIconLibrary);

  constructor() {
    this.fontAwesomeLibrary.addIcons(faSliders, faWarning);
  }
}
