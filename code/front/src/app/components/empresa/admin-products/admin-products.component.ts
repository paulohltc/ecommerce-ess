import { Component, OnInit } from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, OnDestroy} from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
// export class AdminProductsComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }

export class SidenavResponsiveExample {
  mobileQuery: MediaQueryList;


  //fillerNav = ["Produtos", "Vendas", "Usuários"]

  fillerContent = Array(2).fill(0).map(() =>
      `Open side nav, and click on any navigation to close the opened side nav.`);

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
