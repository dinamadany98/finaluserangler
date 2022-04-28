import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { count } from 'rxjs';
import { Iorderitem } from 'src/app/Models/iorderitem';
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
  starts_rate = '';
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
  orderitemuser:Iorderitem[]=[]
  allreview: Review[]=[];
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
  addrate(stars:any) {
    if(this.orderitemuser.length){
    this.rate.product_id = this.currprdid;
    this.rate.stars_rated = stars;
    console.log(this.rate);
    this.wishlistservice.addratting(this.rate).subscribe({
      next: () => {
        Swal.fire('Added Succesfully!', 'You clicked the button!', 'success');
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... Please Login  Now',
          text: 'Something went wrong!',
          footer:
            '<a routerLink="/login" routerLinkActive="active">Why do I have this issue?</a>',
        });
      },
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops... You Canot Add Rating Without Buy It ',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }



}

  ////////////////////////////
  get user_review() {
    return this.userformgroup.get('user_review');
  }

  get product_id() {
    return this.userformgroup.get('product_id');
  }
  ////////////////////////////

  /////////////////////////////
  addReview() {
    if(this.orderitemuser.length){
    this.review.product_id = this.currprdid;
    this.wishlistservice.addreview(this.review).subscribe({
      next: (review) => {
        Swal.fire('Added Succesfully!', 'You clicked the button!', 'success');
        window.location.reload();
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... If You Want It Please Login Now',
          text: 'Something went wrong!',
          footer: '<a href="">Why do I have this issue?</a>',
        });
      },
    });
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops... You Canot Add Reivew Without Buy It ',
      text: 'Something went wrong!',
      footer: '<a href="">Why do I have this issue?</a>',
    });
  }

   console.log(this.review);
  }

  //////////////////////////////
  ngOnInit(): void {
    this.activedroute.paramMap.subscribe(() => {
      this.currprdid = this.activedroute.snapshot.paramMap.get('pid')
        ? Number(this.activedroute.snapshot.paramMap.get('pid'))
        : 0;
      //console.log(this.currprdid);

     this.prdservice
        .getprdbyid(this.currprdid)
        .subscribe((product) => {
          this.prd = product;
          this.productvalue = this.currprdid;
          // console.log(this.prd);
        });


this.wishlistservice.checkreiew(this.currprdid).subscribe(prod=>{
  this.orderitemuser=prod;

});


this.wishlistservice.getallreviews(this.currprdid).subscribe(prod=>{
  this.allreview = prod;
      console.log(this.allreview);
});




    });


  }
  addtocart(prod: Iproduct) {
    console.log(this.orderitemuser);
    this.cartservice.addtocart(prod).subscribe({
      next: (prd) => {
        Swal.fire(
          'Added To Cart Succesfully!',
          'Please Check Your Cart',
          'success'
        );
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... If You Want It Please Login Now',
          text: 'Something went wrong!',
          footer: '<a href="/login">If You Have Account ? Click Here</a>',
        });
      },
    });
  }

  addtowishlist(prod: Iproduct) {
    console.log(this.prd);
    this.wishlistservice.addwishlistdata(prod).subscribe({
      next: (prd) => {
        Swal.fire(
          'Added To Wishlist Succesfully!',
          'Please Check Your Wishlist',
          'success'
        );
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops... If You Want It Please Login Now',
          text: 'Something went wrong!',
          footer: ' <a href="/login">If You Have Account ? Click Here</a>',
        });
      },
    });
  }
}
