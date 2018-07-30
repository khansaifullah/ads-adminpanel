import { Component, OnInit, ViewChild } from '@angular/core';
import { RidersService } from './riders.service';
import { Driver } from '../Models/Driver';
import { Rider } from '../Models/Rider';
import {Popup} from 'ng2-opd-popup';

@Component({
  selector: 'app-riders',
  templateUrl: './riders.component.html',
  styleUrls: ['./riders.component.scss'],
  providers: [RidersService]
})
export class RidersComponent implements OnInit {


  @ViewChild('editPopup') editPopup: Popup;
  @ViewChild('deletePopup') deletePopup: Popup;

  // quoteText: string;
  // author: string;

  email: String;
  name: String;
  phone: String;

  users: Rider[] = [];
  usersLength: Number = 0;
  driverIdToEdit: String;
  driverIdToDelete: String;
  tempUser: Driver;
  panicFlag: Boolean;
  constructor(private ridersService: RidersService, private popup: Popup) {

    this.popup.options = {
      header: 'Confirmation',
      color: '#232f3e', // red, blue....
      widthProsentage: 40, // The with of the popou measured by browser width
      // animationDuration: 1, // in seconds, 0 = no animation
      showButtons: true, // You can hide this in case you want to use custom buttons
      confirmBtnContent: 'OK', // The text on your confirm button
      cancleBtnContent: 'CANCEL', // the text on your cancel button
      confirmBtnClass: 'btn btn-bold', // your class for styling the confirm button
      cancleBtnClass: 'btn btn-bold', // you class for styling the cancel button
      // animation: 'bounceIn' // 'fadeInLeft', 'fadeInRight', 'fadeInUp', 'bounceIn','bounceInDown'
  };
  }

  ngOnInit() {
    this.ridersService
    .getDrivers()
    .subscribe(
    u => {
      this.users = u;
      console.log ('users :' + u);
      this.usersLength = this.users.length;
      // this.categoryLoaded=true;
      }
  );
  }

  confirmEdit(driver: Driver) {

     console.log('driver: ' + driver.name);
     this.name = driver.name;
     this.email = driver.email;
     this.phone = driver.phone;
     this.driverIdToEdit = driver._id;
     this.editPopup.show(this.popup.options);
  }
  editDriver() {

    // Update driver
    this.tempUser = new Driver();
    this.tempUser._id = this.driverIdToEdit;
    this.tempUser.name = this.name;
    this.tempUser.email = this.email;
    this.tempUser.phone = this.phone;
    console.log ('Edit driver : ' + this.driverIdToEdit );
    this.editPopup.hide();
    this.ridersService.updateDriver(this.tempUser)
    .subscribe(
      u => {
        this.ngOnInit();
        console.log ('Update Driver API Status ' + u.status);
        this.tempUser = null;

        });
      this.driverIdToEdit = '';


  }


  confirmDelete(driver: Driver) {
    console.log('driver Id To delete : ' + driver._id);
    this.driverIdToDelete = driver._id;
     this.deletePopup.show(this.popup.options);
  }
  deleteDriver() {

    //  console.log ('Delete driver Called with Title : ' + this.driverIdToDelete);
     this.deletePopup.hide();
    this.ridersService
    .deleteDriver(this.driverIdToDelete)
    .subscribe(
    u => {
      this.ngOnInit();
      console.log (u.status);
      // this.tempCategory=null;

      });

  }
}
