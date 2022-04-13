import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class IProductService {
  private httpoption = {};
  private productList: IProduct[] = [];

  constructor(private httpclient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getallproduct(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.ApiBaseURL}/getallproduct`
    );
  }
  // return cat id
  getprdbycatid(catid: number): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.ApiBaseURL}/products?CateogryID=${catid}`
    );
  }
  //return obj
  getprdbyid(prdid: number): Observable<IProduct> {
    return this.httpclient.get<IProduct>(
      `${environment.ApiBaseURL}/products/${prdid}`
    );
  }
  searchprdbyname(prdname: string): IProduct | undefined {
    return this.productList.find((prd) => prd.name == prdname);
  }
}
