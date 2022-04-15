import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Icart } from 'src/app/Models/icart';
import { ICategory } from 'src/app/Models/icategory';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { CategoryServiceService } from 'src/app/Services/category-service.service';
import { IProductService } from 'src/app/Services/iproduct.service';
import { WhishlistService } from 'src/app/Services/whishlist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnChanges {
  categorylist: ICategory[] = [];
  prdlisticat: IProduct[] = [];
  cartlist:Icart[]=[];
  constructor(
    private prdcatservice: CategoryServiceService,
    private prdapisevice: IProductService,
    private cartservice:CartService,
    private rot:Router,
    private whishlistservic:WhishlistService
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
    this.cartservice.getcartdata().subscribe(cart=>{
      this.cartlist=cart;
    }); 
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
     next:(prod)=>{
     this.rot.navigate(['/'])
      },

      error:(err)=>{
        alert("error")
      }
    })
  }

  addtowishlist(prod :IProduct){
 
    this.whishlistservic.addwishlistdata(prod).subscribe({
     next:(prod)=>{
     this.rot.navigate(['/'])
      },

      error:(err)=>{
        alert("error")
      }
    })
  }




}
