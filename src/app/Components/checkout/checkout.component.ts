import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { IProductService } from 'src/app/services/iproduct.service';
import Swal from 'sweetalert2';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {


  newshipping:Icheckout={} as Icheckout
  cartlist:Icart[]=[];
  prdlisticat: Iproduct[] = [];
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean | undefined;
  constructor(private rot:Router,private checkservice:CheckoutService,private cartservice:CartService,
    private prdapisevice: IProductService) {

    }
    total:any=0;
  ngOnInit() {
    this.initConfig();
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

      next: (shipping) => {
        this.rot.navigate(['/myorder']);
        Swal.fire('Added Succesfully!', 'Please Check Your Email', 'success');
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    });


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



  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AThou6tf0okocZ1m7PDwXX5FZ2QmUTDTHSU20jNj2PyOND5njyTc1P-TzmigmVQ2LJ0mId0_p0evoP81',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: this.total,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.total
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: this.total,
              },

            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details: any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


}
