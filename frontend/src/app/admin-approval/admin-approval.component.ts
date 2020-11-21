import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { ProductsDataService } from '../product-data.service'

import { HttpClient } from '@angular/common/http';
import { ProductModel } from '../models/product.model'



@Component({
  selector: 'app-admin-approval',
  templateUrl: './admin-approval.component.html',
  styleUrls: ['./admin-approval.component.css']
})

export class AdminApprovalComponent implements OnInit {

  productsData: ProductModel[] = [];
  servicesData: ProductModel[] = [];  
  
  constructor(private productsDataService: ProductsDataService, private httpClient: HttpClient) {
    this.productsData = productsDataService.getApproveProducts();

    productsDataService.ApproveProducts$.subscribe(res => this.productsData = res);
    productsDataService.ApproveServices$.subscribe(res => this.servicesData = res);
   }

  ngOnInit(): void {

  }
  
  // Call the delete method in proudct-data Service
  deleteProdServ(product: ProductModel): void {
    this.productsDataService.deleteUnapprovedProdServ(product);
  }

  // Call the approve method in product-data Service
  approveProdServ(product: ProductModel): void {
    this.productsDataService.approveProdServ(product);
  }
}
