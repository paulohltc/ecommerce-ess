import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Sale } from 'src/app/models/sale';
import { SalesService } from 'src/app/services/sales/sales.service';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth/auth.service';



@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.css']
})
export class AdminSalesComponent implements OnInit {
  mobileQuery: MediaQueryList;

  displayedColumns: string[] = ['codigoSale', 'codigoProduct', 'name', 'qty', 'value', 'cpf', 'info'];
  dataSourceSales = new MatTableDataSource(this.getSales())

  private _mobileQueryListener: () => void;


  constructor(private auth: AuthService, private salesService: SalesService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getSales(): Sale[] {
    return this.salesService.getSales();
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.auth.logout();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceSales.filter = filterValue.trim().toLowerCase();
  }
}
