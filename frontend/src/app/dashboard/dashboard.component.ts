import { Component } from '@angular/core';
import { MatchCardComponent } from '../games/match-card/match-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [MatchCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
