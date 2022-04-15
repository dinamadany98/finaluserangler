import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../Models/iproduct';
import { Iwhishlist } from '../Models/iwhishlist';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {
  httpoption={}
  constructor(private httpclint:HttpClient) { 
    this.httpoption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }

 
  addwishlistdata(Product:IProduct):Observable<IProduct>{
    return  this.httpclint.post <IProduct>(`${environment.ApiBaseURL}/wishlist`,JSON.stringify(Product),this.httpoption)
    
    }

    getwishlistdata() :Observable<IProduct[]>
    {
      return this.httpclint.get<IProduct[]>(`${environment.ApiBaseURL}/wishlist`);
    }  
    clearwishlist(): Observable <Iwhishlist>
    {
      return this.httpclint.delete<Iwhishlist>(`${environment.ApiBaseURL}/wishlistuser `,this.httpoption) 
        
    } 
    deletfromwishlist(id:number): Observable <Iwhishlist>
    {
      return this.httpclint.delete<Iwhishlist>(`${environment.ApiBaseURL}/wishlist/${id}`,this.httpoption) 
      
    }
}
