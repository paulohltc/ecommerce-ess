import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../../../../../models/product';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private editingCode: string;
  constructor(private http: HttpClient) {
    this.editingCode = '';
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

  // edit product
  getEditingProduct(): Observable<any> {
    return this.http.get<any>(environment.url + '/products/code/' + this.editingCode);
  }

  setEditingProduct(code: string) {
    this.editingCode = code;
  }

  editProduct(product: Product): Observable<any> {
    return this.http.put<any>(environment.url + '/products/code/' + this.editingCode, product);
  }

  updateProductStock(code: string, stock: number): Observable<any> {
    var stockObj = { stock: stock };
    return this.http.put<any>(environment.url + '/products/code/' + code + '/stock', stockObj);
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
