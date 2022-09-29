import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  public userForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.minLength(8)]),
    password: new FormControl('', [Validators.required]),
  });

  cleanUserForm(): void {
    this.userForm.setValue({
      email: [''],
      password: [''],
    });
  }

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  loginRoute(): void {
    var email = this.userForm.value.email;
    var password = this.userForm.value.password;
    this.auth.loginUser({ email, password });
  }

}
