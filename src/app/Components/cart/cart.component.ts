import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { IProductService } from 'src/app/services/iproduct.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit,OnChanges {
  newshipping:Icheckout={} as Icheckout
  cartlist:Icart[]=[];
  prdlisticat: Iproduct[] = [];
  constructor(private rot:Router,private checkservice:CheckoutService,private cartservice:CartService,
    private prdapisevice: IProductService) { 
      this.rot.routeReuseStrategy.shouldReuseRoute = () => false;
    }
  ngOnChanges() {
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    }); 


    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    });
    
  }

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
     this.rot.navigate(['/redirect'])
      },
    
      error:(err)=>{
        alert("error")
      }
    })
    }

    clearcart(){
      this.cartservice.clearcart ().subscribe({
        next:()=>{
       this.rot.navigate(['/redirect'])
        },
      
        error:(err)=>{
          alert("error")
        }
      })
      
    }
    minsprod(id:any){
      
      this.cartservice.decrementquantaty(id).subscribe({
        next:()=>{
       this.rot.navigate(['/redirect'])
        },
      
        error:(err)=>{
          alert("error")
        }
      })



    }
    add(id:any){
      
      this.cartservice.incrementquantaty(id).subscribe({
        next:()=>{
       this.rot.navigate(['/redirect'])
        },
      
        error:(err)=>{
          alert("error")
        }
      })

    }

    }
