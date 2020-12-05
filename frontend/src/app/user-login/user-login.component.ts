import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDataService } from '../user-data.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  userName = '';
  password = '';
  
  userToken: string;
  loggedIn = false;

  secureEndpointResponse = '';

  constructor(private httpClient: HttpClient, private userDataService: UserDataService) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  login(): void {
    this.httpClient.post(environment.endpointURL + 'user/login', {
      userName: this.userName,
      password: this.password, 
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('userName', res.user.userName);
      this.checkUserStatus();

      this.userDataService.setIsAdmin(res.user.isAdmin);
      this.userDataService.setIsLogged(true);
      this.userDataService.setCurrentUserName(localStorage.getItem('userName'))
      window.location.reload();
    },
      err => {
          window.alert('Wrong username or password'); 
      }
    );
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('userName');
    //localStorage.reomveItem('userRole');
    
    this.checkUserStatus();

    // When logout, also clear user-data.sevice.ts
    this.userDataService.userInformation = null; 

    // Logging out definitely means that no admin is present, so set 'isAdmin' to FALSE
    this.userDataService.setIsAdmin(false);
    this.userDataService.setIsLogged(false);
    this.userDataService.setCurrentUserName(localStorage.getItem('userName'));
  }

  /**
   * Function to access a secure endpoint that can only be accessed by logged in users by providing their token.
   */
  accessSecuredEndpoint(): void {
    this.httpClient.get(environment.endpointURL + 'secured').subscribe((res: any) => {
      this.secureEndpointResponse = 'Successfully accessed secure endpoint. Message from server: ' + res.message;
    }, (error: any) => {
      this.secureEndpointResponse = 'Unauthorized';
    });
  }
}
