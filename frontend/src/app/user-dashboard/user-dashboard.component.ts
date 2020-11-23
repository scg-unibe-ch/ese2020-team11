import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model'
import { UserDataService } from '../user-data.service';
import { UserLoginComponent } from '../user-login/user-login.component';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser: UserModel;
  dashboardUserToken = localStorage.getItem('userToken');
  currentProducts: ProductModel[] = [];
  boughtProducts: ProductModel[] = [];
  soldProducts: ProductModel[] = [];
  //currentUserName = 'BoolMaster';

  currentUserName: string;

  prodType: '';
  prodTitle: '';
  prodPrice: '';
  prodDescription: '';
  prodLocation: '';
  prodToLend: 0;
  prodAvailable: 1;
  prodDeliveryPossible: 1;
  prodIsApproved: 0;
  userToken: any;
  loggedIn: any;
  userId: any;
  constructor(private httpClient: HttpClient, private userDataService: UserDataService) { }

  ngOnInit(): void {

    //gets current user 
    this.currentUser = this.userDataService.userInformation;

    //sets currentUsername to the name of current user
    this.currentUserName = this.currentUser.userName;

    //does only work with a given username, not able to retrieve any username
    this.httpClient.get<UserModel>(environment.endpointURL + 'user/username/' + this.currentUserName).subscribe((userData: any) => {
      console.log(userData);
      this.currentUser = userData;
    });
    /* methods do not work because username not being retrievable
    this.httpClient.get<ProductModel[]>(environment.endpointURL + '/getDashboard/forSell/' + 1 /*logedUserId + '/' + 0, ).subscribe((productData: any) => {
      console.log(productData);
      this.currentProducts = productData;
    });
    this.httpClient.get<ProductModel[]>(environment.endpointURL + '/getDashboard/bought/' + 1).subscribe((productData: any) => {
      console.log(productData);
      this. boughtProducts= productData;
    });
    this.httpClient.get<ProductModel[]>(environment.endpointURL + '/getDashboard/sold/'+ 1).subscribe((productData: any) => {
      console.log(productData);
      this.soldProducts = productData;
    });*/

  }
  // method to add a product to his user and put it on the  marketplace
  addProductToUser() { }

  
}
