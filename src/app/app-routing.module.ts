import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Components/register/register.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { EditprofileComponent } from './Components/myprofile/editprofile/editprofile.component';
import { CheckoutComponent } from './Components/checkout/checkout.component';
import { CartComponent } from './Components/cart/cart.component';
import { MyorderComponent } from './Components/myorder/myorder.component';
import { WhishlistComponent } from './Components/whishlist/whishlist.component';
import { SearchComponent } from './Components/search/search.component';
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
  { path: 'myprofile', component:MyprofileComponent },
  { path: 'editprofile', component:EditprofileComponent }, 
  { path: 'checout', component:CheckoutComponent },
  { path: 'myorder', component:MyorderComponent },
  { path: 'redirectwishlist', redirectTo: '/mywishlist', pathMatch: 'full' },
  { path: 'mywishlist', component:WhishlistComponent },
  { path: 'search', component:SearchComponent },
  { path: 'redirect', redirectTo: '/cart', pathMatch: 'full' }, 
  { path: 'cart', component:CartComponent},
  { path: '**', component: NotFoundComponent },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
