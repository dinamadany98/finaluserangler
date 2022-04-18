import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IuserProfile } from '../Models/iuser-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  httpoption={}
  constructor(private httpclint:HttpClient) {
    this.httpoption={
      headers:new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
   }
 
   getuserdata() :Observable<IuserProfile>
 {
return this.httpclint.get<IuserProfile>(`${environment.ApiBaseURL}/users`);
  }
 
  edituserprofile(user:IuserProfile): Observable <IuserProfile>{
    //console.log(user);
    return this.httpclint.patch<IuserProfile>(`${environment.ApiBaseURL}/users/${user.id}`, JSON.stringify(user),this.httpoption) 
    
     }

     deletuseracount(id:number): Observable <IuserProfile>{

      return this.httpclint.delete<IuserProfile>(`${environment.ApiBaseURL}/users/${id}`,this.httpoption) 
      
       }

 

}
