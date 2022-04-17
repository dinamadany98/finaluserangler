import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icheckout } from '../Models/icheckout';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  httpoption={}
  constructor(private httpclint:HttpClient) { 
    this.httpoption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
  }


  addshippigdetails(shiping:Icheckout): Observable <Icheckout>{
    return  this.httpclint.post <Icheckout>(`${environment.ApiBaseURL}/OrderItem`,JSON.stringify(shiping),this.httpoption)
    
    }

}
