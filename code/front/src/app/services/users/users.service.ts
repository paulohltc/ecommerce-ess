import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users: User[];

  private admin: User = { name: 'admin', cpf: '01234567899', email: 'admin@admin.com', password: '123', auth: 'admin', offers: false };
  constructor() { this.users = [this.admin]; }

  getUsers(): Observable<User[]> {
    const users = of(this.users);
    return users;
  }

  userExists(cpf: string): boolean {
    let exists = false
    for (let user of this.users)
      if (user.cpf == cpf) exists = true;

    return exists;
  }

  authPassword(login: Login): [boolean, string] {
    let response = [false, ''];
    for (let user of this.users) {
      if (login.cpf == user.cpf) {
        let samePassword: boolean = (login.password == user.password);
        response = [samePassword, user.auth];
      }
    }
    return response as [boolean, string];
  }

  addUser(user: User): void {
    this.users.push(user);
  }

  removeUser(index: number): void {
    this.users.splice(index, 1);
  }
}
