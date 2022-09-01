import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoggedService } from 'src/app/services/logged/logged.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})
export class AdminAddUserComponent implements OnInit {

  numberRegEx = /\-?\d*\.?\d{1,2}/;
  errorMsg = false;
  showPassword: boolean = false;


  public userForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    CPF: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(this.numberRegEx)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    offers: [false],
    auth: ['Funcionário'],
  });



  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  cleanUserForm(): void {
    this.userForm.patchValue({
      name: [''],
      CPF: [''],
      email: [''],
      password: [''],
      offers: [false],
      auth: ['Funcionário'],
    });
  }


  constructor(private usersService: UsersService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
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
      this.router.navigate(['users'])
      this.cleanUserForm();
    } else {
      this.errorMsg = true;
    }
  }

}
