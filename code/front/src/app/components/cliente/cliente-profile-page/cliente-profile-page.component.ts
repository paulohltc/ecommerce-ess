import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';



@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  editProfileDisplay = true;
  myShopsDisplay = false;

  numberRegEx = /\-?\d*\.?\d{1,2}/;
  errorMsg = false;
  showPassword: boolean = false;

  public userEditForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    CPF: new FormControl('', [Validators.required, Validators.maxLength(11), Validators.minLength(11), Validators.pattern(this.numberRegEx)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private formBuilder: FormBuilder, private usersService: UsersService) { }


  ngOnInit(): void {
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  cleanUserForm(): void {
    this.userEditForm.patchValue({
      name: [''],
      CPF: [''],
      email: [''],
      password: [''],
    });
  }

  validForm(): boolean {
    let valid = true;
    Object.keys(this.userEditForm.controls).forEach(key => {
      valid = (this.userEditForm.controls[key].status == "VALID") && valid;
    });
    return valid;
  }

  saveEdit(): void {
    if (this.validForm()) {
      let formCPF: string = this.userEditForm.value.CPF;
      console.log(formCPF);
      if (this.usersService.userExists(formCPF)) {
        this.usersService.updateUser(this.userEditForm.value);
        this.errorMsg = false;
      } else {
        // erro, editando de CPF que nao existe
        this.errorMsg = true;
      }
    }
    else {
      this.errorMsg = true;
    }
  }

  editProfile() {
    this.editProfileDisplay = true;
    this.myShopsDisplay = false;
  }

  myShops() {
    this.editProfileDisplay = false;
    this.myShopsDisplay = true;
  }


}
