import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { filter, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TopbarService {
  private readonly _router = inject(Router);
  pageTitle = signal<string>('');

  constructor() {
    // Clear on navigation
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationStart),
        tap(() => this.pageTitle.set('')),
      )
      .subscribe();
  }
}
