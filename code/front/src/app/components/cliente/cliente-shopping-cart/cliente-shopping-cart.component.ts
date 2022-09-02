import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Shop } from 'src/app/models/shop';
import { LoggedService } from 'src/app/services/logged/logged.service';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-cliente-shopping-cart',
  templateUrl: './cliente-shopping-cart.component.html',
  styleUrls: ['./cliente-shopping-cart.component.css']
})
export class ClienteShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'preco', 'delete'];
  dataSource = new MatTableDataSource(this.getCart())

  constructor(private shoppingCartService: ShoppingCartService, private loggedService: LoggedService) { }

  ngOnInit(): void {
  }

  getCart(): Shop[] {
    let shop: Map<string, Shop> = new Map([]);
    this.shoppingCartService.getCart().subscribe(productsList => shop = productsList);
    return Array.from(shop.values());
  }

  refresh(): void {

  }

  logOut(): void {
    this.loggedService.logOut();
  }
}
