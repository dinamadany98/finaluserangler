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
  userformgroup: FormGroup;
  rate: Ratting = {} as Ratting;
  review: Review = {} as Review;
  currprdid: number = 0;
  starts_rate = '';
  x: any;
  // flag: boolean = false;
  toggle(id: any) {
    // let x = '#' + product_id;
    // this.x = document.getElementById(id);
    // this.x.toggle();
    // if (this.x.style.display == 'none') {
    //   this.x.style.display = 'block';
    // } else {
    //   this.x.style.display = 'none';
    // }
    // $(x).toggle();
    // document.getElementById(product_id)?.toggleAttribute
    // this.flag = !this.flag;
  }
  constructor(
    private orderitemservice: OrderitemService,
    private prdapisevice: IProductService,


    private router: Router,
    private wishlistservice: WhishlisService,
    private fb: FormBuilder
  ) {
    this.userformgroup = this.fb.group({
      user_review: ['', [Validators.required, Validators.minLength(5)]],
      user_id: ['', [Validators.required]],
      product_id: ['', [Validators.required]],
    });
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
  get user_review() {
    return this.userformgroup.get('user_review');
  }

  get product_id() {
    return this.userformgroup.get('product_id');
  }
  ////////////////////////////

  /////////////////////////////
  addReview() {
    this.review.product_id = this.currprdid;
    this.wishlistservice.addreview(this.review).subscribe({
      next: (review) => {
        this.router.navigate(['/home']);
        Swal.fire('Review Correct', 'You clicked the button!', 'success');
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
    console.log(this.review);
  }
}
