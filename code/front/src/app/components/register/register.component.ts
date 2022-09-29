import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  numberRegEx = /\-?\d*\.?\d{1,2}/;
  errorMsg = false;
  showPassword: boolean = false;

  public userForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    CPF: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(this.numberRegEx)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    offers: [true],
    auth: ['Cliente'],
  });;


  constructor(private auth: AuthService, private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  cleanUserForm(): void {
    this.userForm.patchValue({
      name: [''],
      CPF: [''],
      email: [''],
      password: [''],
      offers: [true],
    });
  }

  validForm(): boolean {
    let valid = true;
    Object.keys(this.userForm.controls).forEach(key => {
      valid = (this.userForm.controls[key].status == "VALID") && valid;
    });
    return valid;
  }

  createUser(): void {
    if (this.validForm()) {
      //   if (!this.usersService.userExists(this.userForm.value.CPF)) {
      //     this.usersService.addUser(this.userForm.value);
      //     this.cleanUserForm()
      //     this.router.navigate(['login'])
      //   }
      //   else {
      //     // erro, registrando CPF que ja existe
      //   }
      // } else {
      //   this.errorMsg = true;
      // }
      this.auth.registerUser(this.userForm.value);
    }
  }
}

