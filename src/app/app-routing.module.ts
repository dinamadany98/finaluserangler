import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './Components/cart/cart.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { HomeComponent } from './Components/home/home.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { MyorderComponent } from './Components/myorder/myorder.component';
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
  { path: 'checout', component:CheckoutComponent },
  { path: 'myorder', component:MyorderComponent },
  { path: 'redirectwishlist', redirectTo: '/mywishlist', pathMatch: 'full' },
  { path: 'mywishlist', component:WishlistComponent },
  { path: 'redirectsearch', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component:SearchComponent },
  { path: 'redirect', redirectTo: '/cart', pathMatch: 'full' }, 
  { path: 'cart', component:CartComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
