import { Component, computed, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { TopbarService } from './topbar.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
  imports: [FaIconComponent],
})
export class TopbarComponent {
  private _topbarService = inject(TopbarService);

  pageTitle = computed(() => this._topbarService.pageTitle());

  logout() {}
}
