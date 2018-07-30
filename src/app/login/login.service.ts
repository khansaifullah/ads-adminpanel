
import { Login } from '../Models/Login';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

@Injectable()
export class LoginService {
  headers: Headers;
  options: RequestOptions;
  token: String;
  // baseUrl: String= 'https://qau-smart-ride.herokuapp.com/api';
  baseUrl: String= 'https://nameless-plateau-38782.herokuapp.com/api';
  // baseUrl: String= 'http://localhost:3500/';
  constructor( private http: Http ) {


    // console.log("In constructor LoginService");

    this.headers = new Headers({ 'Content-Type': 'application/json',
    'Accept': 'q=0.8;application/json;q=0.9'
   }); // ... Set content type to JSON
    this.options = new RequestOptions({ headers: this.headers });
   }


   login(login: Login ): Observable<Response> {

    const body = JSON.stringify(login);
    //  this.http
    //  .post(this.baseUrl + 'admin/login' ,  body ,  this.options).subscribe(resp => {
    //   console.log ('Token in Header resp **' + resp.headers.get('x-auth'));
    //  });
     return this.http
     .post(this.baseUrl + '/admin/login' ,  body ,  this.options);
			// .map(this.extractData);
    }


   setOneSignalId(oneSignalObject): Observable<Response> {
    const body = JSON.stringify(oneSignalObject);
     return this.http
     .post(this.baseUrl + '/admin/onesignal' ,  body ,  this.options);
			// .map(this.extractData);
    }

    extractData(res: Response) {

        const bodyData = res.json();
        return bodyData || {};
    }

}

