import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './services/login.service';

@Injectable({
  providedIn: 'root',
})
export class AccessLoginGuard implements CanActivate {
  constructor(private loginservice: LoginService, private router: Router) {}
  canActivate(): boolean {
    if (this.loginservice.loggedin()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
