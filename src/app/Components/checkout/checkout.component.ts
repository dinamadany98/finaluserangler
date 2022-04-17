import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { IProductService } from 'src/app/services/iproduct.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  
  newshipping:Icheckout={} as Icheckout
  cartlist:Icart[]=[]; 
  prdlisticat: Iproduct[] = [];
  constructor(private rot:Router,private checkservice:CheckoutService,private cartservice:CartService,
    private prdapisevice: IProductService) { }
 
  ngOnInit(): void {
    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    }); 

    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });  
  }
  total=0
  sum(pric:any,count:any){
   this.total+=(+pric * +count);
return +pric * +count;
  }
  insert(){
     
    this.checkservice.addshippigdetails(this.newshipping).subscribe({
      next:(shipping)=>{
     this.rot.navigate(['/home'])
      },

      error:(err)=>{
        alert("error")
      }
    })


  }


}
