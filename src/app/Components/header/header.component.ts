import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
// import { LoginService } from 'src/app/Services/login.service';
// import {}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router) {}

  loggedin() {
    return !!localStorage.getItem('login');
  }
  logoutuser() {
    localStorage.removeItem('login');
    this.router.navigate(['/home']);
  }
  ngOnInit(): void {}
}
