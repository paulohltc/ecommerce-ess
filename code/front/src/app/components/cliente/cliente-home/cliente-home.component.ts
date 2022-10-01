import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
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

  constructor(private shoppingCartService: ShoppingCartService, private media: MediaMatcher, private productsService: ProductsService, private router: Router) { }


  ngOnInit(): void {
    this.getAvailableProducts();
  }



  onMove(): void {
    this.msgAddShopDisplay = false;
  }

  getAvailableProducts() {
    this.productsService.getAvailableProducts().subscribe({
      next: (products) => {
        console.log(products);
        this.availableProducts = Object.values(products);
      }, error: () => {
        alert('Error');
      }
    })
  }


  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 5 ? 6 : 5;
  }


}
