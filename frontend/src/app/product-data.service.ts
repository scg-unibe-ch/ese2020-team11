import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { ProductModel } from './models/product.model';
import { Subject } from 'rxjs';
import { UserModel } from './models/user.model';
import { ThrowStmt } from '@angular/compiler';
import { UserDataService } from './user-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsDataService {

  private tempProduct: ProductModel;
  private tempBuyer: UserModel;
  private tempSeller: UserModel;
  private moneyAmountBuyer: number;
  private moneyAmountSeller: number;

  // Market place products list
  public MProducts: ProductModel[];
  // Market place services list
  public MServices: ProductModel[];

  // Both lists for Products and Services which need to be approved
  public ApproveProducts: ProductModel[];
  public ApproveServices: ProductModel[];

  public sellingList: ProductModel[];
  public boughtList: ProductModel[];
  public soldList: ProductModel[];
  

  private MProductsSource = new Subject<ProductModel[]>();
  private MServicesSource = new Subject<ProductModel[]>();
  private ApproveProductsSource = new Subject<ProductModel[]>();
  private ApproveServicesSource = new Subject<ProductModel[]>();

  private sellingListSource = new Subject<ProductModel[]>();
  private boughtListSource = new Subject<ProductModel[]>();
  private soldListSource = new Subject<ProductModel[]>();


  MProducts$ = this.MProductsSource.asObservable();
  MServices$ = this.MServicesSource.asObservable();
  ApproveProducts$ = this.ApproveProductsSource.asObservable();
  ApproveServices$ = this.ApproveServicesSource.asObservable();

  sellingList$ = this.sellingListSource.asObservable();
  boughtList$ = this.boughtListSource.asObservable();
  soldList$ = this.soldListSource.asObservable();


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

  getSellingList(): ProductModel[] {
    return this.sellingList;
  }

  getBoughtList(): ProductModel[] {
    return this.boughtList;
  }

  getSoldList(): ProductModel[] {
    return this.soldList;
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

  SetSellingList(sellList: ProductModel[]): void {
    this.sellingListSource.next(sellList);
  }

  SetBoughtList(boughtList: ProductModel[]): void {
    this.boughtListSource.next(boughtList);
  }

  SetSoldList(soldList: ProductModel[]): void {
    this.soldListSource.next(soldList);
  }

  constructor(private httpClient: HttpClient, private userDataService: UserDataService ) {
    this.MProducts$.subscribe(res => this.MProducts = res);
    this.MServices$.subscribe(res => this.MServices = res);
    this.ApproveProducts$.subscribe(res => this.ApproveProducts = res);
    this.ApproveServices$.subscribe(res => this.ApproveServices = res);

    this.sellingList$.subscribe(res => this.sellingList = res);
    this.boughtList$.subscribe(res => this.boughtList = res);
    this.soldList$.subscribe(res => this.soldList = res);

    this.setMProducts([]);
    this.setMServices([]);
    this.SetApproveProducts([]);
    this.SetApproveServices([]);
    
    this.SetSellingList([]);
    this.SetBoughtList([]);
    this.SetSoldList([]);

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

  getSellingListR(userId): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/forSell/' + userId).subscribe((currentProductData: any) => {
      console.log(currentProductData);
      this.SetSellingList(currentProductData);
    });
  }

  getBoughtListR(userId): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/bought/' + userId).subscribe((productData: any) => {
      console.log(productData);
      this.SetBoughtList(productData);
    });
  }

  getSoldListR(userId): void {
    this.httpClient.get<ProductModel[]>(environment.endpointURL + 'dashboard/getDashboard/sold/'+ userId).subscribe((productData: any) => {
      console.log(productData);
      this.SetSoldList(productData);
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

  buyProdServ(product: ProductModel, buyerId: number): boolean {
    // Rufe buy product product Id auf um in temporäre variable zu speichern und dann so den preis zu
    // entnehmen
    this.httpClient.get<ProductModel>(environment.endpointURL + 'product/buy/product/' + product.productId).subscribe((productData: any) => {
      console.log(productData);
      this.tempProduct = productData;
    });

    // Speichern der nutzerdaten des Käufers
    this.httpClient.get<UserModel>(environment.endpointURL + 'product/buy/user/' + buyerId).subscribe((userData: any) => {
      console.log(userData);
      this.tempBuyer = userData;
    }); 

    // Wenn genug geld, dann ganzer if block (Kauf) ausführen, ansonten return false
    if (this.tempProduct.productPrice <= this.tempBuyer.userBoolcoins) {
     
      // Gleiche für buy user user id um den verküfer id zu erhalten (um später dieser person den Preis
     // gut zu schreiben)
     this.httpClient.get<UserModel>(environment.endpointURL + 'product/buy/user/' + this.tempProduct.userId).subscribe((userData: any) => {
       console.log(userData);
       this.tempSeller = userData;
     }); 

     // Dann buy productsstatusupdate um das produkt auf nicht mehr verfügbar zu setzen (muss dann die
     // liste wieder updaten (Sowohl MProuctList als auch MServiceList))
     this.httpClient.put(environment.endpointURL + 'product/buy/productStatusUpdate/' + product.productId, {
     }).subscribe(() => { this.getMProductList(), this.getMServiceList()});

     // Dann kopieren des produkts/service in die kaufte list (nicht nötig zu speichern, evtl doch für
     // user dashboard) (Müsste dann methode geben die den aktuellen usser nimmt und in der gekauften
     // liste alle rausfiltert die dem user entsprechen und dann in dieser liste abspeichern, dass diese
     // Liste dann im user dashboard, analaog zu allen anderen listen dynamische angezeigt wird.)

     //this.httpClient.post(environment.endpointURL + 'product/buy/saveProduct/', {
     //}).subscribe();


     // Zum schluss dann 2 mal buy boolcoin update aufrufen, einmal mit user id des verkäufers und positiven
     // Wert und beim zweitenmal die id des käufers und negativen wert. 

     // Wert des Käufer guthaben:
     this.moneyAmountBuyer = this.tempBuyer.userBoolcoins - this.tempProduct.productPrice;
    
     // Wert des Verkäufer guthaben:
     this.moneyAmountSeller = this.tempSeller.userBoolcoins + this.tempProduct.productPrice;
    
     // (-) Wert für käufer 
     this.httpClient.put(environment.endpointURL + 'product/buy/boolcoinUpdate/' + this.tempBuyer.userId + '/' + this.moneyAmountBuyer, {
     }).subscribe(() => {this.userDataService.getUserFromLocalStorage()});
                         // this.usetDataService..... nötig um NutzerDaten(Geld) des käufers im DashBoard zu Aktuallisieren

     // + Wert für verkäufer
     this.httpClient.put(environment.endpointURL + 'product/buy/boolcoinUpdate/' + this.tempSeller.userId + '/' + this.moneyAmountSeller, {
     }).subscribe();

     this.getBoughtListR(this.tempBuyer.userId);
     this.getSoldListR(this.tempSeller.userId);

     return true;
    }

    else {
      return false;
    }
  }
}
