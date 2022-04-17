import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { IProductService } from 'src/app/services/iproduct.service';
import { WhishlisService } from 'src/app/services/whishlis.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ser=""
  filterBy:any
  product:Iproduct[]=[]
  constructor(private prodservic:IProductService,
    private cartservice:CartService,
    private rot:Router,
    private wishlist:WhishlisService
 ) { }

  ngOnInit(): void {
  }
  values :any;
  filter(event: any) {
    if(event.target.value!=' ')
    this.values = true ;
  
    this.prodservic.searchproduct(this.filterBy).subscribe(prod=>{
      this.product=prod;
    });
      }
      addtocart(prod :Iproduct){
 
        this.cartservice.addtocart(prod).subscribe({
         next:(prod)=>{
         this.rot.navigate(['/'])
          },
    
          error:(err)=>{
            alert("error")
          }
        })
      }

      addtowishlist(prod :Iproduct){
 
        this.wishlist.addwishlistdata(prod).subscribe({
         next:(prod)=>{
         this.rot.navigate(['/'])
          },
    
          error:(err)=>{
            alert("error")
          }
        })
      }     

}
