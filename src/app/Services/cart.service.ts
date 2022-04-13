import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icart } from '../Models/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpclint:HttpClient) { }

  getcartdata() :Observable<Icart[]>
  {
 return this.httpclint.get<Icart[]>(`${environment.ApiBaseURL}/cart`);
   }
  


}
