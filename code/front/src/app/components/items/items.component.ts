import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShopsService } from 'src/app/services/shops/shops.service';
import { formatPrice } from 'src/app/utils/utils';
import { Item } from '../../../../../models/item';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {

  items: Item[] = [];
  displayedColumns: string[] = ['qty', 'code', 'name', 'price', 'total'];
  formatPrice = formatPrice;


  constructor(private auth: AuthService, private router: Router, private shopsService: ShopsService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.refresh();
  }

  getCurrentShopCode(): string {
    return this.shopsService.getCurrentShopCode();
  }

  getShopItems() {
    this.shopsService.getShopItems().subscribe({
      next: (items) => {
        this.items = items;
      }, error: () => {
        alert('Error')
      }
    })
  }

  refresh() {
    this.getShopItems();
    this.changeDetectorRef.detectChanges();
  }


  return() {
    this.shopsService.clearCurrentShop();
    var loggedEmail = this.auth.getLoggedEmail();
    if (loggedEmail == 'admin@admin.com') {
      this.router.navigateByUrl('/sales');
    }
    else {
      this.router.navigateByUrl('/cliente-profile-page');
    }
  }

}
