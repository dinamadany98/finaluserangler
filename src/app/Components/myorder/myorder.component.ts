import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iorderitem } from 'src/app/Models/iorderitem';
import { IProduct } from 'src/app/Models/iproduct';
import { CheckoutService } from 'src/app/Services/checkout.service';
import { IProductService } from 'src/app/Services/iproduct.service';
import { OrderitemService } from 'src/app/Services/orderitem.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit,OnChanges {
  orderitmlist:Iorderitem[]=[];
  prdlisticat: IProduct[] = [];
  orderlist:Icheckout[]=[];
  constructor(private orderitemservice:OrderitemService,
    private prdapisevice: IProductService
    ) { }
  ngOnChanges() {
    this.orderitemservice.getuserorder().subscribe(order=>{
      this.orderitmlist=order;
    });
  }




  ngOnInit(){
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
    this.orderitemservice.getuserorder().subscribe(order=>{
      this.orderitmlist=order;
    });

    this.orderitemservice.getorderforspasificuser ().subscribe(order=>{
      this.orderlist=order;
    });

  }

}
