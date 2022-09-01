import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorStateMatcher } from '@angular/material/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  public showPassword: boolean = false;

  public userForm: FormGroup = this.formBuilder.group({
    CPF: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11)]),
    password: new FormControl('', [Validators.required]),
  });

  private authRouteMap: Map<string, string> = new Map([
    ['Cliente', '/cliente-home'],
    ['Admin', '/products'],
    ['Funcionário', '/products'],
  ]);

  wrongAccount: boolean = false;
  wrongPassword: boolean = false;

  cleanUserForm(): void {
    this.userForm.setValue({
      CPF: [''],
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
    if (this.usersService.userExists(this.userForm.value.CPF)) {
      this.wrongAccount = false;
      let response = this.usersService.authPassword(this.userForm.value);
      let auth = response[1];
      if (response[0]) {
        this.wrongPassword = false;
        route = this.authRouteMap.get(auth) as string;
      }
      else {
        this.wrongPassword = true;
      }
    }
    else {
      this.wrongAccount = true;
    }
    this.router.navigateByUrl(route);
  }

}
