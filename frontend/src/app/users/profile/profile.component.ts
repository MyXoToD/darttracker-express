import { Component, effect, inject, input } from '@angular/core';
import { tap } from 'rxjs';
import { TopbarService } from '../../shared/topbar/topbar.service';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private readonly _usersService = inject(UsersService);
  private readonly _topbarService = inject(TopbarService);

  userId = input.required<string>();
  user: any;

  constructor() {
    effect(() => {
      this._usersService
        .getById(this.userId())
        .pipe(
          tap((result) => {
            this.user = result;
            this._topbarService.pageTitle.set(
              this.user.username + "'s Profile",
            );
          }),
        )
        .subscribe();
    });
    // console.log('Profile Component', this.userId());
    // effect(() => {
    //   console.log(this.user);
    // });
  }
}
