import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions, URLSearchParams , Response } from '@angular/http';

@Injectable()
export class SessionUpdateService {
    setSessionUser(data) {
        localStorage.setItem('user', data.user);
    }
    // updateAppTocken(header:Headers) {
        updateAppTocken(awtToken: string) {
        localStorage.setItem('x-auth-token', awtToken);
        console.log ('x-auth after login :' + localStorage.getItem('x-auth-token') );
    }
}
