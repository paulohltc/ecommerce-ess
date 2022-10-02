import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from '../../../../../../models/product';
import { MatTableDataSource } from '@angular/material/table';
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
        for (let i = 0; i < this.shoppingCart.length; i++) {
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

  continuePurchase() {
    var items: Item[] = [];
    for (let i = 0; i < this.shoppingCart.length; i++) {
      items.push({ product: this.shoppingCart[i], qty: this.quantities[i] });
    }
    this.shopsService.setItems(items, this.totalPrice());
    this.router.navigateByUrl('/cliente-purchase')
  }

}
