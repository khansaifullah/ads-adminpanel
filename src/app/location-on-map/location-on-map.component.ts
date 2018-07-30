import { Shift } from './../Models/Shift';
import { AdminStop } from './../Models/AdminStop';
import { Component, OnInit,ViewChild } from '@angular/core';
import { DriversService } from '../drivers/drivers.service';
import { LocationOnMapService } from './location-on-map.service';

import { Driver } from '../Models/Driver';
import { Location } from '../Models/Location';
import {ActivatedRoute, Router} from '@angular/router';
import {Popup} from 'ng2-opd-popup';

declare const google: any;


@Component({
  selector: 'app-location-on-map',
  templateUrl: './location-on-map.component.html',
  styleUrls: ['./location-on-map.component.scss'],
  providers: [DriversService, LocationOnMapService]
})
export class LocationOnMapComponent implements OnInit {

  @ViewChild('confirmStartLocMarkerPopup') confirmStartLocMarkerPopup: Popup;
  // drivers: Driver[] = [];
  // driversLength: Number = 0;
   shiftId: string ;
   locTitle: string ;
   locId: string ;
   locLat: Number;
   locLong: Number;
   locationObj: Location;
   adminStop: AdminStop;
  constructor(private driversService: DriversService, private route: ActivatedRoute,
    private locationOnMapService: LocationOnMapService, private popup: Popup, private router: Router ) {

    this.route.params.subscribe( params => {
      this.shiftId = params['shiftId'];
      console.log('Params shiftId: ' + this.shiftId);

    } );
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
    let map;
    // let marker;
    const ISB = {lat: 33.738045, lng: 73.084488};
    map = new google.maps.Map(document.getElementById('map'), {
      center: ISB,
      zoom: 11
  });

  google.maps.event.addListener(map, 'click', (event) => {
    console.log('Map startLocMap Cliked , Lat Longs : ' + event.latLng.lat() + 'longitude: ' + event.latLng.lng() );
    this.locLat = event.latLng.lat();
    this.locLong = event.latLng.lng();
    this.confirmStartLocMarkerPopup.show(this.popup.options);
  });
}

confirmStartLoc() {

  this.locationObj = new Location();
    this.locationObj.title = this.locTitle;
    this.locationObj.loc = [];
    this.locationObj.loc[0] = this.locLat;
    this.locationObj.loc[1] = this.locLong;


    this.locationOnMapService.addLocation(this.locationObj).subscribe(
      u => {
        const payload = u.json();
       console.log ('payload.status ' + payload.status);
       if (payload.status === 'success') {
           console.log('Object Id : ' + payload.object._id);
           this.locId = payload.object._id;

           this.adminStop = new AdminStop();
           this.adminStop._shiftId = this.shiftId;
           this.adminStop._stopId = this.locId;
           this.locationOnMapService.addStop(this.adminStop).subscribe(
            s => {
              const stopsPayload = s.json();
              console.log ('stopsPayload.status ' + stopsPayload.status);
              // this.ngOnInit();
              console.log ('s.status: ' + s.status);
              this.confirmStartLocMarkerPopup.hide();
              if (stopsPayload.status === 'success') {
                window.confirm('Stop Successfully Added !');
               }else {
                window.confirm('Some Issue Occurred while Adding Stop !');
               }

              this.router.navigate(['/shifts']);
              this.adminStop = null;

          });

       }else {
        window.confirm('Some Issue Occurred while Adding Stop !');
        this.router.navigate(['/shifts']);
       }

       this.locationObj = null;
      });
      this.locTitle = '';
      this.locLong = null;
      this.locLat = null;

}
}
