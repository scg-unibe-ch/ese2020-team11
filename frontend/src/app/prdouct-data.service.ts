import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ProductModel } from '../app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {
  public productsInformation: ProductModel[];
  public servicesInformation: ProductModel[];

  constructor(private httpClient: HttpClient ) {}
  getProducts(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'admin/Product/').subscribe((productData: any) => {
      // The 'userData' variable contains alll the data returned from the backend in JSON format
      console.log(productData);

      // Save the 'userData' in a Variable
      this.productsInformation = productData;
    }
    )
  }
  getServices(): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'admin/Services/').subscribe((serviceData: any) => {
      // The 'userData' variable contains alll the data returned from the backend in JSON format
      console.log(serviceData);

      // Save the 'userData' in a Variable
      this.servicesInformation = serviceData;
    }
    )
  }
}
