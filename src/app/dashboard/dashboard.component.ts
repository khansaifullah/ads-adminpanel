import { Login } from './../Models/Login';
import { OverSpeedAlert } from './../Models/OverSpeedAlert';
import { Shift } from './../Models/Shift';
import { Component, OnInit } from '@angular/core';
import { DashboardService} from './dashboard.service';
import { ShiftsService} from './../shifts/shifts.service';
import { LoginService} from './../login/login.service';
import {Headers, Response} from '@angular/http';

//
// import * as Chartist from 'chartist';
import * as Chart from 'chart.js';

// declare var $:any;
declare const google: any;
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService, ShiftsService, LoginService ]
})
export class DashboardComponent implements OnInit {

  runningBussesCount: any = 0;
  idleBussesCount: any= 0;
  overSpeedAlert: OverSpeedAlert[];
  overSpeedAlertLength: Number;
  shifts: Shift[] ;
  shiftsLength: Number;
  datasetarray: any[]= [];
  datasetObject: any;
  borderColorsAray: string[]= ['#3e95cd', '#8e5ea2', '#42f492', '#71f441', '#9d41f4', '#f47041'];
  tempBdColor: string;

  constructor(private dashboardService: DashboardService, private shiftsService: ShiftsService, private loginService: LoginService) { }

  ngOnInit() {

    this.shiftsService
    .getShifts()
    .subscribe(
    u => {
      this.shifts = u;
      console.log ('Shifts :' + u);
      this.shiftsLength = this.shifts.length;

      for (let i = 0; i < this.shiftsLength ; i++) {
        if (this.shifts[i]) {
          if (this.shifts[i].shiftStatus) {
            this.runningBussesCount = this.runningBussesCount + 1;
          }else {
            this.idleBussesCount = this.idleBussesCount + 1;
          }

        }
      }

      // this.categoryLoaded=true;
      }
  );


  // Setting Onesignal Id
  const oneSignalObject = {
    email: localStorage.getItem('adminEmail'),
    oneSignalId: localStorage.getItem('onesignalid')
    };

    this.loginService
    .setOneSignalId(oneSignalObject)
    .subscribe(
      (resOneSignal: Response) => {

    const payloadOneSignal = resOneSignal.json();
    console.log ('payloadOneSignal.status ' + payloadOneSignal.status);
    if (payloadOneSignal.status === 'success') {
    }
  });


  // Setting Overspeeding Alert Graph

    this.dashboardService
    .getOverSpeedAlert()
    .subscribe(
    u => {
      this.overSpeedAlert = u;
      console.log ('overSpeedAlert :' + u);
      this.overSpeedAlertLength = this.overSpeedAlert.length;
      // this.categoryLoaded=true;

      for (let o = 0; o < this.overSpeedAlertLength; o++) {

        if (o < this.borderColorsAray.length) {
          this.tempBdColor = this.borderColorsAray[o];
        }else {
          this.tempBdColor = this.borderColorsAray[(this.borderColorsAray.length) - 1];
        }
        this.datasetObject = {
          // data: [86, 114, 106, 106, 107, 111, 133, 221, 783, 2478],
          data: [ 0, this.overSpeedAlert[o].count],
          label: this.overSpeedAlert[o].drivername,
          // label: 'Driver 1',
          borderColor: this.tempBdColor,
          fill: false
        };
        this.datasetarray.push(this.datasetObject);
      }


  new Chart(document.getElementById("line-chart"), {
    type: 'line',
    data: {
      labels: ['',new Date().toDateString()],
      datasets:this.datasetarray
      // datasets:
      //  [{
      //     data: [86,114,106,106,107,111,133,221,783,2478],
      //     label: "Driver 1",
      //     borderColor: "#3e95cd",
      //     fill: false
      //   }, {
      //     data: [282,350,411,502,635,809,947,1402,3700,5267],
      //     label: "Driver 2",
      //     borderColor: "#8e5ea2",
      //     fill: false
      //   }
      // ]
    },
    options: {
      title: {
        display: false,
        text: 'App Users In differnt Regions Of World.'
      }
    }
  });
      }
  );

    let map;
    let marker;
    const ISB = {lat: 33.738045, lng: 73.084488};
    map = new google.maps.Map(document.getElementById('map'), {
      center: ISB,
      zoom: 15
  });

    // https://www.iconsdb.com/icons/preview/red/bus-xxl.png
    var markerIcon = {
      url: 'https://image.flaticon.com/icons/svg/0/622.svg',
      scaledSize: new google.maps.Size(80, 80),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(32, 65),
      labelOrigin: new google.maps.Point(40, 33)
    };
    marker = new google.maps.Marker({
      position: ISB,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: markerIcon,

    });


  //    var dataSales = {
  //   labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
  //   series: [
  //      [287, 385, 490, 562, 594, 626, 698, 895, 952],
  //     [67, 152, 193, 240, 387, 435, 535, 642, 744],
  //     [23, 113, 67, 108, 190, 239, 307, 410, 410]
  //   ]
  // };

  // var optionsSales = {
  //   low: 0,
  //   high: 1000,
  //   showArea: true,
  //   height: "245px",
  //   axisX: {
  //     showGrid: false,
  //   },
  //   lineSmooth: Chartist.Interpolation.simple({
  //     divisor: 3
  //   }),
  //   showLine: true,
  //   showPoint: false,
  // };

  // var responsiveSales: any[] = [
  //   ['screen and (max-width: 640px)', {
  //     axisX: {
  //       labelInterpolationFnc: function (value) {
  //         return value[0];
  //       }
  //     }
  //   }]
  // ];

  // new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


  // var data = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  //   series: [
  //     [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
  //     [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
  //   ]
  // };

  // var options = {
  //     seriesBarDistance: 10,
  //     axisX: {
  //         showGrid: false
  //     },
  //     height: "245px"
  // };

  // var responsiveOptions: any[] = [
  //   ['screen and (max-width: 640px)', {
  //     seriesBarDistance: 5,
  //     axisX: {
  //       labelInterpolationFnc: function (value) {
  //         return value[0];
  //       }
  //     }
  //   }]
  // ];

  // new Chartist.Line('#chartActivity', data, options, responsiveOptions);

  // var dataPreferences = {
  //     series: [
  //         [25, 30, 20, 25]
  //     ]
  // };

  // var optionsPreferences = {
  //     donut: true,
  //     donutWidth: 40,
  //     startAngle: 0,
  //     total: 100,
  //     showLabel: false,
  //     axisX: {
  //         showGrid: false
  //     }
  // };

  // new Chartist.Pie('#chartPreferences', dataPreferences, optionsPreferences);

  // new Chartist.Pie('#chartPreferences', {
  //   labels: ['62%','32%','6%'],
  //   series: [62, 32, 6]
  // });


  }

}
