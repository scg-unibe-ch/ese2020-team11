import { Component, OnInit } from '@angular/core';
import { UserModel } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model'
import { UserDataService } from '../user-data.service';
import { Injectable } from '@angular/core';
import { ProductsDataService } from '../product-data.service'

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
  currentProducts: ProductModel[] = [];
  boughtProducts: ProductModel[] = [];
  soldProducts: ProductModel[] = [];
  
  currentUserName: string;

  productType = '';
  productTitle = '';
  productPrice = '';
  productDescription = '';
  productLocation = '';
  productToLend = false;
  productAvailable = true;
  deliveryPossible = false;
  productIsApproved = false;
  userToken: string;
  
  

  //In constructor, calls userdataservice for Username observable
  constructor(private httpClient: HttpClient, private userDataService: UserDataService, private ProductsDataService: ProductsDataService) { 
    this.currentUserName = userDataService.getCurrentUserName();
    userDataService.currentUserName$.subscribe(res => this.currentUserName = res);
    this.userToken = localStorage.getItem('userToken');


    userDataService.nutzerDaten$.subscribe(res => {
      this.currentUser = res;
      this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/forSell/' + this.currentUser.userId).subscribe((currentProductData: any) => {
        console.log(currentProductData);
        this.currentProducts = currentProductData;
      });
    });
  }

  ngOnInit(): void {

    //this.httpClient.get<UserModel>(environment.endpointURL + 'user/username/' + this.currentUserName).subscribe((userData: any) => {
    //  console.log(userData);
    //  this.currentUser = userData;
    //});

    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/forSell/' + this.currentUser.userId).subscribe((currentProductData: any) => {
      console.log(currentProductData);
      this.currentProducts = currentProductData;
    });

   /*
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/bought/' + this.currentUser.userId).subscribe((productData: any) => {
      console.log(productData);
      this. boughtProducts= productData;
    });
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/sold/'+ this.currentUser.userId).subscribe((productData: any) => {
      console.log(productData);
      this.soldProducts = productData;
    });*/

  }

  // method to add a product to his user and put it on the  marketplace
  addProductToUser(): void {
    if ((this.productTitle === '') || (this.productPrice === '') || (this.productLocation === '')){
      window.alert('Please fill in all the Required Information. (Marked with a Star)')
    }
    else if (isNaN(Number(this.productPrice))) {
      window.alert('Only numbers are allowed in price');
    }
    else {
      this.httpClient.post(environment.endpointURL + 'dashboard/post/' + this.currentUser.userId, {
        userId: this.currentUser.userId,
        productType: this.productType,
        productTitle: this.productTitle,
        productPrice: this.productPrice,
        productDescription: this.productDescription,
        productLocation: this.productLocation,
        productToLend: this.productToLend,
        productAvailable: this.productAvailable,
        deliveryPossible: this.deliveryPossible,
        isApproved: this.productIsApproved,
      }).subscribe((res: any) => { 
        window.alert('Your addvertisment is now going to be verified, this may take some time');
        this.ProductsDataService.getApproveProductsList();
        this.ProductsDataService.getApproveServicesList();
      });
    }
   }

   // Does not work (stuck in infinite accordingly to postman)
   deleteProduct(product: ProductModel): void {
    this.httpClient.delete(environment.endpointURL + 'dashboard/delete/' + this.currentUser.userId + '/' + product.productId, {
    }).subscribe(() => {this.getSellingList()});
   }

   updateProduct(product: ProductModel): void{
   }

   // Only works if you hardcode the userId
   getSellingList(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/forSell/' + this.userDataService.userInformation.userId).subscribe((currentProductData: any) => {
      console.log(currentProductData);
      this.currentProducts = currentProductData;
    });
   }
  
}