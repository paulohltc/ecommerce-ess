import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Details } from '../../../../../models/details';
import { Item } from '../../../../../models/item';
import { Product } from '../../../../../models/product';
import { Shop } from '../../../../../models/shop';
import { AuthService } from '../auth/auth.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  private shoppingCart: Map<string, Product>;
  private items: Item[] = [];
  private totalPrice: number = 0;

  constructor(private productsService: ProductsService, private auth: AuthService, private http: HttpClient) {
    this.shoppingCart = new Map([]);
  }

  setItems(items: Item[], totalPrice: number) {
    this.items = items;
    this.totalPrice = totalPrice;
  }

  clearItems() {
    this.items = [];
  }

  getShoppingCart(): Map<string, Product> {
    return this.shoppingCart;
  }

  isProductInCart(code: string): boolean {
    return this.shoppingCart.has(code);
  }

  addProductToCart(code: string) {
    this.productsService.getProduct(code).subscribe({
      next: (product) => {
        this.shoppingCart.set(code, product);
      }, error: () => {
        alert('Error');
      }
    })
  }

  deleteProductFromCart(code: string) {
    this.shoppingCart.delete(code);
  }

  clearCart() {
    this.shoppingCart = new Map([]);
  }

  purchaseItems(details: Details): Observable<any> {
    var shop: Shop = { code: '-', email: this.auth.getLoggedEmail(), ...details, items: this.items, total: this.totalPrice };
    for (let item of this.items) {
      var newQty = item.product.stock - item.qty;
      var prodCode = item.product.code;
      this.productsService.updateProductStock(prodCode, newQty).subscribe({
        next: () => { }
      })
    }
    this.clearItems();
    this.clearCart();
    return this.http.post<any>(environment.url + '/shops', shop);
  }
}
