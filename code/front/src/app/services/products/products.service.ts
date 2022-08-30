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
    let exists = false
    for (let product of this.products)
      if (product.productCode == code) exists = true;

    return exists;
  }

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(index: number): void {
    this.products.splice(index, 1);
  }

}
