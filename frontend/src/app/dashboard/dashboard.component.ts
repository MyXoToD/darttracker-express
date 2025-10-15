import { Component, inject } from '@angular/core';
import { MatchCardComponent } from '../games/match-card/match-card.component';
import { TopbarService } from '../shared/topbar/topbar.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatchCardComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private readonly _topbarService = inject(TopbarService);

  constructor() {
    this._topbarService.pageTitle.set('Dashboard');
  }
}
