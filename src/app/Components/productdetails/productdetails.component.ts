import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/Services/iproduct.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import { Icart } from 'src/app/Models/icart';
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
  @Output() btnevent: EventEmitter<Icart>;

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
  snackbar: MatSnackBar | undefined;

  constructor(
    private activedroute: ActivatedRoute,
    private prdservice: IProductService
  ) {
    this.btnevent = new EventEmitter<any>();
  }
  addrate() {}
 
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
