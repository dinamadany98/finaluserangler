import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { HomeComponent } from './Components/home/home.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { EditprofileComponent } from './Components/myprofile/editprofile/editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginGuard } from './login.guard';
import { LoginService } from './Services/login.service';
import { CartComponent } from './Components/cart/cart.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    NotFoundComponent,
    MainLayoutComponent,
    MyprofileComponent,
    EditprofileComponent,
    CartComponent,
    ProductdetailsComponent,
    WishlistComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    NgbModule,
  ],

  providers: [
    [LoginGuard, LoginService],

    {
      provide: HTTP_INTERCEPTORS,

      useClass: LoginService,

      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
