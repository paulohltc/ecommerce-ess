import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  errorMsg = false;

  showPassword: boolean = false;
  public userForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    CPF: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    offers: [false],
    auth: ['Funcionário'],
  });

  constructor(private formBuilder: FormBuilder) { }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  ngOnInit(): void {
  }

}
