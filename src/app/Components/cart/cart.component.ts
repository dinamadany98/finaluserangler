import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { Icheckout } from 'src/app/Models/icheckout';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit, OnChanges {
  newshipping: Icheckout = {} as Icheckout;
  cartlist: Icart[] = [];
  prdlisticat: Iproduct[] = [];
  date: Date | undefined;
  date2: Date | undefined;
  constructor(
    private rot: Router,
    private checkservice: CheckoutService,
    private cartservice: CartService,
    private prdapisevice: IProductService,
    private whishlistservic: WhishlisService
  ) {
    this.rot.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnChanges() {
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });

    this.cartservice.getcartdata().subscribe((cart) => {
      this.cartlist = cart;
    });
  }

  ngOnInit(): void {
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });

    this.cartservice.getcartdata().subscribe((cart) => {
      this.cartlist = cart;
    });
    //////////////////////
    this.date = new Date();
    this.date.setDate(this.date.getDate() + 3);
    ///////////////////////
      this.date2 = new Date();
      this.date2.setDate(this.date2.getDate() + 5);
  }

  total = 0;
  sum(pric: any, count: any) {
    this.total += +pric * +count;
    return +pric * +count;
  }
  del(id: any) {
    this.cartservice.deletfromcart(id).subscribe({
      next: () => {
        this.rot.navigate(['/redirect']);
      },

      error: (err) => {
        alert('error');
      },
    });
  }

  clearcart() {
    this.cartservice.clearcart().subscribe({
      next: () => {
        this.rot.navigate(['/redirect']);
      },

      error: (err) => {
        alert('error');
      },
    });
  }
  minsprod(id: any) {
    this.cartservice.decrementquantaty(id).subscribe({
      next: () => {
        this.rot.navigate(['/redirect']);
      },

      error: (err) => {
        alert('error');
      },
    });
  }
  add(id: any) {
    this.cartservice.incrementquantaty(id).subscribe({
      next: () => {
        this.rot.navigate(['/redirect']);
      },

      error: (err) => {
        alert('error');
      },
    });
  }
  addtowishlist(prod: Iproduct) {
    this.whishlistservic.addwishlistdata(prod).subscribe({
      next: (prd) => {
        Swal.fire(
          'Added To Wishlist  Succesfully!',
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
