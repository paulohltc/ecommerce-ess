import { Component, OnInit } from '@angular/core';
import { LoggedService } from 'src/app/services/logged/logged.service';

@Component({
  selector: 'app-cliente-shopping-cart',
  templateUrl: './cliente-shopping-cart.component.html',
  styleUrls: ['./cliente-shopping-cart.component.css']
})
export class ClienteShoppingCartComponent implements OnInit {

  constructor(private loggedService: LoggedService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loggedService.logOut();
  }
}
