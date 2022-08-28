import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public showPassword: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }
  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}

