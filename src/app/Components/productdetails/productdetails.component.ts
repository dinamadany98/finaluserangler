import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/Services/iproduct.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Icart } from 'src/app/Models/icart';
import { CartComponent } from '../cart/cart.component';
import { CartService } from 'src/app/Services/cart.service';
import { WishlistService } from 'src/app/Services/wishlist.service';
import { Ratting } from 'src/app/Models/ratting';
import Swal from 'sweetalert2';
import { Review } from 'src/app/Models/review';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
  styles: [
    `
      .star {
        font-size: 1.5rem;
        color: #b0c4de;
      }
      .filled {
        color: #1e90ff;
      }
      .bad {
        color: #deb0b0;
      }
      .filled.bad {
        color: #ff1e1e;
      }
      .head {
        font-size: medium;
      }
    `,
  ],
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
  prd: IProduct = {} as IProduct;
  prdidlist: number[] = [];
  currprdid: number = 0;
  prdid: any;
  productapi: IProduct = {} as IProduct;
  userformgroup: FormGroup;
  productvalue: any;
  constructor(
    private activedroute: ActivatedRoute,
    private prdservice: IProductService,
    private router: Router,
    private wishlistservice: WishlistService,
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
      //  this.review.product_id = this.currprdid;
      //  this.wishlistservice.addreview(this.review).subscribe({
         // next: (review) => {
         //   this.router.navigate(['/home']);
         //   Swal.fire('Review Correct', 'You clicked the button!', 'success');
         // },
         // error: (err) => {
         //   Swal.fire({
         //     icon: 'error',
         //     title: 'Oops...',
         //     text: 'Something went wrong!',
         //     footer: '<a href="">Why do I have this issue?</a>',
         //   });
         // },
      //  });
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

      // next: (review) => {
      //   this.router.navigate(['/home']);
      //   Swal.fire('Review Correct', 'You clicked the button!', 'success');
      // },
      // error: (err) => {
      //   Swal.fire({
      //     icon: 'error',
      //     title: 'Oops...',
      //     text: 'Something went wrong!',
      //     footer: '<a href="">Why do I have this issue?</a>',
      //   });
      // },
    });
    console.log(this.review);
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


        });
    });
  }
  // changerate() {
  //   this.israted = !this.israted;
  // }
}
