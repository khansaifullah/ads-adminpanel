import { Component, OnInit, ViewChild } from '@angular/core';
import { ShiftsService } from './shifts.service';
import { Driver } from '../Models/Driver';
import { Location } from '../Models/Location';
import { Stop } from '../Models/Stop';
import { Shift } from '../Models/Shift';
import {Popup} from 'ng2-opd-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shifts',
  templateUrl: './shifts.component.html',
  styleUrls: ['./shifts.component.scss'],
  providers: [ShiftsService]
})
export class ShiftsComponent implements OnInit {

  static shiftLocations: Stop[] = [];
  static shiftStartLoc: Number[]= [];
  static shiftEndLoc: Number[]= [];
  @ViewChild('editPopup') editPopup: Popup;
  @ViewChild('deletePopup') deletePopup: Popup;

  email: String;
  name: String;
  phone: String;

  shifts: Shift[] = [];
  shiftsLength: Number = 0;
  driverIdToEdit: String;
  shiftIdToDelete: string;
  tempUser: Driver;
  constructor(private shiftsService: ShiftsService, private popup: Popup, private router: Router) {

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
    this.shiftsService
    .getShifts()
    .subscribe(
    u => {
      this.shifts = u;
      console.log ('Shifts :' + u);
      this.shiftsLength = this.shifts.length;
      console.log ('this.shifts[0]._id : ' + this.shifts[0]._id);
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
  editShift() {

    // Update driver
    this.tempUser = new Driver();
    this.tempUser._id = this.driverIdToEdit;
    this.tempUser.name = this.name;
    this.tempUser.email = this.email;
    this.tempUser.phone = this.phone;
    console.log ('Edit driver : ' + this.driverIdToEdit );
    this.editPopup.hide();
    this.shiftsService.updateDriver(this.tempUser)
    .subscribe(
      u => {
        this.ngOnInit();
        console.log ('Update Driver API Status ' + u.status);
        this.tempUser = null;

        });
      this.driverIdToEdit = '';


  }


  confirmDelete(shift) {
    console.log('shift title To delete : ' + shift.title);
    console.log('shift Id To delete : ' + shift._id);
    this.shiftIdToDelete = shift._id;
     this.deletePopup.show(this.popup.options);
  }
  deleteShift() {

     this.deletePopup.hide();
    this.shiftsService
    .deleteShift(this.shiftIdToDelete)
    .subscribe(
    u => {
      this.ngOnInit();
      console.log (u.status);
      // this.tempCategory=null;

      });

  }
  addStop(shift) {
    console.log('Add Stop To shift Id : ' + shift._id);
    this.router.navigate(['/addLocation/' + shift._id]);

  }
  viewRoute(shift: Shift) {

    ShiftsComponent.shiftLocations = shift.listOfStops;
    ShiftsComponent.shiftStartLoc = shift.startLoc;
    ShiftsComponent.shiftEndLoc = shift.endLoc;
    this.router.navigate(['/route/' + shift._id]);

  }
}
