import { Component, OnInit } from '@angular/core';
import { LoggedCPFService } from 'src/app/services/loggedCPF/logged-cpf.service';

@Component({
  selector: 'app-cliente-shopping-cart',
  templateUrl: './cliente-shopping-cart.component.html',
  styleUrls: ['./cliente-shopping-cart.component.css']
})
export class ClienteShoppingCartComponent implements OnInit {

  constructor(private loggedCPFService: LoggedCPFService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loggedCPFService.logOut();
  }
}
