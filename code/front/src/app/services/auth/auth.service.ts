import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { User } from '../../../../../models/user';
import { environment } from 'src/environments/environment';





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


  loginUser(login: User) {
    if (login.email == 'admin@admin.com') {
      this.roleAuth = 'Admin';
    } else {
      this.roleAuth = 'Cliente';
    }
    this.fireauth.signInWithEmailAndPassword(login.email, login.password).then((user) => {
      localStorage.setItem('token', 'true');
      var route = this.authRouteMap.get(this.roleAuth) as string;
      this.router.navigateByUrl(route);
    }, err => {
      alert('Credenciais invalidas');
    })
  }

  registerUser(user: User) {
    this.fireauth.createUserWithEmailAndPassword(user.email, user.password).then(() => {
      this.router.navigateByUrl('/login')
    }, err => {
      alert('Conta já existente ou formato inválido')
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
