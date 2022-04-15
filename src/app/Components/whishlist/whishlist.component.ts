import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/Models/iproduct';
import { CartService } from 'src/app/Services/cart.service';
import { WhishlistService } from 'src/app/Services/whishlist.service';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent implements OnInit {
  whishlistprod:IProduct[]=[]
  constructor(private wishlistservic:WhishlistService,
    private cartservice:CartService,
    private rot:Router ) { }

  ngOnInit(): void {

    this.wishlistservic.getwishlistdata().subscribe(whishlist=>{
      this.whishlistprod=whishlist;
  
    });
    

  }


  addtocart(list:IProduct){
 
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
