import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { ShopsService } from 'src/app/services/shops/shops.service';
import { formatPrice } from 'src/app/utils/utils';
import { Shop } from '../../../../../../models/shop';






@Component({
  selector: 'app-home',
  templateUrl: './cliente-profile-page.component.html',
  styleUrls: ['./cliente-profile-page.component.css']
})
export class ClienteProfilePageComponent implements OnInit {

  formatPrice = formatPrice;

  displayedColumns: string[] = ['code', 'name', 'price', 'qty'];
  shops: Shop[] = [];

  constructor(private formBuilder: FormBuilder, private shopsService: ShopsService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refresh();
  }

  getSales() {
    this.shopsService.getShopsFromClient().subscribe({
      next: (shops: Map<string, Shop>) => {
        this.shops = Object.values(shops);
      }, error: () => {
        alert('Error');
      }
    })
  }

  refresh() {
    this.getSales();
    this.changeDetectorRef.detectChanges();
  }




}
