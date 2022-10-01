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



  productForm: FormGroup = this.formBuilder.group({
    name: new FormControl('', [Validators.required]),
    stock: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
  });



  constructor(private router: Router, private productsServices: ProductsService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.getEditingProduct();
  }

  validForm(): boolean {
    let valid = true;
    Object.keys(this.productForm.controls).forEach(key => {
      valid = (this.productForm.controls[key].status == "VALID") && valid;
    });
    return valid;
  }

  clearProductForm(): void {
    this.productForm.patchValue({
      name: [''],
      stock: [''],
      description: [''],
      price: ['']
    })
  }

  getEditingProduct() {
    this.productsServices.getEditingProduct().subscribe({
      next: (product) => {
        console.log(product);
        this.productForm.patchValue({
          name: [product.name],
          stock: [product.stock],
          description: [product.description],
          price: [product.price]
        });
      }, error: () => {
        alert('Error');
      }
    })
  }


  editProduct(): void {
    if (this.validForm()) {
      this.productsServices.editProduct(this.productForm.value).subscribe({
        next: () => {
          this.clearProductForm();
          this.router.navigateByUrl('/products');
        }, error: () => {
          alert('Error');
        }
      })
    } else {
      this.errorMsg = true;
    }
  }

}
