import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) {

  }


  getProducts(): Observable<Map<string, Product>> {
    return this.http.get<any>(environment.url + '/products');
  }

  getAvailableProducts(): Observable<Map<string, Product>> {
    return this.http.get<any>(environment.url + '/products/available');
  }

  getProduct(code: string): Observable<Product> {
    return this.http.get<any>(environment.url + '/products/code/' + code);
  }

  addProduct(product: Product): Observable<any> {
    return this.http.post<any>(environment.url + '/products', product);
  }
  deleteProduct(code: string): Observable<any> {
    return this.http.delete<any>(environment.url + '/products/code/' + code);
  }

  getEditingProduct(): Observable<any> {
    return this.http.get<any>(environment.url + '/products/editing');
  }

  // edit product
  setEditingProduct(code: string): Observable<any> {
    var body = { code: code };
    return this.http.post<any>(environment.url + '/products/editing', body);
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put<any>(environment.url + '/products/editing', product);
  }

  // shopping cart
  getShoppingCart(): Observable<Map<string, Product>> {
    return this.http.get<any>(environment.url + '/products/cart');
  }
  addProductToCart(code: string): Observable<any> {
    const codeObj = { code: code };
    return this.http.post<any>(environment.url + '/products/cart', codeObj);
  }
  deleteProductFromCart(code: string): Observable<any> {
    return this.http.delete<any>(environment.url + '/products/cart/' + code);
  }
  clearShoppingCart(): Observable<any> {
    return this.http.get<any>(environment.url + '/products/cart/clear');
  }

}
