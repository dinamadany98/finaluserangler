import { Component, OnChanges, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Icart } from 'src/app/Models/icart';
import { Icategory } from 'src/app/Models/icategory';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-by-category',
  templateUrl: './product-by-category.component.html',
  styleUrls: ['./product-by-category.component.css'],
})
export class ProductByCategoryComponent implements OnInit, OnChanges {
  categorylist: Icategory[] = [];
  prdlisticat: Iproduct[] = [];
  cartlist: Icart[] = [];
  iswished = false;
  productvalue: any;
  curentid: number = 0;
  prd: Iproduct = {} as Iproduct;
  productbycategoryid: Iproduct[] = [];
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    navText: ['Previous', 'Next'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };
  constructor(
    private prdcatservice: CategoryServiceService,
    private prdapisevice: IProductService,
    private cartservice: CartService,
    private rot: Router,
    private whishlistservic: WhishlisService,
    private activedroute: ActivatedRoute
  ) {
    this.rot.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnChanges(): void {
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
    ////////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  ngOnInit(): void {
    this.activedroute.paramMap.subscribe((paramMap) => {
      this.curentid = this.activedroute.snapshot.paramMap.get('id')
        ? Number(this.activedroute.snapshot.paramMap.get('id'))
        : 0;
      this.prdapisevice.getprdbycatid(this.curentid).subscribe((prod) => {
        this.productbycategoryid = prod;

        console.log(this.productbycategoryid);
      });
    });

    this.cartservice.getcartdata().subscribe((cart) => {
      this.cartlist = cart;
    });
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
    /////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  addtocart(prod: Iproduct) {
    this.cartservice.addtocart(prod).subscribe({
      next: (prd) => {
        this.rot.navigate(['/']);
        Swal.fire(
          'Added  To Cart Succesfully!',
          'Please Check Your Cart',
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

  addtowishlist(prod: Iproduct) {
    this.whishlistservic.addwishlistdata(prod).subscribe({
      next: (prd) => {
        this.rot.navigate(['/']);
        Swal.fire(
          'Added To Wishlist Succesfully! ',
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

  opendtails(prdid: number) {
    this.rot.navigate(['product', prdid]);
  }
  ////////////////////////////////////////
  changecolor() {
    this.iswished = this.iswished;
  }
}
