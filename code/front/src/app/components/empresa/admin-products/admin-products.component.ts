import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { formatPrice } from 'src/app/utils/utils';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})

export class AdminProductsComponent implements OnInit {


  mobileQuery: MediaQueryList;
  formatPrice = formatPrice;

  displayedColumns: string[] = ['code', 'stock', 'name', 'category', 'price', 'edit'];
  dataSourceProducts = new MatTableDataSource(this.getProducts());

  private _mobileQueryListener: () => void;

  constructor(private auth: AuthService, private router: Router, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private productsService: ProductsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.auth.logout();
  }


  getcodefromIndex(index: number): string {
    console.log(this.dataSourceProducts.data[index].code);
    return this.dataSourceProducts.data[index].code;
  }
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }

  getProducts(): Product[] {
    let products: Product[] = [];
    this.productsService.getProducts().subscribe(productsList => products = productsList);
    return Array.from(products.values());
  }

  refresh(): void {
    this.productsService.getProducts().subscribe((res) => {
      this.dataSourceProducts.data = Array.from(res.values());
      this.changeDetectorRef.detectChanges();
    })
  }
  // removeProduct(code: string): void {
  //   this.productsService.removeProduct(code);
  //   this.refresh();
  // }

  editProduct(code: string): void {
    this.productsService.loginEditProduct(code); // passar para servico o produto atual
    this.router.navigateByUrl('/edit-product')
  }
}
