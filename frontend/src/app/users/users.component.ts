import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { TopbarService } from '../shared/topbar/topbar.service';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  imports: [RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private readonly usersService = inject(UsersService);
  private _topbarService = inject(TopbarService);
  private readonly _router = inject(Router);
  users: any = [];

  constructor() {
    this._topbarService.pageTitle.set('Users');
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAll().subscribe((result) => (this.users = result));
  }
}
