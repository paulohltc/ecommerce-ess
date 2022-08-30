import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import {ErrorStateMatcher} from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  public showPassword: boolean = false;

  public userForm: FormGroup = this.formBuilder.group({
    cpf: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  private authRouteMap: Map<string, string> = new Map([
    ['Cliente', '/cliente-home'],
    ['Admin', '/products'],
    ['Funcionário', '/products'],
  ]);


  cleanUserForm(): void {
    this.userForm.setValue({
      cpf: [''],
      password: [''],
    });
  }

  constructor(private router: Router, private usersService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  // public getUsers(): User[] {
  //   return this.usersService.getUsers();
  // }

  loginRoute(): void {
    let route = '';
    let auth = '';
    console.log(this.usersService.getUsers());
    if (this.usersService.userExists(this.userForm.value.cpf)) {
      let response = this.usersService.authPassword(this.userForm.value);
      auth = response[1];
      if (response[0]) {
        route = this.authRouteMap.get(auth) as string;
      }
      else {
        console.log("senhas não conferem");
      }
    }
    else {
      console.log("conta nao existe");
    }
    this.router.navigateByUrl(route);
  }

}
