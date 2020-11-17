import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model'
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {

  	search = '';
	wantedLocation = '';
	price_min = 0;
	price_max = "";
	wantedType = '';

  buyerId: number;

  productsData: ProductModel[] = [];
  servicesData: ProductModel[] = [];  

	searchData: ProductModel[] = [];  

  public prodPro: ProductModel[] = [
    {productId: 1, userId: 1, productType: "Product", productTitle: "Apple", productPrice: 2.90, productDescription: "Just an apple", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: false, productAvailable: true, deliveryPossible: true, isApproved: false},
     {productId: 2, userId: 2, productType: "Service", productTitle: "Banana", productPrice: 8.90, productDescription: "Just a banana", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: true, productAvailable: true, deliveryPossible: false, isApproved: false} 
    ];

  public prodServ: ProductModel[] = [
    {productId: 1, userId: 1, productType: "Product", productTitle: "Melon", productPrice: 3.10, productDescription: "Just a Melon", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: false, productAvailable: true, deliveryPossible: true, isApproved: false},
     {productId: 2, userId: 2, productType: "Service", productTitle: "Pumkin", productPrice: 12.40, productDescription: "Just a Pumkin", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: true, productAvailable: true, deliveryPossible: false, isApproved: false} 
    ];
    
  constructor(private httpClient: HttpClient, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/Product/').subscribe((productData: any) => {
      console.log(productData);
      this.productsData = productData;
    });

    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/Service/').subscribe((serviceData: any) => {
      console.log(serviceData);
      this.servicesData = serviceData;
    });

    this.buyerId = this.userDataService.userInformation.userId;

	if(this.wantedLocation != ''){
		this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/wantedLocation/' + this.wantedLocation + '/' + this.wantedType).subscribe((searchData: any) => {
		console.log(searchData);
		this.searchData = searchData;
		})
	}
	if(this.price_max != ''){
		this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/wantedPriceRange/' + this.price_min + '/' + this.price_max + '/' + this.wantedType).subscribe((searchData: any) => {
		console.log(searchData);
		this.searchData = searchData;
		})
	}
  }

  buyProd(product: ProductModel): void{
    this.httpClient.get(environment.endpointURL + 'product/buy/' + product.productId + '/' + this.buyerId).subscribe();
  }

  searchProd(): void {
    
  }
}
