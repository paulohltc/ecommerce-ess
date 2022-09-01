import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Map<string, Product>;
  constructor() { this.products = new Map([]); }


  getProducts(): Observable<Map<string, Product>> {
    const products = of(this.products);
    return products;
  }

  productExists(code: string): boolean {
    for (let [codeKey, userValue] of this.products) {
      if (codeKey == code) return true;
    }
    return false;
  }

  addProduct(product: Product): void {
    this.products.set(product.code, product);
  }

  removeProduct(code: string): void {
    this.products.delete(code);
  }

}
