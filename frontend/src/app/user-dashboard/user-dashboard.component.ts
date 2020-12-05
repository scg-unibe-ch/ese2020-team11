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
  
  public favoriteProd: ProductModel[] = [];

  //In constructor, calls userdataservice for Username observable
  constructor(private httpClient: HttpClient, private userDataService: UserDataService, private ProductsDataService: ProductsDataService) { 
    this.currentUserName = userDataService.getCurrentUserName();
    userDataService.currentUserName$.subscribe(res => this.currentUserName = res);
    this.userToken = localStorage.getItem('userToken');

    ProductsDataService.sellingList$.subscribe(res => this.currentProducts = res);
    ProductsDataService.boughtList$.subscribe(res => this.boughtProducts = res);
    ProductsDataService.soldList$.subscribe(res => this.soldProducts = res);
    ProductsDataService.favProducts$.subscribe(res => this.favoriteProd = res);

    userDataService.nutzerDaten$.subscribe(res => {
      this.currentUser = res;

      this.ProductsDataService.getSellingListR(this.currentUser.userId);
     
      this.ProductsDataService.getBoughtListR(this.currentUser.userId);

      this.ProductsDataService.getSoldListR(this.currentUser.userId);

      this.ProductsDataService.getFavList(this.currentUser.userId);
    });
  }

  ngOnInit(): void {
  
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
        this.ProductsDataService.getSellingListR(this.currentUser.userId);
      });
    }
   }

   deleteProduct(product: ProductModel): void {
    this.httpClient.delete(environment.endpointURL + 'dashboard/delete/' + this.currentUser.userId + '/' + product.productId, {
    }).subscribe(() => {this.ProductsDataService.getSellingListR(this.currentUser.userId), this.ProductsDataService.getMProductList(), this.ProductsDataService.getMServiceList() ,this.ProductsDataService.getApproveProductsList(), this.ProductsDataService.getApproveServicesList()});
   }

   updateProduct(product: ProductModel): void {
   }  

   removeFav(product: ProductModel): void {
    this.httpClient.delete(environment.endpointURL + 'product/removeFavorite/' +  product.productId + '/' + this.currentUser.userId, {
    }).subscribe();
   }
}