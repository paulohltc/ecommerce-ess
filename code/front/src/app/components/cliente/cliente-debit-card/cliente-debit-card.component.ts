import { Component, OnInit } from '@angular/core';
import { LoggedService } from 'src/app/services/logged/logged.service';

@Component({
  selector: 'app-cliente-debit-card',
  templateUrl: './cliente-debit-card.component.html',
  styleUrls: ['./cliente-debit-card.component.css']
})
export class ClienteDebitCardComponent implements OnInit {

  constructor(private loggedService: LoggedService) { }

  ngOnInit(): void {
  }


}
