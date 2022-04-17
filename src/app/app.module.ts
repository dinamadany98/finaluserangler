import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MyorderComponent } from './Components/myorder/myorder.component';
import { SearchComponent } from './Components/search/search.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

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
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
