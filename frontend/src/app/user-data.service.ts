import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UserModel } from './models/user.model';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'})

export class UserDataService {
  
  public userInformation: UserModel;
  public nutzerDaten: UserModel;
  
  private isAdmin: boolean;
  private isLogged: boolean;
  private currentUserName: string;

  private nutzerDatenSource = new Subject<UserModel>();
  nutzerDaten$ = this.nutzerDatenSource.asObservable();

  private isAdminSource = new Subject<boolean>();
  isAdmin$ = this.isAdminSource.asObservable();

  private isLoggedSource = new Subject<boolean>();
  isLogged$ = this.isLoggedSource.asObservable();

  private currentUserNameSource = new Subject<string>();
  currentUserName$ = this.currentUserNameSource.asObservable();


  getNutzerDaten(): UserModel {
    return this.nutzerDaten;
  }

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }

  getCurrentUserName(): string {
    return this.currentUserName;
  }

  setNutzerDaten(nutzer: UserModel): void {
    this.nutzerDatenSource.next(nutzer);
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdminSource.next(isAdmin);
  } 

  setIsLogged(isLogged: boolean): void {
    this.isLoggedSource.next(isLogged);
  }

  setCurrentUserName(name: string): void{
    this.currentUserNameSource.next(name);
  }

  constructor(private httpClient: HttpClient) {
    this.nutzerDaten$.subscribe(res => this.nutzerDaten = res);
    this.isAdmin$.subscribe(res => this.isAdmin = res);
    this.isLogged$.subscribe(res => this.isLogged = res);
    this.currentUserName$.subscribe(res => this.currentUserName = res);

    this.setIsAdmin(false);
    this.setIsLogged(this.checkLocalStorage());
    this.getUserFromLocalStorage();

    // Sets Current User to username in local storage. If no current user then getItem returns Null,
    // which is not a problem since the userName is only needed when logged in, so the userName then 
    // will not be null.
    this.setCurrentUserName(localStorage.getItem('userName'));
  }

  private getUserFromLocalStorage(): void {
    console.log('Checking for user data in local storage:');
    const userName = localStorage.getItem('userName');

    if (userName) {
      console.log('Logged in as: ' + userName);
      this.getUserByName(userName);
    } else {
      console.log('No user logged in');
    }
  }

  getUserByName(userName: string): void{
    this.httpClient.get<UserModel>(environment.endpointURL + 'user/username/' + userName).subscribe((userData: any) => {
      // The 'userData' variable contains alll the data returned from the backend in JSON format
      console.log(userData);

      // Save the 'userData' in a Variable
      this.userInformation = userData;
      this.setIsAdmin(this.userInformation.isAdmin); 
      this.setNutzerDaten(this.userInformation);
    })
  }

  checkLocalStorage(): boolean {
    if (localStorage.getItem('userToken') === null){
      return false;
    }
    else {
      return true;
    }
  }
}
