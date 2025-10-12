import { Component, computed, inject } from '@angular/core';
import { TopbarService } from './topbar.service';

@Component({
  standalone: true,
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  private _topbarService = inject(TopbarService);

  pageTitle = computed(() => this._topbarService.pageTitle());
}
