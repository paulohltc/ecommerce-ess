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


  showPassword: boolean = false;
  productForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
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


  editProduct(): void {
    if (this.validForm()) {
      let code = 0;
      // this.productsServices.updateProduct(code, this.productForm.value);
      this.router.navigate(['products'])
      this.cleanProductForm();
    } else {
      this.errorMsg = true;
    }
  }

}
