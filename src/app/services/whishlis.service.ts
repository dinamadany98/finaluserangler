import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Iorderitem } from '../Models/iorderitem';
import { Iproduct } from '../Models/iproduct';
import { Iwhishlist } from '../Models/iwhishlist';
import { Ratting } from '../Models/ratting';
import { Review } from '../Models/review';

@Injectable({
  providedIn: 'root',
})
export class WhishlisService {
  httpoption = {};
  constructor(private httpclint: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  addwishlistdata(Product: Iproduct): Observable<Iproduct> {
    return this.httpclint.post<Iproduct>(
      `${environment.ApiBaseURL}/wishlist`,
      JSON.stringify(Product),
      this.httpoption
    );
  }

  getwishlistdata(): Observable<Iproduct[]> {
    return this.httpclint.get<Iproduct[]>(`${environment.ApiBaseURL}/wishlist`);
  }
  clearwishlist(): Observable<Iwhishlist> {
    return this.httpclint.delete<Iwhishlist>(
      `${environment.ApiBaseURL}/wishlistuser `,
      this.httpoption
    );
  }
  deletfromwishlist(id: number): Observable<Iwhishlist> {
    return this.httpclint.delete<Iwhishlist>(
      `${environment.ApiBaseURL}/wishlist/${id}`,
      this.httpoption
    );
  }
  // addreview(review: Review): Observable<Review> {
  //   return this.httpclint.post<Review>(
  //     `${environment.ApiBaseURL}/add-review`,
  //     JSON.stringify(review),
  //     this.httpoption
  //   );
  // }
  checkreiew(prodid:number):Observable<Iorderitem[]> 
  {
    return this.httpclint.get<Iorderitem[]>(`${environment.ApiBaseURL}/checkreview/${prodid}`);
  

  }


   getallreviews(prodid:number):Observable<Review[]> 
  {
    return this.httpclint.get<Review[]>(`${environment.ApiBaseURL}/reviews/${prodid}`);
  

  } 
  addreview(review: any): Observable<Review> {
    return this.httpclint.post<Review>(
      `${environment.ApiBaseURL}/add-review`,
      JSON.stringify(review),
      this.httpoption
    );
  }

  addratting(rate: Ratting): Observable<Ratting> {
    return this.httpclint.post<Ratting>(
      `${environment.ApiBaseURL}/add-rating`,
      JSON.stringify(rate),
      this.httpoption
    );
  }
}
