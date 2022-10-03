import { Injectable } from '@angular/core';
import { Item } from '../../../../../models/item'
import { Details } from '../../../../../models/details'
import { Shop } from '../../../../../models/shop'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  private items: Item[] = [];
  private currentShopCode = '';
  private totalPrice: number = 0;
  constructor(private authService: AuthService, private http: HttpClient, private productsService: ProductsService) { }


  setItems(items: Item[], totalPrice: number) {
    this.items = items;
    this.totalPrice = totalPrice;
  }

  clearItems() {
    this.items = [];
  }

  getCurrentShopCode() {
    return this.currentShopCode;
  }

  setCurrentShop(code: string) {
    this.currentShopCode = code;
  }

  clearCurrentShop() {
    this.currentShopCode = '';
  }

  getShops(): Observable<Map<string, Shop>> {
    return this.http.get<any>(environment.url + '/shops');
  }

  getShopItems(): Observable<Item[]> {
    return this.http.get<any>(environment.url + '/shops/items/' + this.currentShopCode);
  }

  getShopsFromClient(): Observable<Map<string, Shop>> {
    var email = this.authService.getLoggedEmail();
    return this.http.get<any>(environment.url + '/shops/' + email);
  }

  purchaseItems(details: Details): Observable<any> {
    var shop: Shop = { code: '-', email: this.authService.getLoggedEmail(), ...details, items: this.items, total: this.totalPrice };
    for (let item of this.items) {
      var newQty = item.product.stock - item.qty;
      var prodCode = item.product.code;
      this.productsService.updateProductStock(prodCode, newQty).subscribe({
        next: () => { }
      })
    }
    this.clearItems();
    this.productsService.clearShoppingCart().subscribe({
      next: () => { }
    });
    return this.http.post<any>(environment.url + '/shops', shop);
  }
}
