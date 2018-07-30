import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
// import { AgmCoreModule } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';

import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './auth-guard.service';

import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserslistComponent } from './userslist/userslist.component';
import {PopupModule} from 'ng2-opd-popup';
import { BussesLocComponent } from './busses-loc/busses-loc.component';
import { DriversComponent } from './drivers/drivers.component';
import { DriverComponent } from './driver/driver.component';
import { ShiftsComponent } from './shifts/shifts.component';
import { ShiftComponent } from './shift/shift.component';
import { SmsComponent } from './sms/sms.component';
import { LocationOnMapComponent } from './location-on-map/location-on-map.component';
import { AmazingTimePickerModule } from 'amazing-time-picker';

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { RouteComponent } from './route/route.component';
import { RidersComponent } from './riders/riders.component';
import { RiderComponent } from './rider/rider.component';

import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FilterPipe} from './busses-loc/filter.pipe';
@NgModule({
  declarations: [AppComponent, HomeComponent, MessageComponent, RegistrationComponent, LoginComponent,
    SettingsComponent, AddressComponent, DashboardComponent,
     UserslistComponent,
     BussesLocComponent,
     DriversComponent,
     DriverComponent,
     ShiftsComponent,
     ShiftComponent,
     SmsComponent,
     LocationOnMapComponent,
     RouteComponent,
     RidersComponent,
     RiderComponent,
     FilterPipe
    ],
  imports: [
    PopupModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    HttpModule,
    AmazingTimePickerModule,

    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    Ng2SearchPipeModule
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyA-QoUrBCw1eZxMWkCRbmwDQs9K2Tk0vto'
    // }),

  ],
  providers: [RestApiService, DataService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
