import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { UserModel } from './models/user.model';

@Injectable({
  providedIn: 'root'})

export class UserDataService {
  
  public userInformation: UserModel;

  constructor(private httpClient: HttpClient) {this.getUserFromLocalStorage()}

  getUserByName(userName: string): void {
    this.httpClient.get<UserModel>(environment.endpointURL + 'user/username/' + userName).subscribe((userData: any) => {
      // The 'userData' variable contains alll the data returned from the backend in JSON format
      console.log(userData);

      // Save the 'userData' in a Variable
      this.userInformation = userData; 
    }
    )
  }
  
  private getUserFromLocalStorage(): void {
    let userName = localStorage.getItem('userName');
    if (userName) {
      this.getUserByName(userName);
    }
  }
}
