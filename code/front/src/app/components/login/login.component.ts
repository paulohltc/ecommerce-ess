import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/services/users/users.service';
import { ErrorStateMatcher } from '@angular/material/core';
import { LoggedService } from 'src/app/services/logged/logged.service';


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

  constructor(private loggedService: LoggedService, private router: Router, private usersService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  loginRoute(): void {
    let route: string = '';
    let CPF: string = this.userForm.value.CPF;
    if (this.usersService.userExists(CPF)) {
      this.wrongAccount = false;
      let response = this.usersService.authPassword(this.userForm.value);
      let auth = response[1];
      if (response[0]) {
        this.wrongPassword = false;
        route = this.authRouteMap.get(auth) as string;
        this.loggedService.logCPF(CPF, auth);
        this.router.navigateByUrl(route);
      }
      else {
        this.wrongPassword = true;
      }
    }
    else {
      this.wrongAccount = true;
    }
  }

}
