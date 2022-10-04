import { Injectable } from '@angular/core';
import { Item } from '../../../../../models/item'
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
  private currentShopCode = '';
  constructor(private authService: AuthService, private http: HttpClient, private productsService: ProductsService) { }


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

}
