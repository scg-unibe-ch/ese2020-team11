import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';
import { UserModel } from '../models/user.model';
import { Observable } from 'rxjs';
import { ResourceLoader } from '@angular/compiler';

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  information: Observable<UserModel>;
  isAdmin = true;
  clearInfo = '';
  
  constructor(private userDataService: UserDataService) { }

  // To Do: Should show the list of Product/Services like in Marketplace, but only those with 
  // a not approved flag, so the admin aproves it and sets the flag to aproved
  ngOnInit(): void {
    this.information = this.userDataService.userObservable;
    this.clearInfo = JSON.stringify(this.information);   //Outpur not correctly? Shows "scalar: falese, ..."

  }

}
