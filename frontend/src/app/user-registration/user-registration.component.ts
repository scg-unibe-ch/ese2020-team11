import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { Country } from '@angular-material-extensions/select-country';
import { HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

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
  telephone = '';
	street = '';
	number = '';
	zip = 0;
  city = '';
  country = 'select-country';
  userToken: string;
  loggedIn = false;

  countryFormControl = new FormControl();
  countryFormGroup: FormGroup;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    
  }
 
  ngOnInit(): void {
    this.checkUserStatus();

    this.countryFormGroup = this.formBuilder.group({
      country: []
    });

    this.countryFormGroup.get('country').valueChanges
      .subscribe(country => console
        .log('this.countryFormGroup.get("country").valueChanges', country));

    this.countryFormControl.valueChanges
      .subscribe(country => console
        .log('this.countryFormControl.valueChanges', country));
  }

  onCountrySelected($event: Country) {
    console.log($event);
  }

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
        userCountry: this.onCountrySelected,
    }) .subscribe((res: any) => { 
      window.alert('You are now registered. Please go to the login section to log in');
    });
  }
}
}
