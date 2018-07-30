import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SmsService {

 // baseUrl: String= 'http://localhost:3000/api';
   baseUrl: String= 'https://nameless-plateau-38782.herokuapp.com/api';
  headers: Headers;
  options: RequestOptions;

    constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    }); // ... Set content type to JSON
    this.headers.append('x-auth-token',
    localStorage.getItem('x-auth-token'));
    // this.headers.append('user-type', 'Admin');
    this.options = new RequestOptions({ headers: this.headers });
  }



  // Add new sendSms
  sendSms(msg): Observable<Response> {
    const obj= {message:msg}
	  const body = JSON.stringify(obj);
	  console.log ('in service send message : ' + msg);
	  return this.http
			.post(this.baseUrl + '/admin/sendSmsToAllDrivers' ,  body ,  this.options)
			.map(this.extractData);

    }

    private extractData(res: Response) {
      const data = res.json();
      return data || {};
  }


}
