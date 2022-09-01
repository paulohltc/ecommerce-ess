import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;


  constructor() { }

  ngOnInit(): void {
  }

}
