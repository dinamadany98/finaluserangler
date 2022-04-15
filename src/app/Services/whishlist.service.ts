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
    return  this.httpclint.post <IProduct>(`${environment.ApiBaseURL}/cart`,JSON.stringify(Product),this.httpoption)
    
    }
}
