import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../Models/icategory';

@Injectable({
  providedIn: 'root',
})
export class CategoryServiceService {
  private httpoption = {};

  constructor(private httpclient: HttpClient) {
    this.httpoption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getallcategory(): Observable<ICategory[]> {
    return this.httpclient.get<ICategory[]>(
      `${environment.ApiBaseURL}/categories`
    );
  }
}
