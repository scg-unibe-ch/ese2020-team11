import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  eMail = '';
  userName = '';
  firstName = '';
  lastName = '';
  password = '';

	//optional registration fields
	street = '';
	number = '';
	zip = 0;
	city = '';

  userToken: string;
  loggedIn = false;



  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.checkUserStatus();
  }

  // Needs to change
  checkUserStatus(): void {
    // Get user data from local storage
    this.userToken = localStorage.getItem('userToken');
    this.userName = localStorage.getItem('userName');
    this.eMail = localStorage.getItem('eMail');

    // Set boolean whether a user is logged in or not
    this.loggedIn = !!(this.userToken);
  }

  regist(): void {
    this.httpClient.post(environment.endpointURL + 'user/register', {
      //user: {
        userMail: this.eMail,
        userFirstName: this.firstName,
        userLastName: this.lastName,
        userName: this.userName,
        password: this.password,
        //optional registration fields
        userStreet: this.street,
        userStreetNumber: this.number,
        userPinCode: this.zip,
        userCity: this.city,
        userGender: "string",
        userTelephone: "string",
        userCountry: "string",
      //}
    }).subscribe((res: any) => {
      // Set user data in local storage
      localStorage.setItem('userToken', res.token);
      localStorage.setItem('eMail', res.user.userMail);
      localStorage.setItem('userName', res.user.userName);
      this.checkUserStatus();
    });
  }

  logout(): void {
    // Remove user data from local storage
    localStorage.removeItem('userToken');
    localStorage.removeItem('eMail');
    localStorage.removeItem('userName');

    this.checkUserStatus();
  }
}
