import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { EditprofileComponent } from './Components/myprofile/editprofile/editprofile.component';
//import { LoginGuard } from './login.guard';
import { LoginGuard } from './login.guard';

import { CartComponent } from './Components/cart/cart.component';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
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

  { path: 'register', component: RegisterComponent },

  { path: 'login', component: LoginComponent },
  {
    path: 'myprofile',
    component: MyprofileComponent,
    canActivate: [LoginGuard],
  },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'product/:pid', component: ProductdetailsComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'myprofile', component: MyprofileComponent },
  { path: 'editprofile', component: EditprofileComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
