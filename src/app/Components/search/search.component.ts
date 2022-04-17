import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/Services/iproduct.service';
import { WhishlistService } from 'src/app/Services/whishlist.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  filterBy: any;
  product: IProduct[] = [];
  constructor(
    private prodservic: IProductService,
    private rot: Router,
    private whishlistservic: WhishlistService
  ) {}

  ngOnInit(): void {}
  filter() {
    this.prodservic.searchproduct(this.filterBy).subscribe((prod) => {
      this.product = prod;
    });
  }
  ///////////////////////////////
  addtowishlist(prod: IProduct) {
    this.whishlistservic.addwishlistdata(prod).subscribe({
      next: (prod) => {
        this.rot.navigate(['/']);
      },

      error: (err) => {
        alert('error');
      },
    });
  }
}
