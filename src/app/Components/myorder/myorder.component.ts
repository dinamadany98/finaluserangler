import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Iorderitem } from 'src/app/Models/iorderitem';
import { IProduct } from 'src/app/Models/iproduct';
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
  constructor(private orderitemservice:OrderitemService,
    private prdapisevice: IProductService) { }
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


  }

}
