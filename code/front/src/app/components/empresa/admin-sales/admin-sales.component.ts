import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ShopsService } from 'src/app/services/shops/shops.service';
import { formatCPF, formatPrice } from 'src/app/utils/utils';
import { Shop } from '../../../../../../models/shop'



@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.css']
})
export class AdminSalesComponent implements OnInit {
  mobileQuery: MediaQueryList;

  formatCPF = formatCPF;
  formatPrice = formatPrice;
  shops: Shop[] = []
  displayedColumns: string[] = ['codigoSale', 'qty', 'name', 'email', 'CPF', 'total', 'info'];


  private _mobileQueryListener: () => void;


  constructor(private auth: AuthService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private shopsService: ShopsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }



  ngOnInit(): void {
    this.refresh();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  getSales() {
    this.shopsService.getShops().subscribe({
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

  logout(): void {
    this.auth.logout();
  }


}
