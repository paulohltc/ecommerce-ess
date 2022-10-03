import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
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
  displayedColumns: string[] = ['code', 'qty', 'price', 'items'];
  shops: Shop[] = [];

  constructor(private router: Router, private shopsService: ShopsService, private changeDetectorRef: ChangeDetectorRef, private auth: AuthService) { }

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

  getLoggedEmail(): string {
    return this.auth.getLoggedEmail();
  }


  details(index: number) {
    var detailsCode = this.shops[index].code;
    this.shopsService.setCurrentShop(detailsCode);
    this.router.navigateByUrl('/items');
  }

}
