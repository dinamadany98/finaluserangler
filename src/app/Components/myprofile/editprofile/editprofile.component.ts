import { Component, OnChanges, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IuserProfile } from 'src/app/Models/iuser-profile';
import { UserService } from 'src/app/services/user.service';
import * as bcrypt from 'bcryptjs';
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit ,OnChanges {
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
   async chechpassword(old:any){
      const validPassword =await bcrypt.compare(old,this.newuserdata.password);
      
      //const x =bcrypt.
      console.log(validPassword);
     if(validPassword){
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
