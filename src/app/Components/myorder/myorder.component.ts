import { Component, OnChanges, OnInit } from '@angular/core';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iorderitem } from 'src/app/Models/iorderitem';
import { Iproduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/services/iproduct.service';
import { OrderitemService } from 'src/app/services/orderitem.service';

@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css']
})
export class MyorderComponent implements OnInit ,OnChanges {
  orderitmlist:Iorderitem[]=[];
  prdlisticat: Iproduct[] = [];
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
