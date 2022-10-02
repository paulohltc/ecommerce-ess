import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { MatTableDataSource } from '@angular/material/table';
import { formatPrice } from 'src/app/utils/utils';
import { ProductsService } from 'src/app/services/products/products.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cliente-shopping-cart',
  templateUrl: './cliente-shopping-cart.component.html',
  styleUrls: ['./cliente-shopping-cart.component.css']
})
export class ClienteShoppingCartComponent implements OnInit {

  displayedColumns: string[] = ['name', 'price', 'qty', 'delete'];
  shoppingCart: Product[] = [];
  dataSource = this.shoppingCart;
  formatPrice = formatPrice;

  constructor(private router: Router, private changeDetectorRef: ChangeDetectorRef, private productsService: ProductsService) { }

  ngOnInit() {
    this.refresh();
  }

  getCart() {
    this.productsService.getShoppingCart().subscribe({
      next: (shoppingCart) => {
        this.shoppingCart = Object.values(shoppingCart);
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
    this.router.navigateByUrl('/cliente-purchase')
  }

}
