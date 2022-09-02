import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  size: number = 0;
  private geladeira: Product = { code: '0', stock: 10, name: 'Geladeira', category: 'Doméstico', price: 1550, description: '400W muito boa', rating: 4.5 }
  private microondas: Product = { code: '1', stock: 50, name: 'Microondas', category: 'Doméstico', price: 435, description: '400W muito boa', rating: 4.5 }
  private fogao: Product = { code: '2', stock: 15, name: 'Fogão quatro bocas', category: 'Doméstico', price: 900, description: '400W muito boa', rating: 4.5 }
  private tv: Product = { code: '3', stock: 4, name: 'Televisão 75"', category: 'Eletrônico', price: 6300, description: '400W muito boa', rating: 4.5 }
  private liqui: Product = { code: '4', stock: 85, name: 'Liquidificador 500W', category: 'Doméstico', price: 245, description: '400W muito boa', rating: 4.5 }


  constructor() {
    this.products = [this.geladeira, this.microondas, this.fogao, this.tv, this.liqui];
    this.size = 5;
  }


  getProducts(): Observable<Product[]> {
    const products = of(this.products);
    return products;
  }

  productExists(code: string): boolean {
    return +code < this.products.length
  }

  addProduct(product: Product): void {
    product.code = this.size.toString();
    product.rating = 5;
    this.products.push(product);
    this.size++;
  }

  removeProduct(code: string): void {
    if (this.productExists(code)) {
      this.products.splice(+code, 1);;
    }
  }

}
