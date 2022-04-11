import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
 showtextboxforpassword:boolean=false;
 togeltextboxforpassword(){
   this.showtextboxforpassword=!this.showtextboxforpassword;
 }
  constructor() { }

  ngOnInit(): void {
  }

}
