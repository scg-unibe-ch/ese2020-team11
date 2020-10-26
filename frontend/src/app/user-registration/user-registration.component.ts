import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ReactiveFormsModule, FormsModule, } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

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
  // and phone number of user
  gender = '';
  /*favoriteGender: string;
  genders: string[] = ['male', 'female', '*'];
 */
  telephone = '';
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
    if((this.userName === '') || (this.password === '') || (this.eMail === '')) {
      window.alert('Please fill in all the required Information');
    }
    else {
    this.httpClient.post(environment.endpointURL + 'user/register', {
      //user: {
        //maybe an if statment, if pw empty dont do anything and show a window allert
        userMail: this.eMail,
        userFirstName: this.firstName,
        userLastName: this.lastName,
        userName: this.userName,
        password: this.password,
        //optional registration fields
        userGender: this.gender,
        userTelephone: this.telephone,
        userStreet: this.street,
        userStreetNumber: this.number,
        userPinCode: this.zip,
        userCity: this.city,
       
        userCountry: "string",
      //}
    }) .subscribe((res: any) => { 
      window.alert('You are now registered. Please go to the login section to log in');
    });
  }
}
}
