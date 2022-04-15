import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Models/iuser';
import { UserServiceService } from 'src/app/Services/user-service.service';
import Swal from 'sweetalert2';
// import { ConfirmedValidator } from './confirmed.validator';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  userformgroup: FormGroup;
  newuser: IUser = {} as IUser;
  form: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserServiceService
  ) {
    // this.form = fb.group(
    //   {
    //     password: ['', [Validators.required]],
    //     confirm_password: ['', [Validators.required]],
    //   },
    //   {
    //     validator: ConfirmedValidator('password', 'confirm_password'),
    //   }
    // );
    /////////////////////////////////////////
    this.userformgroup = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
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
  get password() {
    return this.userformgroup.get('password');
  }
  get conpassword() {
    return this.userformgroup.get('conpassword');
  }

  ngOnInit(): void {}
  addUser() {
    console.log(this.password?.value);
    console.log(this.conpassword?.value);
    if (this.password?.value === this.conpassword?.value) {
      this.UserService.addUser(this.newuser).subscribe({
        next: (prd) => {
          this.router.navigate(['/home']);
          Swal.fire(
            'Registeration Correct',
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
