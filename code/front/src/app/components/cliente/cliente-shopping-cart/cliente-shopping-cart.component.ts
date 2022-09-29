import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';
import { formatPrice } from 'src/app/utils/utils';
import { SalesService } from 'src/app/services/sales/sales.service';


@Component({
  selector: 'app-cliente-shopping-cart',
  templateUrl: './cliente-shopping-cart.component.html',
  styleUrls: ['./cliente-shopping-cart.component.css']
})
export class ClienteShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'qty', 'delete'];
  dataSource = new MatTableDataSource(this.getCart())
  formatPrice = formatPrice;

  constructor(private salesService: SalesService, private changeDetectorRef: ChangeDetectorRef, private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
  }

  getCart(): Shop[] {
    let shop: Map<string, Shop> = new Map([]);
    this.shoppingCartService.getCart().subscribe(productsList => shop = productsList);
    return Array.from(shop.values());
  }

  refresh(): void {
    this.shoppingCartService.getCart().subscribe((res) => {
      this.dataSource.data = Array.from(res.values());
      this.changeDetectorRef.detectChanges();
    })
  }

  purchase(CPF: string): void {
    for (let shop of this.getCart()) {
      let totalPrice = shop.qty * shop.product.price;
      this.salesService.addSale({ shop: shop, CPFuser: CPF, code: 'define-later', totalPrice: totalPrice });
    }
    this.shoppingCartService.clearCart();
    this.refresh();
  }

}
