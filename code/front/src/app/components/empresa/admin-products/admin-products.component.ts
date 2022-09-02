import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoggedService } from 'src/app/services/logged/logged.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {


  mobileQuery: MediaQueryList;
  isAdmin: boolean = false;

  displayedColumns: string[] = ['code', 'stock', 'name', 'category', 'price', 'delete'];
  dataSourceProducts = new MatTableDataSource(["lalal", "fgdg"]);

  private _mobileQueryListener: () => void;

  constructor(private loggedService: LoggedService, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

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

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }

}
