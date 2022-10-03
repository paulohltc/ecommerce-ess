import { Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { formatPrice } from 'src/app/utils/utils';






@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  formatPrice = formatPrice;

  displayedColumns: string[] = ['code', 'name', 'price', 'qty', 'remove'];
  dataSourceSales = []

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }


  teste() {



  }

}
