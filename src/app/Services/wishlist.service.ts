import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/iproduct';
import { Ratting } from '../Models/ratting';
import { Review } from '../Models/review';
import { Wishlist } from '../Models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  httpoption = {};
  constructor(private httpclint: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  /////////////////////////////
  getwishlist(): Observable<Wishlist[]> {
    return this.httpclint.get<Wishlist[]>(`${environment.ApiBaseURL}/wishlist`);
  }
  ///////////////////////////
  addratting(rate: Ratting): Observable<Ratting> {
    return this.httpclint.post<Ratting>(
      `${environment.ApiBaseURL}/add-rate`,
      JSON.stringify(rate),
      this.httpoption
    );
  }
  ////////////////////////////////////
  addtowishlist(prd: IProduct): Observable<IProduct> {
    return this.httpclint.post<IProduct>(
      `${environment.ApiBaseURL}/wishlist`,
      JSON.stringify(prd),
      this.httpoption
    );
  }
  ///////////////////////////////
  addreview(review: Review): Observable<Review> {
    return this.httpclint.post<Review>(
      `${environment.ApiBaseURL}/add-review`,
      JSON.stringify(review),
      this.httpoption
    );
  }
}
