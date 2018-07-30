import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { RestApiService } from '../rest-api.service';
import {LoginService} from './login.service';
import { Login } from '../Models/Login';
import {Headers, Response} from '@angular/http';
import { SessionUpdateService } from './session.update.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService, SessionUpdateService]
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  loginObj: Login;

  btnDisabled = false;

  constructor(
    private router: Router,
    private rest: RestApiService,
    private data: DataService,
    private loginService: LoginService,
    private sessionUpdateService: SessionUpdateService
  ) {

    if (this.token) {
      router.navigate(['/dashboard']);
    }
   }

  ngOnInit() { }
  get token() {
    return localStorage.getItem('x-auth-token');
  }
  validate() {
    if (this.email) {
      if (this.password) {
        return true;
      } else {
        this.data.error('Password is not entered');
      }
    } else {
      this.data.error('Email is not entered.');
    }
  }

  async login() {
    this.btnDisabled = true;
    try {
      if (this.validate()) {

            this.loginObj = {
            email: this.email,
            password: this.password
            };

            this.loginService
                .login(this.loginObj)
                .subscribe(
              (res: Response) => {
                let headers = new Headers();
                headers = res.headers;
                const payload = res.json();
                console.log ('payload.status ' + payload.status);
                if (payload.status === 'success') {
                  console.log ('Token in Header ' + headers.get('x-auth-token'));
                 if (headers.get('x-auth-token')) {
                  this.sessionUpdateService.updateAppTocken(headers.get('x-auth-token'));
                  this.router.navigate(['/dashboard']);
                  localStorage.setItem('adminEmail', this.email);
                 }else {
                  console.log('Failure');
                  this.data.error('Unable To Login, Please Enter Correct Credentials.');
                 }

                //   this.showlogInForm=false;
                //   /this.isLoggedIn=true;
                //   this.router.navigateByUrl('/home');
                //   this.sessionService.isLoggedIn();
                } else {
                  console.log('Failure');
                  this.data.error('Unable To Login, Please Enter Correct Credentials.');
                  // this.router.navigate(['/']);
                  // this.showlogInForm=true;
                  // this.isLoggedIn=false;
                }
              });
      }
    } catch (error) {
      this.data.error(error['message']);
    }
    this.btnDisabled = false;
  }
}
