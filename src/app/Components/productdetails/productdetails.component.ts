import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { Ratting } from 'src/app/Models/ratting';
import { Review } from 'src/app/Models/review';
import { CartService } from 'src/app/services/cart.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  currentRate = 6;
  ctrl = new FormControl(null, Validators.required);
  wish: any;
  rate: Ratting = {} as Ratting;
  review: Review = {} as Review;
  rev: Review = {} as Review;
  flag: boolean = false;
  toggle() {
    this.flag = !this.flag;
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
    private cartservice: CartService,

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
  addrate(value: any) {
    // alert('sucses')
    this.wishlistservice.addratting(this.rate).subscribe((value) => {
      this.rate = value;
      console.log(value);
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
  //////////////////////////////
  ngOnInit(): void {
    this.activedroute.paramMap.subscribe(() => {
      this.currprdid = this.activedroute.snapshot.paramMap.get('pid')
        ? Number(this.activedroute.snapshot.paramMap.get('pid'))
        : 0;
      console.log(this.currprdid);

      let foundprd = this.prdservice
        .getprdbyid(this.currprdid)
        .subscribe((product) => {
          this.prd = product;
          this.productvalue = this.currprdid;
          console.log(this.productvalue);
        });
    });
  }
  addtocart(prod: Iproduct) {
    this.cartservice.addtocart(prod).subscribe({
      next: (prd) => {
        Swal.fire(
          'Adding To Cart Succssfuly',
          'Please Check Your Cart',
          'success'
        );
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

  addtowishlist(prod: Iproduct) {
    this.wishlistservice.addwishlistdata(prod).subscribe({
      next: (prd) => {
        Swal.fire(
          'Adding To Wishlist Succssfuly',
          'Please Check Your Wishlist',
          'success'
        );
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
}
