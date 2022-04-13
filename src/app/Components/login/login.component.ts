import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(private router: Router, private authservice: LoginService) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  login() {
    if (this.formGroup.valid) {
      this.authservice.auth_login(this.formGroup.value).subscribe((data) => {
        localStorage.setItem('login', data.token);
        this.router.navigate(['/home']);
          Swal.fire(
            'Login Correct',
            'You clicked the button!',
            'success'
        );
      });
    } 
    }
  }


