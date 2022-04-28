import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
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
  whishlistprod: Iproduct[] = [];
  constructor(
    private wishlistservic: WhishlisService,
    private cartservice: CartService,
    private rot: Router
  ) {
    this.rot.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.wishlistservic.getwishlistdata().subscribe((whishlist) => {
      this.whishlistprod = whishlist;
    });
  }

  addtocart(list: Iproduct) {
    this.cartservice.addtocart(list).subscribe({
      next: (list) => {
        this.rot.navigate(['/redirectwishlist']);
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
  }
  clearwishlist() {
    this.wishlistservic.clearwishlist().subscribe({
      next: () => {
        this.rot.navigate(['/redirectwishlist']);
        Swal.fire('Removed Succesfully!', 'You clicked the button!', 'success');

      },

      error: (err) => {
        alert('error');
      },
    });
  }

  removefromwishlist(id: number) {
    this.wishlistservic.deletfromwishlist(id).subscribe({
      next: () => {
        this.rot.navigate(['/redirectwishlist']);
        Swal.fire('Removed Succesfully!', 'You clicked the button!', 'success');

      },

      error: (err) => {
        alert('error');
      },
    });
  }
}
