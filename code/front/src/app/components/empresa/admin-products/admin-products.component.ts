import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
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

  displayedColumns: string[] = ['code', 'stock', 'name', 'price', 'edit', 'remove'];
  products: Product[] = [];
  dataSourceProducts = this.products;

  private _mobileQueryListener: () => void;

  constructor(private auth: AuthService, private router: Router, private changeDetectorRef: ChangeDetectorRef, private media: MediaMatcher, private productsService: ProductsService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

  }

  ngOnInit() {
    this.refresh();
  }

  ngOnDestroy() {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logout(): void {
    this.auth.logout();
  }


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
  deleteProduct(index: string): void {
    var code = this.products[+index].code;
    this.productsService.deleteProduct(code).subscribe({
      next: () => {
        this.refresh();
      }, error: () => {
        alert("Error");
      }
    });
  }

  editProduct(index: string): void {
    var code = this.products[+index].code;
    this.productsService.setEditingProduct(code).subscribe({
      next: () => {
        this.router.navigateByUrl('/edit-product')
      }, error: () => {
        alert('Error');
      }
    });
  }
}
