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
	deliveryOnly = false;

  buyerId: number;
  // Für vergleich ob genug geld vorhanden ist
  buyerMoney: number;

  isLogged = false;

  productsData: ProductModel[] = [];
  servicesData: ProductModel[] = [];  

	searchData: ProductModel[] = [];  
  
  constructor(private httpClient: HttpClient, private userDataService: UserDataService, private productsDataService: ProductsDataService) { 
    this.productsData = productsDataService.getMProducts();
    this.servicesData = productsDataService.getMServices();

    this.isLogged = userDataService.getIsLogged();

    productsDataService.MProducts$.subscribe(res => this.productsData = res);
    productsDataService.MServices$.subscribe(res => this.servicesData = res);

    userDataService.isLogged$.subscribe(res => this.isLogged = res);
  }

  ngOnInit(): void {

  this.buyerId = this.userDataService.userInformation.userId;
  this.buyerMoney = this.userDataService.userInformation.userBoolcoins;

	
  }

  buyProdServ(product: ProductModel): void{
   if (!(this.isLogged)) {
     window.alert('Please Login or Register in order to buy something');
   }

   else {
    if (this.productsDataService.buyProdServ(product, this.buyerId, this.buyerMoney)) {
      window.alert('Successfully bought');
    }

    else {
      window.alert('Not enough Money to buy');
    }
   }
  }

  searchProd(): void {
	if(this.wantedLocation == '' && this.price_max == ''){
		this.httpClient.get<ProductModel[]>(environment.endpointURL+'product/'+ this.wantedType).subscribe((searchData: any) => {
		console.log(searchData);
		this.searchData = searchData;
		})
	}
	else if(this.wantedLocation != ''){
		this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/wantedLocation/' + this.wantedLocation + '/' + this.wantedType).subscribe((searchData: any) => {
		console.log(searchData);
		this.searchData = searchData;
		})
	}
	else if(this.price_max != ''){
		this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/wantedPriceRange/' + this.price_min + '/' + this.price_max + '/' + this.wantedType).subscribe((searchData: any) => {
		console.log(searchData);
		this.searchData = searchData;
		})
	}
	else if(this.price_min != 0){
		this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/wantedPriceRange/' + this.price_min + '/' + '1000000' + '/' + this.wantedType).subscribe((searchData: any) => {
		console.log(searchData);
		this.searchData = searchData;
		})
	}
	//window.alert('Test \n' + this.wantedType +'  '+ this.wantedLocation + ' ' + this.price_min +'-'+this.price_max +'');
  }
}