import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Icheckout } from '../Models/icheckout';
import { Iorderitem } from '../Models/iorderitem';

@Injectable({
  providedIn: 'root'
})
export class OrderitemService {

  constructor(private httpclint:HttpClient) { }
  getuserorder() :Observable<Iorderitem[]>
  {
    return this.httpclint.get<Iorderitem[]>(`${environment.ApiBaseURL}/getuserorder`);
  }

  getorderforspasificuser() :Observable<Icheckout[]>
  {
    return this.httpclint.get<Icheckout[]>(`${environment.ApiBaseURL}/getorderforspasificuser`);
  }  
}
