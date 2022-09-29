import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

export interface LoginEmail {
  email: string;
  password: string;
}

export interface UserInfo {
  name: string;
  CPF: string;
  email: string;
  offers: boolean;
  auth: string;
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
  ]);


  constructor(private http: HttpClient, private fireauth: AngularFireAuth, private router: Router) {

  }


  loginUser(login: LoginEmail) {
    if (login.email == 'admin@admin.com') {
      this.roleAuth = 'Admin';
    }
    this.fireauth.signInWithEmailAndPassword(login.email, login.password).then((user) => {
      localStorage.setItem('token', 'true');
      var route = this.authRouteMap.get(this.roleAuth) as string;
      this.router.navigateByUrl(route);
    }, err => {
      var body = { errorMsg: err.message };
      this.http.post(environment.url + '/users/loginError', body);
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
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }, err => {
      alert(err.message);
    })
  }
}
