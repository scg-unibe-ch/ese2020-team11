import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  //information= '';

  //Set isAdmin to the value which is obtained from this.userDataService.userInformation.isAdmin
  isAdmin = false;
 
  
  constructor(private userDataService: UserDataService) { }

  // To Do: Should show the list of Product/Services like in Marketplace, but only those with 
  // a not approved flag, so the admin aproves it and sets the flag to aproved
  ngOnInit(): void {
    this.callUserStatus();
  }

  //Only works if reloading the page after log in or log out.
  callUserStatus(): void {
    //this.information = JSON.stringify(this.userInformation.isAdmin);
    this.isAdmin = this.userDataService.userInformation.isAdmin;
  }
}
