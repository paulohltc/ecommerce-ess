import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Shop } from 'src/app/models/shop';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  cart: Map<string, Shop> = new Map([]);

  constructor() { }

  shopExists(code: string): boolean {
    return this.cart.has(code);
  }

  getShopFromCode(code: string): Shop {
    // assumindo que CPF existe
    return this.cart.get(code)!;
  }

  getQtyFromCode(code: string): number {
    return this.cart.get(code)!.qty;
  }


  getCart(): Observable<Map<string, Shop>> {
    const cart = of(this.cart);
    return cart;
  }

  addShop(shop: Shop): void {
    let code = shop.product.code;
    this.cart.set(code, shop);
  }

  removeShop(code: string): void {
    this.cart.delete(code);
  }

  changeQty(code: string, increase: boolean): void {
    let shop = this.getShopFromCode(code);
    if (increase) {
      shop.qty++;
    }
    else if (shop.qty != 1) {
      shop.qty--;
    }
  }
}
