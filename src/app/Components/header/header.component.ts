import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { IProduct } from 'src/app/Models/iproduct';
import { IProductService } from 'src/app/Services/iproduct.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  filterBy: any;
  product: IProduct[] = [];
  constructor(private prodservic: IProductService) {}

  ngOnInit(): void {}
  filter() {
    this.prodservic.searchproduct(this.filterBy).subscribe((prod) => {
      this.product = prod;
    });
  }
}
