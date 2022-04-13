import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icheckout } from 'src/app/Models/icheckout';
import { CheckoutService } from 'src/app/Services/checkout.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  newshipping:Icheckout={} as Icheckout
  constructor(private rot:Router,private checkservice:CheckoutService) { }
 
  ngOnInit(): void {
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
