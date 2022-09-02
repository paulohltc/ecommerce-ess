import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[];
  private geladeira: Product = {code: '111', stock: 10, name: 'Geladeira', category:'Doméstico',price:1550,description:'400W muito boa',rating:4.5}
  private microondas: Product = {code: '222', stock:50, name: 'Microondas', category:'Doméstico',price:435,description:'400W muito boa',rating:4.5}
  private mLavar: Product = {code: '333', stock: 25, name: 'Máquina de lavar', category:'Doméstico',price:950,description:'400W muito boa',rating:4.5}
  private airF: Product = {code: '444', stock: 150, name: 'Air FRAI', category:'Doméstico',price:350,description:'400W muito boa',rating:4.5}
  private fogao: Product = {code: '555', stock: 15, name: 'Fogão quatro bocas', category:'Doméstico',price:900,description:'400W muito boa',rating:4.5}
  private tv: Product = {code: '666', stock: 4, name: 'Televisão 75"', category:'Eletrônico',price:6300,description:'400W muito boa',rating:4.5}
  private liqui: Product = {code: '777', stock: 85, name: 'Liquidificador 500W', category:'Doméstico',price:245,description:'400W muito boa',rating:4.5}


  constructor() { this.products = [this.geladeira,this.mLavar,this.microondas,this.airF,this.fogao,this.tv,this.liqui]; }


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
/*
    code: string;
    stock: number;
    name: string;
    category: string;
    price: number;
    description: string;
    rating: number;*/