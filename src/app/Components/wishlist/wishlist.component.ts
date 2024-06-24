import { Component, OnInit } from '@angular/core';
import { Icart } from 'src/app/Models/icart';
import { IProduct } from 'src/app/Models/iproduct';
import { Wishlist } from 'src/app/Models/wishlist';
import { IProductService } from 'src/app/Services/iproduct.service';
import { WishlistService } from 'src/app/Services/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css'],
})
export class WishlistComponent implements OnInit {
  // icart: Icart[] = [];
  list: Wishlist[] = [];
  prdlisticat: IProduct[] = [];

  constructor(
    private wishlist: WishlistService,
    private prdapisevice: IProductService
  ) {}

  ngOnInit(): void {
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
    this.wishlist.getwishlist().subscribe((cart) => {
      this.list = cart;
    });
  }
}
