import { Component, inject } from '@angular/core';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  private readonly usersService = inject(UsersService);
  users: any = [];

  constructor() {
    this.getAllUsers();
  }

  getAllUsers() {
    this.usersService.getAll().subscribe((result) => (this.users = result));
  }
}
