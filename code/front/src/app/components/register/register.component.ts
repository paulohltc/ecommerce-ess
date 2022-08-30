import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router, RouterModule, Routes } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  numberRegEx = /\-?\d*\.?\d{1,2}/;
  errorMsg = false;

  public userForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    cpf: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(this.numberRegEx)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    offers: [true],
    auth: ['Cliente'],
  });;


  cleanUserForm(): void {
    this.userForm.patchValue({
      name: [''],
      cpf: [''],
      email: [''],
      password: [''],
      offers: [true],
    });
  }


  public showPassword: boolean = false;
  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }


  validForm(): boolean {
    let valid = true;
    Object.keys(this.userForm.controls).forEach(key => {
      valid = (this.userForm.controls[key].status == "VALID") && valid;
    });
    return valid;
  }

  createUser() {
    if (this.validForm()) {
      this.usersService.addUser(this.userForm.value);
      this.router.navigate(['login'])
      this.cleanUserForm();
    } else {
      this.errorMsg = true;
    }
    
  }

}

