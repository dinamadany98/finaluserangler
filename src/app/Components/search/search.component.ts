import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  ser = '';
  filterBy: any;
  product: Iproduct[] = [];
  constructor(
    private prodservic: IProductService,
    private cartservice: CartService,
    private rot: Router,
    private wishlist: WhishlisService
  ) {}

  ngOnInit(): void {}
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
          'Adding To Cart Successfully',
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
          'Adding To Cart Successfully',
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
}