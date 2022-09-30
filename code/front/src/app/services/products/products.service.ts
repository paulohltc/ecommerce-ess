import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {



  // private geladeira: Product = { code: '0', stock: 10, name: 'Geladeira', category: 'Doméstico', price: 1550, description: '400W muito boa', rating: 4.5 }
  // private microondas: Product = { code: '1', stock: 50, name: 'Microondas', category: 'Doméstico', price: 435, description: '400W muito boa', rating: 4.5 }
  // private fogao: Product = { code: '2', stock: 15, name: 'Fogão quatro bocas', category: 'Doméstico', price: 900, description: '400W muito boa', rating: 4.5 }
  // private tv: Product = { code: '3', stock: 4, name: 'Televisão 75"', category: 'Eletrônico', price: 6300, description: '400W muito boa', rating: 4.5 }
  // private liqui: Product = { code: '4', stock: 85, name: 'Liquidificador 500W', category: 'Doméstico', price: 245, description: '400W muito boa', rating: 4.5 }


  constructor(private http: HttpClient) {

  }


  getProducts(): Observable<Map<string, Product>> {
    return this.http.get<any>(environment.url + '/products');
  }

  getProduct(code: string): Observable<Product> {
    return this.http.get<any>(environment.url + '/products/' + code);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(environment.url + '/products', product);
  }
  // deleteProduct(code: string): Observable<any> {

  // }

  // updateProduct(code: string, product: Product): void {
  //   product.code = code;
  //   this.products[+code] = product;
  // }

}
