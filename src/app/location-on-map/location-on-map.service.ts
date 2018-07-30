import { AdminStop } from './../Models/AdminStop';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class LocationOnMapService {
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


  // Add new Stop
  addStop(stop): Observable<Response> {
    const body = JSON.stringify(stop);
    console.log ('in service Add stop : ' + stop._stopId);
    return this.http
    .post(this.baseUrl + '/riders' ,  body ,  this.options)
    // .map(this.extractData);

    }


  // Add new Location
  addLocation(location): Observable<Response> {
    const body = JSON.stringify(location);
    console.log ('in service Add location : ' + location);
    return this.http
    .post(this.baseUrl + '/location' ,  body ,  this.options);
    // .map(this.extractData);

    }

    private extractData(res: Response) {
      const data = res.json();
      return data || {};
  }


}
