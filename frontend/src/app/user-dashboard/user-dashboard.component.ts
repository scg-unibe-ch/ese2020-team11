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
  currentUserName: string;

  productType = '';
  productTitle = '';
  productPrice = '';
  productDescription = '';
  productLocation = '';
  productToLend = 0;
  productAvailable = 1;
  productDeliveryPossible = 1;
  productIsApproved = 0;
  currentUserToken = '';
  loggedIn = false;
  userId= 0;

  //In constructor, calls userdataservice for Username observable
  constructor(private httpClient: HttpClient, private userDataService: UserDataService) { 
    this.currentUserName = userDataService.getCurrentUserName();
    userDataService.currentUserName$.subscribe(res => this.currentUserName = res);
  }

  ngOnInit(): void {

    //does only work with a given username, not able to retrieve any username
    this.httpClient.get<UserModel>(environment.endpointURL + 'user/username/' + this.currentUserName).subscribe((userData: any) => {
      console.log(userData);
      this.currentUser = userData;
    });
    

    // In order for the methods to work, looking in the backend, you also need to deliver the verifytoken
    // Which you porbably can get from the localstorage (see user-login)

     //methods do not work because username not being retrievable
    /*
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/forSell/' +this.currentUser.userId).subscribe((productData: any) => {
      console.log(productData);
      this.currentProducts = productData;
    });
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/bought/' + this.currentUser.userId,).subscribe((productData: any) => {
      console.log(productData);
      this. boughtProducts= productData;
    });
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/sold/'+ this.currentUser.userId).subscribe((productData: any) => {
      console.log(productData);
      this.soldProducts = productData;
    });
    */
  }
  OnChange($event) {
    console.log($event);
    //MatCheckboxChange {checked,MatCheckbox}
  }
  // method to add a product to his user and put it on the  marketplace
  addProductToUser(): void {
    if ((this.productTitle === '') || (this.productDescription === '')) {
      window.alert('Please fill in all the required Information');
    }
    else {
      this.httpClient.post('/post/' + this.currentUser.userId,  {
        userId: this.currentUser.userId,
        productType: this.productType,
        productTitle: this.productTitle,
        productPrice: this.productPrice,
        productDescription: this.productDescription,
        productLocation: this.productLocation,
        productToLend: this.productToLend,
        productAvailable: this.productAvailable,
        deliveryPossible: this.productDeliveryPossible,
        isApproved: this.productIsApproved,
      }).subscribe((res: any) => {
        window.alert('You have added a product.');
      });
    }
  }
}
