import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { LoggedCPFService } from 'src/app/services/loggedCPF/logged-cpf.service';


@Component({
  selector: 'app-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;


  constructor(private loggedCPFService: LoggedCPFService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loggedCPFService.logOut();
  }



}
