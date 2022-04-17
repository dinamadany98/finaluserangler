import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icart } from '../Models/icart';
import { Iproduct } from '../Models/iproduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  httpoption={}
  constructor(private httpclint:HttpClient) {
    this.httpoption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }

  getcartdata() :Observable<Icart[]>
  {
    return this.httpclint.get<Icart[]>(`${environment.ApiBaseURL}/cart`);
  }
  
  deletfromcart(id:number): Observable <Icart>
  {
    return this.httpclint.delete<Icart>(`${environment.ApiBaseURL}/cart/${id}`,this.httpoption) 
    
  }
  clearcart(): Observable <Icart>
  {
    return this.httpclint.delete<Icart>(`${environment.ApiBaseURL}/cartuser `,this.httpoption) 
      
  }
  decrementquantaty(id:number): Observable <Icart>
  {
        return  this.httpclint.post <Icart>(`${environment.ApiBaseURL}/cart/${id}`,this.httpoption)
        
  }
 incrementquantaty(id:number): Observable <Icart>
 {
          return  this.httpclint.post <Icart>(`${environment.ApiBaseURL}/increment/${id}`,this.httpoption)
          
 }
 addtocart(product:Iproduct): Observable <Iproduct>{
  return  this.httpclint.post <Iproduct>(`${environment.ApiBaseURL}/cart`,JSON.stringify(product),this.httpoption)
  
  }


}
