import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class IProductService {
  private httpoption = {};
  private productList: Iproduct[] = [];

  constructor(private httpclient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getallproduct(): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(
      `${environment.ApiBaseURL}/getallproduct`
    ); 
  }
  // return cat id
  getprdbycatid(catid: number): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(
      `${environment.ApiBaseURL}/getProductsbyCategory/${catid}`
    );
  }
  //return obj
  getprdbyid(prdid: number): Observable<Iproduct> {
    return this.httpclient.get<Iproduct>(
      `${environment.ApiBaseURL}/productsdetails/${prdid}`
    );
  }

  searchproduct(name: any): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(
      `${environment.ApiBaseURL}/search/${name}`
    );
  }


}
