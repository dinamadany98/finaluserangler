import { Component, OnInit } from '@angular/core';
import { IuserProfile } from 'src/app/Models/iuser-profile';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  userdata:IuserProfile[]=[]
  constructor(private user:UserService ) { }

  ngOnInit(): void {
  }

}
