import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { CartComponent } from './Components/cart/cart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './Components/header/header.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { SearchComponent } from './Components/search/search.component';
import { MyorderComponent } from './Components/myorder/myorder.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { EditprofileComponent } from './Components/myprofile/editprofile/editprofile.component';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { LoginComponent } from './Components/login/login.component';
import { LoginService } from './services/login.service';
import { AccessLoginGuard } from './access-login.guard';
import { NgxPayPalModule } from 'ngx-paypal';
import { ProductByCategoryComponent } from './Components/product-by-category/product-by-category.component';
import { IvyCarouselModule } from 'angular-responsive-carousel';
 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    MainLayoutComponent,
    CartComponent,
    CheckoutComponent,
    MyorderComponent,
    SearchComponent,
    WishlistComponent,
    ProductdetailsComponent,
    MyprofileComponent,
    EditprofileComponent,
    RegisterComponent,
    NotFoundComponent,
    LoginComponent,
    ProductByCategoryComponent,
    
  ],
  imports: [
    NgxPayPalModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    IvyCarouselModule
  ],
  providers: [
    [AccessLoginGuard, LoginService],
    {
      provide: HTTP_INTERCEPTORS,

      useClass: LoginService,

      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
