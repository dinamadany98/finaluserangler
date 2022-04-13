import { Injectable } from '@angular/core';
import { CanActivate,Router } from '@angular/router';
import { LoginService } from './Services/login.service';
@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private loginservice: LoginService, private router: Router) { }
  canActivate(): boolean  {
    if (this.loginservice.loggedin()) {
      return true;
    }
    else {
      this.router.navigate(['/login'])
      return false;
    }

  }
  
}
