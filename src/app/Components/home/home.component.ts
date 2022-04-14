import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { IProductService } from 'src/app/Services/iproduct.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  categorylist: ICategory[] = [];
  prdlisticat: IProduct[] = [];
  constructor(
    private prdcatservice: CategoryServiceService,
    private prdapisevice: IProductService,
    private cartservice:CartService,
    private rot:Router
  ) {}
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
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
    /////////////////////////////
    this.prdapisevice.getallproduct().subscribe((prdlist) => {
      this.prdlisticat = prdlist;
    });
  }
  addtocart(prod :IProduct){
 
    this.cartservice.addtocart(prod).subscribe({
     next:(proid)=>{
     this.rot.navigate(['/'])
      },

      error:(err)=>{
        alert("error")
      }
    })
  }
}
