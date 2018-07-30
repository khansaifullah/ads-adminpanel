import { Component, OnInit } from '@angular/core';
 import { DriverService } from './driver.service';
import { Driver } from '../Models/Driver';
import { Router } from '@angular/router';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss'],
  providers: [DriverService]
})
export class DriverComponent implements OnInit {


  email: string;
  _id: string;
  password: string;
  user_type: string;
  name: string;
  phone: string;
  driver: Driver;

  constructor(private driverService: DriverService, private router: Router) { }

  ngOnInit() {
  }

  saveDriver() {

    if ( this.email === undefined || this.password === undefined || this.name === undefined || this.phone === undefined
    || this.email === '' || this.password === '' || this.name === '' || this.phone === '' ) {
      alert('Please Provide Complete Driver Details');
    }else {
      if (this.password.length <= 5) {
        alert('Password Should be greater than 5 characters ');
      }else {
        this.driver = new Driver();
        this.driver.name = this.name;
        this.driver.email = this.email;
        this.driver.password = this.password;
        this.driver.phone = this.phone;
        this.driver.user_type = 'driver';
        this.driverService.addDriver(this.driver).subscribe(
         u => {
           this.ngOnInit();
           console.log (u.status);
           this.router.navigate(['/drivers']);
           this.driver = null;
        },
        (err) =>  {window.confirm('Some Issue Occurred while Adding Driver !'); }
      );
          // u => {
          //  this.ngOnInit();
          //  console.log (u.status);
          //  this.router.navigate(['/drivers']);
          //  this.driver = null;
          // });
          this.name = '';
          this.email = '';
          this.password = '';
      }

    }
  }

}
