import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users: User[];

  constructor() { this.users = []; }

  getUsers(): User[] {
    return this.users;
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  removerNome(index: number): void {
    this.users.splice(index, 1);
  }
}
