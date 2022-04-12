import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IuserProfile } from 'src/app/Models/iuser-profile';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit,OnChanges {
 showtextboxforpassword:boolean=false;
 newshowtextboxforpassword:boolean=true;
 togeltextboxforpassword(){
   this.showtextboxforpassword=!this.showtextboxforpassword;
 }
 
 oldpassword="";
 trupasssord:any 
 newuserdata: IuserProfile={} as IuserProfile;
  constructor(private userservice: UserService,private rot:Router) { 
    

  }
  ngOnChanges() {
   if(this.oldpassword==this.newuserdata.password)
   {
     this.trupasssord=true;
   }
  }
  chechpassword(old:any){
    if(old===this.newuserdata.password){
         this.trupasssord =true
         
   this.showtextboxforpassword=!this.showtextboxforpassword;
   this.newshowtextboxforpassword=!this.newshowtextboxforpassword;
         console.log(this.trupasssord)
    }else{
      this.trupasssord =false
      console.log(this.trupasssord)
    }
    

  }
  ngOnInit() {

  this.userservice.getuserdata().subscribe(
    user=>{
       
      this.newuserdata=user;
  });
}


edit(){
    
 
 
     this.userservice.edituserprofile(this.newuserdata).subscribe({
       next:(user)=>{
         console.log(this.newuserdata)
      this.rot.navigate(['/myprofile'])
       },
     
       error:(err)=>{
         alert("error");
         console.log(err.message);
       }
     })
 
 
   }





}
