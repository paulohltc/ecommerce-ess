import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/models/user';
import { LoggedCPFService } from 'src/app/services/loggedCPF/logged-cpf.service';




@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  editProfileDisplay = true;
  myShopsDisplay = false;
  msgEditDisplay = false;


  currUserName: string = '';
  currUserEmail: string = '';
  currUserPassword: string = '';

  errorMsg = false;
  showPassword: boolean = false;

  public userEditForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private loggedCPFService: LoggedCPFService, private formBuilder: FormBuilder, private usersService: UsersService) { }


  ngOnInit(): void {
    let userCPF: string = this.loggedCPFService.getCPF();
    let currUser: User = this.usersService.getUserFromCPF(userCPF);
    this.currUserName = currUser.name;
    this.currUserEmail = currUser.email;
    this.currUserPassword = currUser.password;
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  cleanUserForm(): void {
    this.userEditForm.patchValue({
      name: [''],
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
      let userCPF: string = this.loggedCPFService.getCPF();
      this.usersService.updateUser(userCPF, this.userEditForm.value);
      this.msgEditDisplay = true;
      this.errorMsg = false;
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

  logOut(): void {
    this.loggedCPFService.logOut();
  }

}
