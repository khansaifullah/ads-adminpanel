import { ShiftsComponent } from './../shifts/shifts.component';

import { Shift } from './../Models/Shift';
import { AdminStop } from './../Models/AdminStop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DriversService } from '../drivers/drivers.service';
import { RouteService } from './route.service';

import { Stop } from '../Models/Stop';
import { Driver } from '../Models/Driver';
import { Location } from '../Models/Location';
import {ActivatedRoute, Router} from '@angular/router';
import {Popup} from 'ng2-opd-popup';
declare const google: any;

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss'],
  providers: [DriversService, RouteService]
})
export class RouteComponent implements OnInit {


   flightPlanCoordinates = [];
   shiftId: string ;
   shiftLocations: Stop[] = [];
  constructor(private driversService: DriversService, private route: ActivatedRoute,
    private routeService: RouteService, private router: Router ) {
    this.route.params.subscribe( params => {
      this.shiftId = params['shiftId'];
      console.log('Params shiftId: ' + this.shiftId);

    } );

    // Populating list of Location From ShiftsComponent
    this.shiftLocations = ShiftsComponent.shiftLocations;
        if ( this.shiftLocations) {
      for (let i = 0; i <  this.shiftLocations.length; i++) {
        console.log('Loc :' + i);
        if ( this.shiftLocations[i].pickUploc) {

          // this.flightPlanCoordinates.push ();
          console.log('Long :' +  this.shiftLocations[i].pickUploc[0]);
          console.log('Lat :' +  this.shiftLocations[i].pickUploc[1]);
        }

      }
    }else {
      window.confirm('No Locations Found');
      console.log('No Locations Found');
    }

  }
  ngOnInit() {
    let map;
    let marker;
    const ISB = {lat: 33.738045, lng: 73.084488};
    const bounds = new google.maps.LatLngBounds();
    map = new google.maps.Map(document.getElementById('map'), {
      center: ISB,
      zoom: 11
  });

  if (ShiftsComponent.shiftStartLoc) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(ShiftsComponent.shiftStartLoc[0], ShiftsComponent.shiftStartLoc[1]),
      map: map
    });
    this.flightPlanCoordinates.push(marker.getPosition());
    bounds.extend(marker.position);

  }
  if (ShiftsComponent.shiftEndLoc) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(ShiftsComponent.shiftEndLoc[0], ShiftsComponent.shiftEndLoc[1]),
      map: map
    });
    this.flightPlanCoordinates.push(marker.getPosition());
    bounds.extend(marker.position);

  }


  if ( this.shiftLocations) {
    for (let i = 0; i <  this.shiftLocations.length; i++) {
      if ( this.shiftLocations[i].pickUploc) {
        console.log('*Lat : ' + this.shiftLocations[i].pickUploc[1]);
        console.log('*Long : ' + this.shiftLocations[i].pickUploc[0]);
        marker = new google.maps.Marker({
          position: new google.maps.LatLng(this.shiftLocations[i].pickUploc[0], this.shiftLocations[i].pickUploc[1]),
          map: map
        });
        this.flightPlanCoordinates.push(marker.getPosition());
        bounds.extend(marker.position);
      }
    }
  }
  map.fitBounds(bounds);

  const flightPath = new google.maps.Polyline({
    map: map,
    path: this.flightPlanCoordinates,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
});

}

}
