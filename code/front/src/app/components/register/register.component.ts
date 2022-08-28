import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public userForm: FormGroup = this.formBuilder.group({
    name: [''],
    cpf: [''],
    email: [''],
    password: [''],
  });;


  public showPassword: boolean = false;
  constructor(private usersService: UsersService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  createUser() {
    this.usersService.addUser(this.userForm.value);
    console.log(this.usersService.getUsers());
  }

}

