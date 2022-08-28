import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClienteHomeComponent } from './components/cliente/cliente-home/cliente-home.component';
import { ClienteShoppingCartComponent } from './components/cliente/cliente-shopping-cart/cliente-shopping-cart.component';
import { ClienteDebitCardComponent } from './components/cliente/cliente-debit-card/cliente-debit-card.component';
import { ClienteProfilePageComponent } from './components/cliente/cliente-profile-page/cliente-profile-page.component';
import { AdminProductsComponent } from './components/empresa/admin-products/admin-products.component';
import { AdminSalesComponent } from './components/empresa/admin-sales/admin-sales.component';
import { AdminUsersComponent } from './components/empresa/admin-users/admin-users.component';
import { AdminProfilePageComponent } from './components/empresa/admin-profile-page/admin-profile-page.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClienteHomeComponent,
    ClienteShoppingCartComponent,
    ClienteDebitCardComponent,
    ClienteProfilePageComponent,
    AdminProductsComponent,
    AdminSalesComponent,
    AdminUsersComponent,
    AdminProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
