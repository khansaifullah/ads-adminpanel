import { Component, OnInit, ViewChild } from '@angular/core';
import { ShiftService } from './shift.service';
import { DriversService } from '../drivers/drivers.service';
import { Driver } from '../Models/Driver';
import { AdminShift } from '../Models/AdminShift';
import { Location } from '../Models/Location';
import { Router } from '@angular/router';
import {Popup} from 'ng2-opd-popup';

declare const google: any;
@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.scss'],
  providers: [ShiftService, DriversService]
})
export class ShiftComponent implements OnInit {

  @ViewChild('confirmStartLocMarkerPopup') confirmStartLocMarkerPopup: Popup;
  @ViewChild('confirmEndLocMarkerPopup') confirmEndLocMarkerPopup: Popup;

  title: string;
  _id: string;

  name: string;
  phone: string;
  driver: Driver;
  drivers: Driver[] = [];
  driversLength: Number = 0;
  selectedDriver: string;
  vehicle: string;
  startTime: string= '08:00';
  endTime: string = '08:00';
  startLocationObj: Location;
  startLocTitle: string;
  startLocId: string;
  startLocLat: Number;
  startLocLong: Number;
  endLocationObj: Location;
  endLocTitle: string;
  endLocId: string;
  endLocLat: Number;
  endLocLong: Number;
  adminShift: AdminShift;

  openStartLocMap : boolean=false;
  openEndLocMap : boolean=false;
  constructor(private shiftService: ShiftService,private driversService: DriversService, private router: Router,
   private popup: Popup) {
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

  // google.maps.event.addListener(marker, 'click',

  ngOnInit() {

    let startLocMap;
    let endLocMap;
    let marker;
    const ISB = {lat: 33.738045, lng: 73.084488};
    var latlng = new google.maps.LatLng(33.738045, 73.084488);

    startLocMap = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 11
  });
  endLocMap = new google.maps.Map(document.getElementById('map2'), {
    center: latlng,
    zoom: 11
});
    this.driversService
    .getDrivers()
    .subscribe(
    u => {
      this.drivers = u;
      console.log ('drivers :' + u);
      this.driversLength = this.drivers.length;
      // this.categoryLoaded=true;
      }
  );


  google.maps.event.addListener(startLocMap, 'click', (event) => {
    console.log('Map startLocMap Cliked , Lat Longs : ' + event.latLng.lat() + 'longitude: ' + event.latLng.lng() );
    this.startLocLat = event.latLng.lat();
    this.startLocLong = event.latLng.lng();
    this.confirmStartLocMarkerPopup.show(this.popup.options);
  });

  google.maps.event.addListener(endLocMap, 'click', (event) => {
    console.log('Map endLocMap Cliked , Lat Longs : ' + event.latLng.lat() + 'longitude: ' + event.latLng.lng() );
    this.endLocLat = event.latLng.lat();
    this.endLocLong = event.latLng.lng();
    this.confirmEndLocMarkerPopup.show(this.popup.options);
  });

  }
  setLoc(loc){
    console.log('Set Loc Called');
  }
  chkDriverName(){
    console.log('Selected Driver: ' + this.selectedDriver);
  }

  showStartLocMap(event){

    if (this.openStartLocMap === true) {
      this.openStartLocMap = false;
    }else{
      this.openStartLocMap = true;
      // close other Map
      this.openEndLocMap =false;
    }

    console.log('openStartLocMap: ' + this.openStartLocMap);
  }
  showEndLocMap(event){

    if (this.openEndLocMap===true){
      this.openEndLocMap =false;
    }else{
      this.openEndLocMap =true;
      //close other Map
      this.openStartLocMap =false;
    }
    console.log('openEndLocMap: '+this.openEndLocMap);
  }

  confirmStartLoc(){

    this.startLocationObj = new Location();
      this.startLocationObj.title = this.startLocTitle;
      this.startLocationObj.loc=[];
      this.startLocationObj.loc[0] = this.startLocLat;
      this.startLocationObj.loc[1] = this.startLocLong;


      this.shiftService.addLocation(this.startLocationObj).subscribe(
        u => {
          const payload = u.json();
         console.log ('payload.status ' + payload.status);
         if (payload.status === 'success') {
             console.log('Object Id : '+ payload.object._id);
             this.startLocId=payload.object._id;
             this.confirmStartLocMarkerPopup.hide();
             this.openStartLocMap =false;
         }

         this.startLocationObj = null;
        });
        this.startLocTitle = '';
        this.startLocLong=null;
        this.startLocLat=null;

  }
  confirmEndLoc(){
    this.endLocationObj = new Location();
    this.endLocationObj.title = this.endLocTitle;
    this.endLocationObj.loc=[];
    this.endLocationObj.loc[0] = this.endLocLat;
    this.endLocationObj.loc[1] = this.endLocLong;


    this.shiftService.addLocation(this.endLocationObj).subscribe(
      u => {

       const payload = u.json();
       console.log ('payload.status ' + payload.status);
       if (payload.status === 'success') {
           console.log('Object Id : '+ payload.object._id);
           this.endLocId=payload.object._id;
           this.confirmEndLocMarkerPopup.hide();
           this.openEndLocMap =false;
       }

       this.endLocationObj = null;
      });
      this.endLocTitle = '';
      this.endLocLong=null;
      this.endLocLat=null;


  }
  saveShift() {

    // let tempTime;
    // tempTime= new Date();
    // console.log('tempTime: '+tempTime);
    // this.startTime;
    let startTempTime = '2018-10-15T' + this.startTime + ':00Z';
    let endTempTime = '2018-10-15T' + this.endTime + ':00Z';
    if ( this.selectedDriver === undefined || this.title === undefined || this.vehicle === undefined ||
      this.selectedDriver === '' || this.title === '' || this.vehicle === '' ) {
      alert('Please Provide Complete Shift Details');
    }else {
      this.adminShift = new AdminShift();
      this.adminShift.title = this.title;
      this.adminShift._driverId = this.selectedDriver;
      this.adminShift._startLocId = this.startLocId;
      this.adminShift._endLocID = this.endLocId;
      this.adminShift.vehicle = this.vehicle;
      this.adminShift.shiftStartTime = startTempTime;
      this.adminShift.shiftEndTime = endTempTime;
      this.adminShift.shiftStatus = false;

      this.shiftService.addShift(this.adminShift).subscribe(
        u => {
         this.ngOnInit();
         console.log (u.status);
         this.router.navigate(['/shifts']);
         this.adminShift = null;
        });
    }
  }



}
