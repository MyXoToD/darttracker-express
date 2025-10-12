import { NgIf } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { tap } from 'rxjs';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  imports: [NgIf],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly _usersService = inject(UsersService);

  userId = input.required<string>();
  user: any;

  constructor() {
    effect(() => {
      this._usersService
        .getById(this.userId())
        .pipe(tap((result) => (this.user = result)))
        .subscribe();
    });
    // console.log('Profile Component', this.userId());
    // effect(() => {
    //   console.log(this.user);
    // });
  }
}
