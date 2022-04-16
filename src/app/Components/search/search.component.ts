import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/Services/iproduct.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  filterBy:any
  product:IProduct[]=[]
  constructor(private prodservic:IProductService) { }

  ngOnInit(): void {
  }
  filter() {

    this.prodservic.searchproduct(this.filterBy).subscribe(prod=>{
      this.product=prod;
    });
      }
}
