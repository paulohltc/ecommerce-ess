import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../../../models/product';
import { formatPrice } from 'src/app/utils/utils';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';
import { ShopsService } from 'src/app/services/shops/shops.service';
import { Item } from '../../../../../../models/item';


@Component({
  selector: 'app-cliente-shopping-cart',
  templateUrl: './cliente-shopping-cart.component.html',
  styleUrls: ['./cliente-shopping-cart.component.css']
})
export class ClienteShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'qty', 'delete'];
  shoppingCart: Product[] = [];
  quantities: number[] = [];
  dataSource = this.shoppingCart;
  formatPrice = formatPrice;

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private productsService: ProductsService, private shopsService: ShopsService) { }

  ngOnInit() {
    this.refresh();
  }

  totalPrice(): number {
    var sum = 0;
    for (let i = 0; i < this.shoppingCart.length; i++) {
      sum += this.quantities[i] * this.shoppingCart[i].price;
    }
    return sum;
  }

  getCart() {
    this.productsService.getShoppingCart().subscribe({
      next: (shoppingCart) => {
        this.shoppingCart = Object.values(shoppingCart);
        var diff = this.shoppingCart.length - this.quantities.length;
        for (let i = 0; i < diff; i++) {
          this.quantities.push(1);
        }
        this.dataSource = this.shoppingCart;
      }, error: () => {
        alert('Error');
      }
    })
  }

  refresh() {
    this.getCart();
    this.changeDetectorRef.detectChanges();
  }

  removeItemFromCart(index: number) {
    var code = this.shoppingCart[index].code;
    this.quantities.splice(index, 1);
    this.productsService.deleteProductFromCart(code).subscribe({
      next: () => {
        this.refresh();
      }, error: () => {
        alert('Error')
      }
    });
  }

  continuePurchase() {
    var cartSize = this.shoppingCart.length;
    if (cartSize == 0) {
      alert('Carrinho vazio')
    }
    else {
      var valid = true;
      this.refresh();
      var items: Item[] = [];
      for (let i = 0; i < cartSize; i++) {
        if (this.quantities[i] > this.shoppingCart[i].stock || this.quantities[i] % 1 !== 0) {
          valid = false;
        }
        items.push({ product: this.shoppingCart[i], qty: this.quantities[i] });
      }
      if (valid) {
        this.shopsService.setItems(items, this.totalPrice());
        this.router.navigateByUrl('/cliente-purchase')
      }
    }
  }

}
