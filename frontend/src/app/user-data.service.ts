import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UserModel } from './models/user.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'})

export class UserDataService {
  
  public userInformation: UserModel;
  
  private isAdmin: boolean;
  private isLogged: boolean;

  private isAdminSource = new Subject<boolean>();
  isAdmin$ = this.isAdminSource.asObservable();

  private isLoggedSource = new Subject<boolean>();
  isLogged$ = this.isLoggedSource.asObservable();

  getIsAdmin(): boolean {
    return this.isAdmin;
  }

  getIsLogged(): boolean {
    return this.isLogged;
  }

  setIsAdmin(isAdmin: boolean): void {
    this.isAdminSource.next(isAdmin);
  } 

  setIsLogged(isLogged: boolean): void {
    this.isLoggedSource.next(isLogged);
  }

  constructor(private httpClient: HttpClient) {
    this.isAdmin$.subscribe(res => this.isAdmin = res);
    this.isLogged$.subscribe(res => this.isLogged = res);

    this.setIsAdmin(false);
    this.setIsLogged(false);

    this.getUserFromLocalStorage();
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

  getUserByName(userName: string): void {
    this.httpClient.get<UserModel>(environment.endpointURL + 'user/username/' + userName).subscribe((userData: any) => {
      // The 'userData' variable contains alll the data returned from the backend in JSON format
      console.log(userData);

      // Save the 'userData' in a Variable
      this.userInformation = userData;
      this.setIsAdmin(this.userInformation.isAdmin); 
    })
  }
}
