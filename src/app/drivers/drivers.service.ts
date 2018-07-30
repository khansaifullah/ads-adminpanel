import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../Models/Quote';
import { Driver } from '../Models/Driver';

@Injectable()
export class DriversService {

  // baseUrl: String= 'https://qau-smart-ride.herokuapp.com/api';
    baseUrl: String= 'https://nameless-plateau-38782.herokuapp.com/api';
  // baseUrl: String= 'http://localhost:3500';
  headers: Headers;
  options: RequestOptions;

    constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    }); // ... Set content type to JSON
    this.headers.append('x-auth-token', localStorage.getItem('x-auth-token'));
    // this.headers.append('user-type', 'Admin');
    this.options = new RequestOptions({ headers: this.headers });
  }

    getDrivers(): Observable<Driver[]> {

      // this.http.get(this.baseUrl + '/quotes', this.options ).subscribe(data => {
      //   console.log('data' + data);
      // });
      return this.http.get(this.baseUrl + '/driver', this.options)
      .map(res => <Driver[]>res.json().object);

  }

  // // Add new Category
  // addMarkerCategory(markerCategoryToSet  ): Observable<Response> {
	// let body = JSON.stringify(markerCategoryToSet);
	// console.log ('in service Add Category : '+ markerCategoryToSet);
	// 	return this.http
	// 		.post(this.baseUrl + '/v2.0/markerCategory' ,  body ,  this.options)
	// 		.map(this.extractData);

  //   }

  		// Edit a Driver
      updateDriver(driver): Observable<Response> {
        const body = JSON.stringify(driver);
        console.log ('URL : ', this.baseUrl + '/driver/' + driver._id);
        return this.http
          .patch(this.baseUrl + '/driver/' + driver._id ,  body ,  this.options)
          .map(this.extractData);

        }



      // Delete Driver
      deleteDriver(driverIdToDelete: String ): Observable<Response> {
      const body = JSON.stringify(driverIdToDelete);
      console.log ('URL : ', this.baseUrl + '/driver/' + driverIdToDelete);
      return this.http
        .delete(this.baseUrl + '/driver/' + driverIdToDelete , this.options)
        .map(this.extractData);

      }

    private extractData(res: Response) {
      const data = res.json();
      return data || {};
  }


}
