import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IuserProfile } from 'src/app/Models/iuser-profile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit, OnChanges {
  userdata: IuserProfile={} as IuserProfile;
 constructor(private userservice: UserService,private rout:Router) {

 }
 ngOnChanges() {

 }

 ngOnInit(): void {


 this.userservice.getuserdata().subscribe(
   user=>{

     this.userdata=user;
     console.log(this.userdata);
 });
}
del(id:any){
 this.userservice.deletuseracount(id).subscribe({
   next: () => {
      localStorage.removeItem('login');
  this.rout.navigate(['/home'])
   },

   error:(err)=>{
     alert("error")
   }
 })
 }

}
