import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from 'src/app/Models/icategory';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit, OnChanges {
  ser = '';
  categryid: number = 0;
  filterBy: any;
  product: Iproduct[] = [];
  categorylist: Icategory[] = [];
  productcategryid: Iproduct[] = [];
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
    private prodservic: IProductService,
    private cartservice: CartService,
    private rot: Router,
    private wishlist: WhishlisService,
    private prdcatservice: CategoryServiceService
  ) {}
  ngOnChanges() {
    this.prodservic.getprdbycatid(this.categryid).subscribe((prod) => {
      this.productcategryid = prod;
      console.log(this.productcategryid);
    });
  }

  ngOnInit(): void {
      this.prodservic.getprdbycatid(this.categryid).subscribe((prod) => {
        this.productcategryid = prod;
        console.log(this.productcategryid);
      });
    //this.productcategryid=this.prodservic.getprdbycatid (this.categryid)
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
  }
  values: any;
  filter(event: any) {
    if (event.target.value != ' ') this.values = true;

    this.prodservic.searchproduct(this.filterBy).subscribe((prod) => {
      this.product = prod;
    });
  }
  addtocart(prod: Iproduct) {
    this.cartservice.addtocart(prod).subscribe({
      next: (prd) => {
        this.rot.navigate(['/search']);
        Swal.fire(
          'Added To Cart Succesfully!',
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
    this.wishlist.addwishlistdata(prod).subscribe({
      next: (prd) => {
        this.rot.navigate(['/search']);
        Swal.fire(
          'Added To Cart Succesfully!',
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

  opendtails(prdid: number) {
    this.rot.navigate(['product', prdid]);
  }

  getcategryid(id: number) {
    if (id == 0) {
      this.prodservic.getallproduct().subscribe((prdlist) => {
        this.productcategryid = prdlist;
      });
    } else {
      this.prodservic.getprdbycatid(id).subscribe((prod) => {
        this.productcategryid = prod;
      });
    }
  }
}
