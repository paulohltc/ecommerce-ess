import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products/products.service';

@Component({
  selector: 'app-admin-edit-product',
  templateUrl: './admin-edit-product.component.html',
  styleUrls: ['./admin-edit-product.component.css']
})
export class AdminEditProductComponent implements OnInit {
  errorMsg = false;

  editingProduct: Product = this.productsServices.getEditingProduct();
  showPassword: boolean = false;
  productForm: FormGroup = this.formBuilder.group({
    name: new FormControl(this.editingProduct.name, [Validators.required]),
    category: new FormControl(this.editingProduct.category, [Validators.required]),
    stock: new FormControl(this.editingProduct.stock, [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl(this.editingProduct.description, [Validators.required]),
    price: new FormControl(this.editingProduct.price, [Validators.required, Validators.pattern("^[0-9]*$")]),
  });



  constructor(private router: Router, private productsServices: ProductsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  }

  validForm(): boolean {
    let valid = true;
    Object.keys(this.productForm.controls).forEach(key => {
      valid = (this.productForm.controls[key].status == "VALID") && valid;
    });
    return valid;
  }

  cleanProductForm(): void {
    this.productForm.patchValue({
      name: [''],
      category: [''],
      stock: [''],
      description: [''],
      price: ['']
    })
  }

  logoutEdit(): void {
    this.productsServices.logoutEditProduct();
  }

  editProduct(): void {
    if (this.validForm()) {
      let code = this.editingProduct.code;
      this.productsServices.updateProduct(code, this.productForm.value);
      this.router.navigate(['products'])
      this.cleanProductForm();
    } else {
      this.errorMsg = true;
    }
  }

}
