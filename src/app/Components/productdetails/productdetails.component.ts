import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/Services/iproduct.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css'],
})
export class ProductdetailsComponent implements OnInit {
  // rating = 0;
  // startcount = 5;
  // ratingarr: boolean[] = [];
  // snackbarduration = 1000;
  // response = [
  //   'you broke my heart',
  //   'really',
  //   'we will do better',
  //   'glade you',
  //   'thank you',
  // ];
  currentRate = 8;
  ///////////////////////////////
  prd: IProduct = {} as IProduct;
  prdidlist: number[] = [];
  currprdid: number = 0;
  prdid: any;
  productapi: IProduct = {} as IProduct;
  snackbar: MatSnackBar | undefined;

  constructor(
    private activedroute: ActivatedRoute,
    private prdservice: IProductService
  ) {
    // this.ratingarr = Array(this.startcount).fill(false);
  }
  // returnstar(i:number) {
  //   if (this.rating >= i + 1) {
  //     return 'star';
  //   } else {
  //     return 'star_border';
  //  }
  // }
  // onclick(i:number) {
  //   this.rating = i + 1;
  //   this.snackbar?.open(this.response[i], '', {
  //     duration: this.snackbarduration,
  //     panelClass:['snack-bar']
  //   })
  // }

  ngOnInit(): void {
    //  this.prdidlist = this.prdservice.getallproduct();
    this.activedroute.paramMap.subscribe(() => {
      this.currprdid = this.activedroute.snapshot.paramMap.get('pid')
        ? Number(this.activedroute.snapshot.paramMap.get('pid'))
        : 0;

      let foundprd = this.prdservice
        .getprdbyid(this.currprdid)
        .subscribe((product) => {
          console.log(product);
          this.prd = product;
        });
    });
  }
  // changerate() {
  //   this.israted = !this.israted;
  // }
}
