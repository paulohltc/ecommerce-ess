import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from 'src/app/models/sale';
import { LoggedService } from 'src/app/services/logged/logged.service';
import { SalesService } from 'src/app/services/sales/sales.service';


@Component({
  selector: 'app-admin-sales',
  templateUrl: './admin-sales.component.html',
  styleUrls: ['./admin-sales.component.css']
})
export class AdminSalesComponent implements OnInit {
  mobileQuery: MediaQueryList;
  isAdmin: boolean = false;

  private _mobileQueryListener: () => void;


  constructor(private salesService: SalesService, private loggedService: LoggedService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getSales(): Sale[] {
    return this.salesService.getSales();
  }

  ngOnInit(): void {
    this.isAdmin = this.loggedService.getAuth() == 'Admin';
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut(): void {
    this.loggedService.logOut();
  }
}
