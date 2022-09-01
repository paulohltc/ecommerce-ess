import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;
  editProfileDisplay = true;
  myShopsDisplay = false;
  
  public userEditForm: FormGroup = this.formBuilder.group({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private formBuilder : FormBuilder) { }


  ngOnInit(): void {
  }


  editProfile() {
    this.editProfileDisplay = true;
    this.myShopsDisplay = false;
  }

  myShops(){
    this.editProfileDisplay = false;
    this.myShopsDisplay = true;
  }


}
