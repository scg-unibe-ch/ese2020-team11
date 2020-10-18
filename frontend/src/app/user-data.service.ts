import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from './models/user.model';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'})

export class UserDataService {
  
  public userObservable: Observable<UserModel>;

  constructor(private httpClient: HttpClient) {this.getUserFromLocalStorage()}

  // Not sure if this works/does the correct thing, since I get some strange result like: isScalar
  getUserByName(userName: string): Observable<UserModel> {
    return this.httpClient.get<UserModel>(environment.endpointURL + 'user/username' + userName).pipe(share())
  }
  
  private getUserFromLocalStorage(): void {
    let userName = localStorage.getItem('userName');
    if (userName) {
      this.userObservable = this.getUserByName(userName);
    }
  }
}
