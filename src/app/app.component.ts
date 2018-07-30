import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';




declare var $: any;
// Component App
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent implements OnInit {
  searchTerm = '';
  isCollapsed = true;

  constructor(private router: Router, private data: DataService) {
    this.data.getProfile();
  }


  ngOnInit() {
    const oneSignal = window['OneSignal'] || [];
    console.log('Init OneSignal');
    oneSignal.push(['init', {
      appId: '64034311-fb3a-4582-8877-b3854a0aed5d',
      autoRegister: false,
      allowLocalhostAsSecureOrigin: true,
      notifyButton: {
        enable: false
      }
    }]);
    console.log('OneSignal Initialized');
    oneSignal.push(function () {
      console.log('Register For Push');
      oneSignal.push(['registerForPushNotifications']);
      console.log('After Calling');
    });
    oneSignal.push(function () {
      console.log('inside OneSignal.push function ()');
      // Occurs when the user's subscription changes to a new value.
      oneSignal.on('subscriptionChange', function (isSubscribed) {
        if (isSubscribed) {
          console.log("The user's subscription state is now:", isSubscribed);
          oneSignal.getUserId().then(function (userId) {
            console.log('User ID is', userId);
            localStorage.setItem('onesignalid', userId);
          });
        }else {
          console.log('Is Not Subscribed');
        }
      });
    });
    }
  get token() {
    return localStorage.getItem('x-auth-token');
  }

  collapse() {
    this.isCollapsed = true;
  }

  closeDropdown(dropdown) {
    dropdown.close();
  }


  logout() {
    console.log('logOut');
    this.data.user = {};
    localStorage.clear();
    this.router.navigate(['/']);
  }

  search() { }
}
