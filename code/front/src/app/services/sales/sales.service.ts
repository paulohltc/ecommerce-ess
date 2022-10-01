import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Sale } from 'src/app/models/sale';


@Injectable({
  providedIn: 'root'
})

export class SalesService {
  sales: Sale[] = [];
  size: number = 0;

  private granada: Sale = { code: '1234', CPFuser: '00000000001', shop: { qty: 2, product: { code: '00000', stock: 3, name: "granada", price: 1000, description: "faz muito barulho" } }, totalPrice: 1000 }


  constructor() {
    this.sales = [this.granada]
    this.size = 1

  }

  getSales(): Sale[] {
    return this.sales;
  }

  getProducts(): Observable<Sale[]> {
    const products = of(this.sales);
    return products;
  }

  saleExists(code: string): boolean {
    return +code < this.sales.length
  }

  getSale(code: string): Sale {
    return this.sales[+code];
  }

  addSale(sale: Sale): void {
    sale.code = this.size.toString();
    this.sales.push(sale);
    this.size++;
  }

}
