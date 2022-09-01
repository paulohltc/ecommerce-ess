import { Component, OnInit } from '@angular/core';
import { LoggedCPFService } from 'src/app/services/loggedCPF/logged-cpf.service';

@Component({
  selector: 'app-cliente-debit-card',
  templateUrl: './cliente-debit-card.component.html',
  styleUrls: ['./cliente-debit-card.component.css']
})
export class ClienteDebitCardComponent implements OnInit {

  constructor(private loggedCPFService: LoggedCPFService) { }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loggedCPFService.logOut();
  }
}
