import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model'

@Component({
  selector: 'app-market-place',
  templateUrl: './market-place.component.html',
  styleUrls: ['./market-place.component.css']
})
export class MarketPlaceComponent implements OnInit {

  productsData: ProductModel[] = [];
  servicesData: ProductModel[] = [];  

  public prodPro: ProductModel[] = [
    {productId: 1, userId: 1, productType: "Product", productTitle: "Apple", productPrice: 2.90, productDescription: "Just an apple", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: false, productAvailable: true, deliveryPossible: true, isApproved: false},
     {productId: 2, userId: 2, productType: "Service", productTitle: "Banana", productPrice: 8.90, productDescription: "Just a banana", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: true, productAvailable: true, deliveryPossible: false, isApproved: false} 
    ];

  public prodServ: ProductModel[] = [
    {productId: 1, userId: 1, productType: "Product", productTitle: "Melon", productPrice: 3.10, productDescription: "Just a Melon", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: false, productAvailable: true, deliveryPossible: true, isApproved: false},
     {productId: 2, userId: 2, productType: "Service", productTitle: "Pumkin", productPrice: 12.40, productDescription: "Just a Pumkin", productLocation: "Switzerland, Hochschulstrasse 6, 3012 Bern", productToLend: true, productAvailable: true, deliveryPossible: false, isApproved: false} 
    ];
    
  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'market/Product/').subscribe((productData: any) => {
      console.log(productData);
      this.productsData = productData;
    });

    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'market/Services/').subscribe((serviceData: any) => {
      console.log(serviceData);
      this.servicesData = serviceData;
    });
  }

  buyProd(prouct: ProductModel): void{
    
  }

}
