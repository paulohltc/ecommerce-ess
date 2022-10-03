import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {

  showPassword: boolean = false;

  public userForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });;


  constructor(private auth: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {

  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  cleanUserForm(): void {
    this.userForm.patchValue({
      email: [''],
      password: [''],
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
      this.auth.registerUser(this.userForm.value);
    }
  }
}

