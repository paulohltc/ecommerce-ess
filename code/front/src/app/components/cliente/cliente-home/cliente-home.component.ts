import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { LoggedService } from 'src/app/services/logged/logged.service';


@Component({
  selector: 'app-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;


  constructor(private loggedService: LoggedService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loggedService.logOut();
  }



}
