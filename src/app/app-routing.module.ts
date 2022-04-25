import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessLoginGuard } from './access-login.guard';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MyorderComponent } from './Components/myorder/myorder.component';
import { EditprofileComponent } from './Components/myprofile/editprofile/editprofile.component';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { ProductByCategoryComponent } from './Components/product-by-category/product-by-category.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { RegisterComponent } from './Components/register/register.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { SearchComponent } from './Components/search/search.component';
import { WishlistComponent } from './Components/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
    ],
  },
  { path: 'product/:pid', component: ProductdetailsComponent },

  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [AccessLoginGuard],
  },

  {
    path: 'productbycat/:id',
    component:ProductByCategoryComponent,

  },


  {
    path: 'myorder',
    component: MyorderComponent,
    canActivate: [AccessLoginGuard],
  },
  { path: 'redirectwishlist', redirectTo: '/mywishlist', pathMatch: 'full' },
  {
    path: 'mywishlist',
    component: WishlistComponent,
    canActivate: [AccessLoginGuard],
  },
  { path: 'redirectsearch', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchComponent },
  { path: 'redirect', redirectTo: '/cart', pathMatch: 'full' },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AccessLoginGuard]
  },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [AccessLoginGuard],
  },
  {
    path: 'editprofile',
    component: EditprofileComponent,
    canActivate: [AccessLoginGuard],
  },
  { path: 'register', component: RegisterComponent },
  { path: 'password/reset', component:ResetPasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
