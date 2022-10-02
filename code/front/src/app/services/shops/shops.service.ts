import { Injectable } from '@angular/core';
import { Item } from '../../../../../models/item'
import { Details } from '../../../../../models/details'
import { Shop } from '../../../../../models/shop'
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  private items: Item[] = [];
  private totalPrice: number = 0;
  constructor(private authService: AuthService, private http: HttpClient) { }


  setItems(items: Item[], totalPrice: number) {
    this.items = items;
    this.totalPrice = totalPrice;
  }

  clearItems() {
    this.items = [];
  }

  purchaseItems(details: Details): Observable<any> {
    var shop: Shop = { code: '-', email: this.authService.getLoggedEmail(), ...details, items: this.items, total: this.totalPrice };
    this.clearItems();
    return this.http.post<any>(environment.url + '/shops', shop);
  }
}
