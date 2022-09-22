import { Component, OnInit } from '@angular/core';
import { LoggedService } from 'src/app/services/logged/logged.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private loggedService: LoggedService) { }

  menu_icon_variable: boolean = false;
  menuVariable: boolean = false;
  ngOnInit(): void {
  }
  openMenu() {
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
  }
  logOut(): void {
    this.loggedService.logOut();
  }
}
