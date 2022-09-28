import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

export interface LoginEmail {
  email: string;
  password: string;
}

export interface UserRegister {
  name: string;
  CPF: string;
  email: string;
  password: string;
  offers: boolean;
  auth: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  roleAuth: string = 'Cliente';
  private authRouteMap: Map<string, string> = new Map([
    ['Cliente', '/cliente-home'],
    ['Admin', '/products'],
    ['Funcionário', '/products'],
  ]);


  constructor(private fireauth: AngularFireAuth, private router: Router) {

  }

  loginUser(login: LoginEmail) {
    if (login.email === 'admin@admin.com' && login.password == '123456') {
      this.roleAuth = "Admin";
    }
    else if (login.email === 'employee@employee.com' && login.password == '123456') {
      this.roleAuth = "Funcionário";
    }
    this.fireauth.signInWithEmailAndPassword(login.email, login.password).then((user) => {
      localStorage.setItem('token', 'true');
      var route = this.authRouteMap.get(this.roleAuth) as string;
      this.router.navigateByUrl(route);
    }, err => {
      alert("Credenciais inválidas");
    }
    )
  }

  registerUser(user: UserRegister) {
    this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      this.router.navigateByUrl('/login')
    }, err => {
      alert('Erro')
      this.router.navigateByUrl('/register')
    })
  }

  logout() {

  }
}
