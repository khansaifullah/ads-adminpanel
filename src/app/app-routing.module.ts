import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { UserslistComponent } from './userslist/userslist.component';
import { AuthGuardService } from './auth-guard.service';
import { BussesLocComponent } from './busses-loc/busses-loc.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverComponent } from './driver/driver.component';
import { RidersComponent } from './riders/riders.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftComponent } from './shift/shift.component';
import { SmsComponent } from './sms/sms.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LocationOnMapComponent } from './location-on-map/location-on-map.component';
import { RouteComponent } from './route/route.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'drivers',
    component: DriversComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'driver',
    component: DriverComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'riders',
    component: RidersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'shifts',
    component: ShiftsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'shift',
    component: ShiftComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'busses',
    component: BussesLocComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'sms',
    component: SmsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'addLocation/:shiftId',
    component: LocationOnMapComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'route/:shiftId',
    component: RouteComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'register',
    component: RegistrationComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: 'admin/login',
    component: LoginComponent,
    // canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
