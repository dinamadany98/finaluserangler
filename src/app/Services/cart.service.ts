import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icart } from '../Models/icart';
import { IProduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  httpoption = {};
  constructor(private httpclint: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getcartdata(): Observable<Icart[]> {
    return this.httpclint.get<Icart[]>(`${environment.ApiBaseURL}/cart`);
  }

  deletfromcart(id: number): Observable<Icart> {
    return this.httpclint.delete<Icart>(
      `${environment.ApiBaseURL}/cart/${id}`,
      this.httpoption
    );
  }
  clearcart(): Observable<Icart> {
    return this.httpclint.delete<Icart>(
      `${environment.ApiBaseURL}/cartuser `,
      this.httpoption
    );
  }
  ////////////////////////////
  addtocart(product: IProduct): Observable<IProduct> {
    return this.httpclint.post<IProduct>(
      `${environment.ApiBaseURL}/cart`,
      JSON.stringify(product),
      this.httpoption
    );
  }

  // addUser(newuser: IUser): Observable<IUser> {
  //   return this.httpClient.post<IUser>(
  //     `${environment.ApiBaseURL}/register`,
  //     JSON.stringify(newuser),
  //     this.httpoption
  //   );
  // }
}
