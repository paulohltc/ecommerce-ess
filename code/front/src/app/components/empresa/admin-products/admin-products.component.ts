import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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

  displayedColumns: string[] = ['code', 'stock', 'name', 'price', 'edit'];
  products: Product[] = [];
  dataSourceProducts = this.products;

  private _mobileQueryListener: () => void;

  constructor(private auth: AuthService, private router: Router, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private productsService: ProductsService) {
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

  logout(): void {
    this.auth.logout();
  }


  // getcodefromIndex(index: number): string {
  //   console.log(this.dataSourceProducts.data[index].code);
  //   return this.dataSourceProducts.data[index].code;
  // }
  // applyFilter(event: Event): void {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  // }

  getProducts() {
    this.productsService.getProducts().subscribe({
      next: (products: Map<string, Product>) => {
        this.products = Object.values(products);
        this.dataSourceProducts = this.products;
      }, error: () => {
        alert("Error");
      }
    }

    );
  }

  refresh() {
    this.getProducts();
    this.changeDetectorRef.detectChanges();
  }
  // removeProduct(code: string): void {
  //   this.productsService.removeProduct(code);
  //   this.refresh();
  // }

  // editProduct(code: string): void {
  //   this.productsService.loginEditProduct(code); // passar para servico o produto atual
  //   this.router.navigateByUrl('/edit-product')
  // }
}
