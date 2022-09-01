import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Edit } from 'src/app/models/edit';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users: Map<string, User>;

  private admin: User = { name: 'admin', CPF: '01234567899', email: 'admin@admin.com', password: '123', auth: 'Admin', offers: false };
  constructor() {
    this.users = new Map([
      [this.admin.CPF, this.admin]]);
  }

  getUserFromCPF(CPF: string): User {
    // assumindo que CPF existe
    return this.users.get(CPF)!;
  }

  getUsers(): Observable<Map<string, User>> {
    const users = of(this.users);
    return users;
  }

  userExists(CPF: string): boolean {
    for (let [CPFKey, userValue] of this.users) {
      if (CPFKey == CPF) return true;
    }
    return false;
  }

  authPassword(login: Login): [boolean, string] {
    let response = [false, ''];
    for (let [CPFKey, userValue] of this.users) {
      if (login.CPF == CPFKey) {
        let samePassword: boolean = (login.password == userValue.password);
        response = [samePassword, userValue.auth];
      }
    }
    return response as [boolean, string];
  }

  addUser(user: User): void {
    this.users.set(user.CPF, user);
  }

  removeUser(CPF: string): void {
    if (CPF != this.admin.CPF)
      this.users.delete(CPF);
  }

  updateUser(CPF: string, edit: Edit): void {
    let prevUser: User = this.getUserFromCPF(CPF);
    console.log(prevUser);
    let newUser: User = { CPF: CPF, ...edit, auth: prevUser.auth, offers: prevUser.offers };
    this.users.set(CPF, newUser);
  }
}
