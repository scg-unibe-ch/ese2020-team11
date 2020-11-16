import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ProductsDataService } from '../prdouct-data.service'

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductModel } from '../models/product.model'



@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})

export class AdminApprovalComponent implements OnInit {

  productsData: ProductModel[] = [];
  servicesData: ProductModel[] = [];  
  public prod: ProductModel[] = [
    {productId: 1, userId: 1, productType: "Product", productTitle: "Apple", productPrice: 2.90, productDescription: "Just an apple", productLocation: "AUT", productToLend: false, productAvailable: true, deliveryPossible: false, isApproved: false},
     {productId: 2, userId: 2, productType: "Service", productTitle: "Banana", productPrice: 8.90, productDescription: "Just a banana", productLocation: "USA", productToLend: false, productAvailable: true, deliveryPossible: false, isApproved: false} ]
  
  constructor(private productsDataService: ProductsDataService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'admin/Product/').subscribe((productData: any) => {
      console.log(productData);
      this.productsData = productData;
    });

    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'admin/Service/').subscribe((serviceData: any) => {
      console.log(serviceData);
      this.servicesData = serviceData;
    });
  }
  
  deleteProdServ(product: ProductModel): void {
    this.httpClient.delete(environment.endpointURL + 'admin/' + product.productId, {
    }).subscribe();
  }

  approveProdServ(product: ProductModel): void {
    this.httpClient.put(environment.endpointURL + 'admin/' + product.productId, {
    }).subscribe();
  }
}
