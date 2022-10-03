import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { ClienteHomeComponent } from './components/cliente/cliente-home/cliente-home.component';
import { ClienteShoppingCartComponent } from './components/cliente/cliente-shopping-cart/cliente-shopping-cart.component';
import { ClienteProfilePageComponent } from './components/cliente/cliente-profile-page/cliente-profile-page.component';
import { AdminProductsComponent } from './components/empresa/admin-products/admin-products.component';
import { AdminSalesComponent } from './components/empresa/admin-sales/admin-sales.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminAddProductComponent } from './components/empresa/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './components/empresa/admin-edit-product/admin-edit-product.component';
import { ClientePurchaseComponent } from './components/cliente/cliente-purchase/cliente-purchase.component';
import { ItemsComponent } from './components/items/items.component';



const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'items', component: ItemsComponent
  },

  // Rotas de cliente
  {
    path: 'cliente-home', component: ClienteHomeComponent
  },
  {
    path: 'shopping-cart', component: ClienteShoppingCartComponent
  },
  {
    path: 'cliente-purchase', component: ClientePurchaseComponent
  },
  {
    path: 'cliente-profile-page', component: ClienteProfilePageComponent
  },

  // Rotas de funcionários
  {
    path: 'products', component: AdminProductsComponent
  },
  {
    path: 'sales', component: AdminSalesComponent
  },
  {
    path: 'add-product', component: AdminAddProductComponent
  },
  {
    path: 'edit-product', component: AdminEditProductComponent
  },


  // redirect to home
  {
    path: '**', redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
