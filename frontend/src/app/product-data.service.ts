import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ProductModel } from './models/product.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  // Market place products list
  public MProducts: ProductModel[];
  // Market place services list
  public MServices: ProductModel[];

  // Both lists for Products and Services which need to be approved
  public ApproveProducts: ProductModel[];
  public ApproveServices: ProductModel[];
  

  private MProductsSource = new Subject<ProductModel[]>();
  private MServicesSource = new Subject<ProductModel[]>();
  private ApproveProductsSource = new Subject<ProductModel[]>();
  private ApproveServicesSource = new Subject<ProductModel[]>();


  MProducts$ = this.MProductsSource.asObservable();
  MServices$ = this.MServicesSource.asObservable();
  ApproveProducts$ = this.ApproveProductsSource.asObservable();
  ApproveServices$ = this.ApproveServicesSource.asObservable();


  getMProducts(): ProductModel[] {
    return this.MProducts;
  }

  getMServices(): ProductModel[] {
    return this.MServices;
  }

  getApproveProducts(): ProductModel[] {
    return this.ApproveProducts;
  }

  getApproveServices(): ProductModel[] {
    return this.ApproveServices;
  }


  setMProducts(MProducts: ProductModel[]): void {
    this.MProductsSource.next(MProducts)
  }

  setMServices(MServices: ProductModel[]): void {
    this.MServicesSource.next(MServices)
  }

  SetApproveProducts(ApproveProducts: ProductModel[]): void {
    this.ApproveProductsSource.next(ApproveProducts)
  }

  SetApproveServices(ApproveServices: ProductModel[]): void {
    this.ApproveServicesSource.next(ApproveServices)
  }


  constructor(private httpClient: HttpClient ) {
    this.MProducts$.subscribe(res => this.MProducts = res);
    this.MServices$.subscribe(res => this.MServices = res);
    this.ApproveProducts$.subscribe(res => this.ApproveProducts = res);
    this.ApproveServices$.subscribe(res => this.ApproveServices = res);

    this.setMProducts([]);
    this.setMServices([]);
    this.SetApproveProducts([]);
    this.SetApproveServices([]);
    
    this.getMProductList();
    this.getMServiceList();
    this.getApproveProductsList();
    this.getApproveServicesList();
  }
  

  // Get methods for MArketplace Product/Service List and Approve Products/Service List
  getMProductList(): void {
   this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/product/').subscribe((productData: any) => {
     console.log(productData)
     this.setMProducts(productData);
   });
  }   

  getMServiceList(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'product/service/').subscribe((serviceData: any) => {
      console.log(serviceData);
      this.setMServices(serviceData);
    });
  }

  getApproveProductsList(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'admin/getProducts/product/').subscribe((productData: any) => {
      console.log(productData);
      this.SetApproveProducts(productData);
    });
  }

  getApproveServicesList(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'admin/getProducts/service/').subscribe((serviceData: any) => {
      console.log(serviceData);
      this.SetApproveServices(serviceData);
    });
  }

  // Approves Product and Service and updates the ApproveProdList and ApproveServiceList
  // Not sure if it is better to have two sepperate approve methods for Products and Service or
  // have one but reload both list every time.

  approveProdServ(product: ProductModel): void {
    this.httpClient.put(environment.endpointURL + 'admin/approve/' + product.productId, {
    }).subscribe(() => { this.getMProductList(), this.getMServiceList() ,this.getApproveProductsList(), this.getApproveServicesList() });
  }

  deleteUnapprovedProdServ(product: ProductModel): void {
    this.httpClient.delete(environment.endpointURL + 'admin/delete/' + product.productId, {
    }).subscribe(() => { this.getApproveProductsList(), this.getApproveServicesList() });
  }

  buyPord(product: ProductModel, buyerId: number): void {
    this.httpClient.get(environment.endpointURL + 'product/buy/' + product.productId + '/' + buyerId).subscribe();
  }
}
