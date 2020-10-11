import { Component, OnInit } from '@angular/core';

// Should only be visible if logged in and admin 

@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})
export class AdminApprovalComponent implements OnInit {

  isAdmin = false;
  
  constructor() { }

  ngOnInit(): void {
  }

}
