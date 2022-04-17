import { Component, OnInit } from '@angular/core';
import { Iproduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/services/iproduct.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  ser=""
  filterBy:any
  product:Iproduct[]=[]
  constructor(private prodservic:IProductService) { }

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

}
