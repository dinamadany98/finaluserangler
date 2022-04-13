import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icheckout } from 'src/app/Models/icheckout';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { IProductService } from 'src/app/Services/iproduct.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  newshipping:Icheckout={} as Icheckout
  cartlist:Icart[]=[];
  prdlisticat: IProduct[] = [];
  constructor(private rot:Router,private checkservice:CheckoutService,private cartservice:CartService,
    private prdapisevice: IProductService) { }

  ngOnInit(): void {
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    }); 


    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    }); 
  
  }

  total=0
  sum(pric:any,count:any){
   this.total+=(+pric * +count);
return +pric * +count;
  }
  del(id:any){
    this.cartservice.deletfromcart(id).subscribe({
      next:()=>{
     this.rot.navigate(['/cart'])
      },
    
      error:(err)=>{
        alert("error")
      }
    })
    }

    clearcart(){
      
    }


  }

