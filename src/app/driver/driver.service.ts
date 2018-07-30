import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Quote } from '../Models/Quote';

@Injectable()
export class DriverService {
  // baseUrl: String= 'https://qau-smart-ride.herokuapp.com/api';
   baseUrl: String= 'https://nameless-plateau-38782.herokuapp.com/api';
  headers: Headers;
  options: RequestOptions;

    constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    }); // ... Set content type to JSON
    this.headers.append('x-auth-token', localStorage.getItem('x-auth-token'));
    console.log('x-auth-token : ', localStorage.getItem('x-auth-token'));
    // this.headers.append('user-type', 'Admin');
    this.options = new RequestOptions({ headers: this.headers });
  }



  // Add new driver
  addDriver(driver): Observable<Response> {
    const body = JSON.stringify(driver);
    console.log ('in service Add driver : ' + driver);
    return this.http
    .post(this.baseUrl + '/users/register' ,  body ,  this.options)
     .map(this.extractData);

    }

    private extractData(res: Response) {
      const data = res.json();
      return data || {};
  }


}
