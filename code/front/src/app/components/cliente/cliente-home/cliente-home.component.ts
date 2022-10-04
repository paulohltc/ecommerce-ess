import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Product } from '../../../../../../models/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { formatPrice } from 'src/app/utils/utils';
import { Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';




@Component({
  selector: 'app-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {

  gridColumns = 5;
  formatPrice = formatPrice;
  msgAddShopDisplay = false;
  availableProducts: Product[] = [];

  constructor(private shoppingCartService: ShoppingCartService, private productsService: ProductsService, private router: Router) { }


  ngOnInit(): void {
    this.getAvailableProducts();
  }



  onMove(): void {
    this.msgAddShopDisplay = false;
  }

  getAvailableProducts() {
    this.productsService.getAvailableProducts().subscribe({
      next: (products) => {
        this.availableProducts = Object.values(products);
      }, error: () => {
        alert('Error');
      }
    })
  }
  addToCart(index: number) {
    var code = this.availableProducts[index].code;
    this.shoppingCartService.addProductToCart(code);
    alert('Produto adicionado com sucesso');
  }


}
