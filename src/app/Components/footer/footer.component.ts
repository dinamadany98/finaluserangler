import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Icategory } from 'src/app/Models/icategory';
import { CategoryServiceService } from 'src/app/services/category-service.service';
import { IProductService } from 'src/app/services/iproduct.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit, OnChanges {
  categorylist: Icategory[] = [];

  constructor(
    private prdcatservice: CategoryServiceService,
    private prdapisevice: IProductService
  ) {}

  ngOnChanges(): void {
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
  }

  ngOnInit(): void {
    this.prdcatservice.getallcategory().subscribe((prdlist) => {
      this.categorylist = prdlist;
    });
  }
  loggedin() {
    if (localStorage.getItem('login') && localStorage.getItem('role') == 'user')
      return true;

    return false;
  }
}
