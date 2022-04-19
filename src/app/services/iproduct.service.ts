import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iproduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class IProductService {

  private httpoption = {};

  constructor(private httpclient: HttpClient  ) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getallproduct(): Observable<Iproduct[]> {
    return this.httpclient.get<Iproduct[]>(
      `${environment.ApiBaseURL}/products`
    );
  }

  searchproduct(name:any) :Observable<Iproduct[]>
  {
    return this.httpclient.get<Iproduct[]>(`${environment.ApiBaseURL}/search/${name}`);
  }
  
  getprdbyid(prdid: number): Observable<Iproduct> {
    return this.httpclient.get<Iproduct>(
      `${environment.ApiBaseURL}/products/${prdid}`
    );
  }

}
