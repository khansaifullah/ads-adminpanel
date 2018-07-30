import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../Models/User';

@Injectable()
export class UserslistService {

  // baseUrl: String= 'https://qau-smart-ride.herokuapp.com/api';
  baseUrl: String= 'https://wtcapplications.herokuapp.com';
  // baseUrl: String= 'http://localhost:3500';
  headers: Headers;
  options: RequestOptions;

    constructor(private http: Http) {
      this.headers = new Headers({ 'Content-Type': 'application/json',
      'Accept': 'q=0.8;application/json;q=0.9',
    }); // ... Set content type to JSON
    this.headers.append('x-auth',
    localStorage.getItem('x-auth'));
    this.headers.append('user-type', 'Admin');
    this.options = new RequestOptions({ headers: this.headers });
  }

    getUsers(): Observable<User[]> {

      // this.http.get(this.baseUrl + '/topStory', this.options ).subscribe(data => {
      //   console.log('data' + data);
      // });
      return this.http.get(this.baseUrl + '/users', this.options)
      .map(res => <User[]>res.json().object);

  }


}
