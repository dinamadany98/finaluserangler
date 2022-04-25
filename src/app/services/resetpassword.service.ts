import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResetpasswordService {

  constructor(private httpClient:HttpClient) { }


    sendemail(data:any):Observable<any>
    {
      return this.httpClient.post(`${environment.ApiBaseURL}/resetpassword`,data);
    }

    updatepassword(data:any):Observable<any>
    {
      console.log(data);
      return this.httpClient.post(`${environment.ApiBaseURL}/updatepassword`,data);

    }
}
