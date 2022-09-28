import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Edit } from 'src/app/models/edit';
import { Login } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class UsersService {

  users: Map<string, User>;

  private admin: User = { name: 'admin', CPF: '00000000000', email: 'admin@admin.com', password: '123456', auth: 'Admin', offers: false };
  private client: User = { name: 'client-test', CPF: '00000000001', email: 'client@client.com', password: '123456', auth: 'Cliente', offers: false };
  private employee: User = { name: 'employee-test', CPF: '00000000002', email: 'employee@employee.com', password: '123456', auth: 'Funcionário', offers: false };
  constructor(private http: HttpClient) {
    this.users = new Map([
      [this.admin.CPF, this.admin],
      [this.client.CPF, this.client],
      [this.employee.CPF, this.employee],
    ]);
  }

  getUserFromCPF(CPF: string): Observable<User> {
    return this.http.get<User>(environment.url + '/users/' + CPF)
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.url + '/users')
  }


  userExists(CPF: string): boolean {
    return this.users.has(CPF);
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

  addUser(user: User): Observable<any> {
    return this.http.post<any>(environment.url + '/users', user);
  }

  deleteUser(CPF: string): Observable<any> {
    return this.http.delete<any>(environment.url + '/users/' + CPF);
  }

  updateUser(CPF: string, edit: Edit): Observable<any> {
    return this.http.put<any>(environment.url + '/users/' + CPF, edit);
  }
}
