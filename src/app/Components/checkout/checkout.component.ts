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
    private prdapisevice: IProductService) { 
      
    }
    total=0
  ngOnInit() {
    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    }); 
 
      
    
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });  
  }

  sum(pric:number,count:number){
    
   this.total+=(+pric * +count);
return +pric * +count;
  }
  insert(){
     
    this.checkservice.addshippigdetails(this.newshipping).subscribe({
      next:(shipping)=>{
     this.rot.navigate(['/myorder'])
      },

      error:(err)=>{
        alert("error")
      }
    })


  }
  totalcal(){
    for(let cart of this.cartlist){
      for(let prod of this.prdlisticat){
if(cart.product_id==prod.id){
  this.total +=(prod.selling_price * cart.prod_qty);

}

      }
      
      
      }
      return this.total;
  }
}
