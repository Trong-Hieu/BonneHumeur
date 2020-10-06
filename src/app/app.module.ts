import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule} from '@angular/fire'
import { AngularFireDatabaseModule} from '@angular/fire/database'
import { environment} from '../environments/environment'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';

import { TestComponent } from './test/test.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainPageComponent } from './main-page/main-page.component';
import { AdminSellerComponent } from './Admin/admin-seller/admin-seller.component'
import { AdminOrdersManageComponent } from './Admin/admin-orders-manage/admin-orders-manage.component'
import { AdminProductsManageComponent } from './Admin/admin-products-manage/admin-products-manage.component'
import { ProductListComponent } from './product-list/product-list.component'
import { ProductFormComponent } from './product-form/product-form.component';

import { RouterModule } from '@angular/router';

import { FirebaseServiceService } from './Services/firebase-service.service';
import { UserService } from './Services/user.service'
import { AuthService } from './Services/auth.service';
import { ProductService } from './Services/product.service'

import { GuardAdminAuthService } from './Services/guard-admin-auth.service'
import { GuardAuthService } from './Services/guard-auth.service';




@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    NavBarComponent,
    MainPageComponent,
    AdminSellerComponent,
    AdminOrdersManageComponent,
    AdminProductsManageComponent,
    ProductListComponent,
    ProductFormComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    BrowserAnimationsModule,
    MatProgressBarModule,
    MatIconModule,
    RouterModule.forRoot([
      { path: '', component: MainPageComponent },
      { path: 'products/:category/:subcategory', component: ProductListComponent },


      { path: 'admin/orders', component: AdminOrdersManageComponent, canActivate: [GuardAuthService, GuardAdminAuthService] },
      { path: 'admin/products', component: AdminProductsManageComponent, canActivate: [GuardAuthService, GuardAdminAuthService] },

    ])
  ],
  providers: [
    FirebaseServiceService,
    UserService,
    AuthService,
    GuardAdminAuthService,
    GuardAuthService,
    ProductService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
