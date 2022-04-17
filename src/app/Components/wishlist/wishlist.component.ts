import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Iproduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/services/cart.service';
import { WhishlisService } from 'src/app/services/whishlis.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  
  whishlistprod:Iproduct[]=[]
  constructor(private wishlistservic:WhishlisService,
    private cartservice:CartService,
    private rot:Router ) { 
      
      this.rot.routeReuseStrategy.shouldReuseRoute = () => false;
    }

  ngOnInit(): void {

    this.wishlistservic.getwishlistdata().subscribe(whishlist=>{
      this.whishlistprod=whishlist;
  
    });
    

  }


  addtocart(list:Iproduct){
 
    this.cartservice.addtocart(list).subscribe({
      next:(list)=>{
      this.rot.navigate(['/redirectwishlist'])
      },

      error:(err)=>{
       alert("error")
      }
    })
  }
  clearwishlist(){
  this.wishlistservic.clearwishlist ().subscribe({
    next:()=>{
   this.rot.navigate(['/redirectwishlist'])
    },
  
    error:(err)=>{
      alert("error")
    }
  })
}


removefromwishlist(id:number){
  this.wishlistservic.deletfromwishlist(id).subscribe({
    next:()=>{
   this.rot.navigate(['/redirectwishlist'])
    },
  
    error:(err)=>{
      alert("error")
    }
  })

}

}
