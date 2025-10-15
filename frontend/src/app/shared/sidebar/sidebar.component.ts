import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-sidebar',
  imports: [
    NavigationComponent,
    FaIconComponent,
  ],
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
}
