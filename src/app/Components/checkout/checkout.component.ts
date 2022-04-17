import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icheckout } from 'src/app/Models/icheckout';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { IProductService } from 'src/app/Services/iproduct.service';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  newshipping:Icheckout={} as Icheckout
  cartlist:Icart[]=[];
  prdlisticat: IProduct[] = [];
  public payPalConfig?: IPayPalConfig;
  showSuccess: boolean | undefined;
  constructor(private rot:Router,private checkservice:CheckoutService,private cartservice:CartService,
    private prdapisevice: IProductService) { }

  ngOnInit(): void {
    this.initConfig();
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

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
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
                value: '9.99',
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
