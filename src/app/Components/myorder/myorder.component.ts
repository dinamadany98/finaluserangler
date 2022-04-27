import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iorderitem } from 'src/app/Models/iorderitem';
import { Iproduct } from 'src/app/Models/iproduct';
import { Ratting } from 'src/app/Models/ratting';
import { Review } from 'src/app/Models/review';
import { CartService } from 'src/app/services/cart.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { OrderitemService } from 'src/app/services/orderitem.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-myorder',
  templateUrl: './myorder.component.html',
  styleUrls: ['./myorder.component.css'],
})
export class MyorderComponent implements OnInit, OnChanges {
  orderitmlist: Iorderitem[] = [];
  prdlisticat: Iproduct[] = [];
  orderlist: Icheckout[] = [];
 

  constructor(
    private orderitemservice: OrderitemService,
    private prdapisevice: IProductService,

  ) {

  }
  ngOnChanges() {
    this.orderitemservice.getuserorder().subscribe((order) => {
      this.orderitmlist = order;
    });
  }

  ngOnInit() {
    document.getElementById('.order')?.hidden;
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
    this.orderitemservice.getuserorder().subscribe((order) => {
      this.orderitmlist = order;
    });

    this.orderitemservice.getorderforspasificuser().subscribe((order) => {
      this.orderlist = order;
    });
  }



}
