import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { Ratting } from 'src/app/Models/ratting';
import { Review } from 'src/app/Models/review';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  currentRate = 6;
  ctrl = new FormControl(null, Validators.required);
  wish: any;
  rate: Ratting = {} as Ratting;
  review: Review = {} as Review;
  rev: Review = {} as Review;
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
  }
  ///////////////////////////////
  prd: Iproduct = {} as Iproduct;
  prdidlist: number[] = [];
  currprdid: number = 0;
  prdid: any;
  productapi: Iproduct = {} as Iproduct;
  userformgroup: FormGroup;
  productvalue: any;
  constructor(
    private activedroute: ActivatedRoute,
    private prdservice: IProductService,
    private router: Router,
    private wishlistservice:WhishlisService,
    private fb: FormBuilder
  ) {
    this.userformgroup = this.fb.group({
      user_review: ['', [Validators.required, Validators.minLength(5)]],
      user_id: ['', [Validators.required]],
      product_id: ['', [Validators.required]],
    });
  }
  addrate(value: any) {
    // alert('sucses')
    this.wishlistservice.addratting(this.rate).subscribe((value) => {
      console.log(value);
      this.rate = value;
    });
  }

  ////////////////////////////
  get user_review() {
    return this.userformgroup.get('user_review');
  }
  get user_id() {
    return this.userformgroup.get('user_id');
  }
  get product_id() {
    return this.userformgroup.get('product_id');
  }
  ////////////////////////////

  /////////////////////////////
  addReview() {
    this.wishlistservice.addreview(this.review).subscribe({

    });
  }
  //////////////////////////////
  ngOnInit(): void {
    this.activedroute.paramMap.subscribe(() => {
      this.currprdid = this.activedroute.snapshot.paramMap.get('pid')
        ? Number(this.activedroute.snapshot.paramMap.get('pid'))
        : 0;

      let foundprd = this.prdservice
        .getprdbyid(this.currprdid)
        .subscribe((product) => {
          this.prd = product;
          this.productvalue = this.currprdid;
          console.log(this.productvalue);
          console.log(product);


        });
    });
  }
  // changerate() {
  //   this.israted = !this.israted;
  // }

}
