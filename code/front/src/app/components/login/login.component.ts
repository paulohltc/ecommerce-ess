import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
