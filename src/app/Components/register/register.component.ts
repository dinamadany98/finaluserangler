import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
// import { RegisterService } from 'src/app/services/register.service';
import { RegisterService } from 'src/app/services/register.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userformgroup: FormGroup;
  newuser: IUser = {} as IUser;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: RegisterService
  ) {
    /////////////////////////////////////////
    this.userformgroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      role: [''],
      password: ['', [Validators.required, Validators.minLength(6)]],
      conpassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  get name() {
    return this.userformgroup.get('name');
  }

  get email() {
    return this.userformgroup.get('email');
  }
  get role() {
    return this.userformgroup.get('role');
  }

  get password() {
    return this.userformgroup.get('password');
  }
  get conpassword() {
    return this.userformgroup.get('conpassword');
  }

  ngOnInit(): void {
    console.log(this.role);
  }
  addUser() {
    this.newuser.role = 'user';
    console.log(this.newuser);
    if (this.password?.value === this.conpassword?.value) {
      this.UserService.addUser(this.newuser).subscribe({
        next: (prd) => {
          this.router.navigate(['/home']);
          Swal.fire(
            'Registeration Succesfully!',
            'You clicked the button!',
            'success'
          );
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<a href="">Why do I have this issue?</a>',
          });
        },
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  }
}
