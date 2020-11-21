import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model'
import { UserDataService } from '../user-data.service';
import { ProductsDataService } from '../product-data.service';

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
  
  constructor(private httpClient: HttpClient, private userDataService: UserDataService, private productsDataService: ProductsDataService) { 
    this.productsData = productsDataService.getMProducts();
    this.servicesData = productsDataService.getMServices();

    productsDataService.MProducts$.subscribe(res => this.productsData = res);
    productsDataService.MServices$.subscribe(res => this.servicesData = res);
  }

  ngOnInit(): void {

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
    this.productsDataService.buyPord(product, this.buyerId);
  }

  searchProd(): void {
    
  }
}
