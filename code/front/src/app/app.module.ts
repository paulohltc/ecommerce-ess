import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from "@angular/flex-layout";



import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ClienteHomeComponent } from './components/cliente/cliente-home/cliente-home.component';
import { ClienteShoppingCartComponent } from './components/cliente/cliente-shopping-cart/cliente-shopping-cart.component';
import { ClienteProfilePageComponent } from './components/cliente/cliente-profile-page/cliente-profile-page.component';
import { AdminProductsComponent } from './components/empresa/admin-products/admin-products.component';
import { AdminSalesComponent } from './components/empresa/admin-sales/admin-sales.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminAddProductComponent } from './components/empresa/admin-add-product/admin-add-product.component';
import { AdminEditProductComponent } from './components/empresa/admin-edit-product/admin-edit-product.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { ClientePurchaseComponent } from './components/cliente/cliente-purchase/cliente-purchase.component';
import { ItemsComponent } from './components/items/items.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClienteHomeComponent,
    ClienteShoppingCartComponent,
    ClienteProfilePageComponent,
    AdminProductsComponent,
    AdminSalesComponent,
    AdminAddProductComponent,
    AdminEditProductComponent,
    NavbarComponent,
    ClientePurchaseComponent,
    ItemsComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatPaginatorModule,
    MatSortModule,
    MatListModule,
    MatTableModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatCardModule,
    FlexLayoutModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
