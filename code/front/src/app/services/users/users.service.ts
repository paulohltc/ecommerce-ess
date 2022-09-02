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

  private admin: User = { name: 'admin', CPF: '00000000000', email: 'admin@admin.com', password: '123', auth: 'Admin', offers: false };
  private client: User = { name: 'client-test', CPF: '00000000001', email: 'client@test.com', password: '123', auth: 'Cliente', offers: false };
  private employee: User = { name: 'employee-test', CPF: '00000000002', email: 'employee@test.com', password: '123', auth: 'Funcionário', offers: false };
  constructor() {
    this.users = new Map([
      [this.admin.CPF, this.admin],
      [this.client.CPF, this.client],
      [this.employee.CPF, this.employee],
    ]);
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
    let newUser: User = { CPF: CPF, ...edit, auth: prevUser.auth, offers: prevUser.offers };
    this.users.set(CPF, newUser);
  }
}
