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

  constructor(private httpclient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getallproduct(): Observable<IProduct[]> {
    return this.httpclient.get<IProduct[]>(
      `${environment.ApiBaseURL}/products`
    );
  }

  searchproduct(name:any) :Observable<IProduct[]>
  {
    return this.httpclient.get<IProduct[]>(`${environment.ApiBaseURL}/search/${name}`);
  }


}
