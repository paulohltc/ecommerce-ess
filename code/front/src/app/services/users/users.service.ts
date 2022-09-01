import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users: Map<string, User>;

  private admin: User = { name: 'admin', cpf: '01234567899', email: 'admin@admin.com', password: '123', auth: 'Admin', offers: false };
  constructor() {
    this.users = new Map([
      [this.admin.cpf, this.admin]]);
  }

  getUsers(): Observable<Map<string, User>> {
    const users = of(this.users);
    return users;
  }

  userExists(CPF: string): boolean {
    for (let [cpfKey, userValue] of this.users) {
      if (cpfKey == CPF) return true;
    }
    return false;
  }

  authPassword(login: Login): [boolean, string] {
    let response = [false, ''];
    for (let [cpfKey, userValue] of this.users) {
      if (login.cpf == cpfKey) {
        let samePassword: boolean = (login.password == userValue.password);
        response = [samePassword, userValue.auth];
      }
    }
    return response as [boolean, string];
  }

  addUser(user: User): void {
    this.users.set(user.cpf, user);
  }

  removeUser(cpf: string): void {
    if (cpf != this.admin.cpf)
      this.users.delete(cpf);
  }
}
