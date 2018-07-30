import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { OverSpeedAlert } from '../Models/OverSpeedAlert';
import { Driver } from '../Models/Driver';
import { Shift } from '../Models/Shift';

@Injectable()
export class DashboardService {

  // baseUrl: String= 'https://qau-smart-ride.herokuapp.com/api';
   baseUrl: String= 'https://nameless-plateau-38782.herokuapp.com';
  // baseUrl: String= 'http://localhost:3500';
  headers: Headers;
  options: RequestOptions;

    constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    }); // ... Set content type to JSON
    // this.headers.append('x-auth-token', localStorage.getItem('x-auth-token'));
    // this.headers.append('user-type', 'Admin');
    this.options = new RequestOptions({ headers: this.headers });
  }

    getOverSpeedAlert(): Observable<OverSpeedAlert[]> {

      // this.http.get(this.baseUrl + '/quotes', this.options ).subscribe(data => {
      //   console.log('data' + data);
      // });shifts/allShifts
      return this.http.get(this.baseUrl + '/overSpeedingAlert', this.options)
      .map(res => <OverSpeedAlert[]>res.json().object);

  }
}
