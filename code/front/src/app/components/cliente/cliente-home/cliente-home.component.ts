import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { LoggedService } from 'src/app/services/logged/logged.service';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';
import { formatPrice } from 'src/app/utils/utils';
import { Navigation, NavigationExtras, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-home',
  templateUrl: './cliente-home.component.html',
  styleUrls: ['./cliente-home.component.css']
})
export class ClienteHomeComponent implements OnInit {

  nome: string = "palao";
  idade: number = 21;
  formatPrice = formatPrice;

  displayedColumns: string[] = ['name', 'category', 'price', 'carrinho'];
  dataSourceProducts = new MatTableDataSource(this.getProducts());

  constructor(private loggedService: LoggedService, private media: MediaMatcher, private productsService: ProductsService, private router: Router) { }

  getProducts(): Product[] {
    let products: Product[] = [];
    this.productsService.getProducts().subscribe(productsList => products = productsList);
    return Array.from(products.values());
  }

  getcodefromIndex(index: number): string {
    console.log(this.dataSourceProducts.data[index].code);
    return this.dataSourceProducts.data[index].code;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSourceProducts.filter = filterValue.trim().toLowerCase();
  }

  addProductToCart(code: string): void {
    //  servico do carrinho
    this.router.navigateByUrl('/shopping-cart')
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.loggedService.logOut();
  }



}
