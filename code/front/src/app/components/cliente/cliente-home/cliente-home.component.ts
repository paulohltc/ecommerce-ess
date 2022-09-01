import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;


  constructor() { }

  ngOnInit(): void {
  }





}
