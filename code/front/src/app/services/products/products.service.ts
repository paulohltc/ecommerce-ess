import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  constructor() { this.products = []; }


  getProducts(): Observable<Product[]> {
    const products = of(this.products);
    return products;
  }

  productExists(code: string): boolean {
    return +code < this.products.length
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(code: string): void {
    if (this.productExists(code)) {
      this.products.splice(+code, 1);;
    }
  }

}
