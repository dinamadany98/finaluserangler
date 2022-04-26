import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  prdlisticat: Iproduct[] = [];
  cartlist:Icart[]=[];
  constructor(private loginservice: LoginService, private router: Router,private cartservice:CartService
    ,private prdapisevice: IProductService) {}

  loggedin() {

    if(localStorage.getItem('login')&&localStorage.getItem('role')=='user')
        return true;

    return false;
  }
  logoutuser() {
    localStorage.removeItem('login');
    this.router.navigate(['/login']);
  }
  ngOnInit(): void {
    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    });



    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });

  }
  total:number=0;
  sum(pric:number,count:number){

    this.total+=(pric * count);
 return +pric * +count;
   }
}
