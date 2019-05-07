// import { provide } from '@angular/core';

import { BrowserXhr } from '@angular/http';




import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { RideHistoryComponent } from './components/ride-history/ride-history.component';
import { DataService } from './service/dataservice.service';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { VarService } from './service/var.service';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { OrderModule } from 'ngx-order-pipe';
import { NgxPasswordToggleModule } from 'ngx-password-toggle';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';

 
import { SidebarModule } from 'ng-sidebar';
import { AddDriverComponent } from './components/user-management/driver_module/add_driver/add-driver/add-driver.component';
import { SchoolCreateComponent } from './components/user-management/school_module/school-create/school-create.component';
import { UserCreateComponent } from './components/user-management/user_module/user-create/user-create.component';
import { BookingHistoryComponent } from './components/booking-history/booking-history.component';
import { UpdateBookingRideComponent } from './components/update-booking-ride/update-booking-ride.component';
import { BookingRideComponent } from './components/booking-ride/booking-ride.component';
import { AddTestCenterComponent } from './components/test-center-module/add-test-center/add-test-center.component';
import { TestCenterManagementComponent } from './components/test-center-module/test-center-management/test-center-management.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { BadConnectionComponent } from './components/bad-connection/bad-connection.component';
import { MasterManagementComponent } from './components/master-module/master-management/master-management.component';
import { NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { SchoolDriverManagementComponent } from './components/user-management/school_module/school-driver-management/school-driver-management.component';
import { DatePipe, LocationStrategy, HashLocationStrategy } from '@angular/common';


import { AttributeComponent } from './components/master-data/attribute/attribute/attribute.component';
import { MasterManagerComponent } from './components/master-data/master-manager/master-manager.component';
import { DocumentComponent } from './components/master-data/document/document/document.component';
import { SlotComponent } from './components/master-data/slot/slot/slot.component';
import { VehicleComponent } from './components/master-data/vehicletype/vehicle/vehicle.component';
import { CountryComponent } from './components/master-data/country/country/country.component';
import { StateComponent } from './components/master-data/state/state/state.component';
import { CityComponent } from './components/master-data/city/city/city.component';
import { CurriculamComponent } from './components/master-data/curriculam/curriculam/curriculam.component';
import { PackageComponent } from './components/master-data/package/package/package.component';
import { TaxComponent } from './components/master-data/tax/tax/tax.component';
import { GeartypeComponent } from './components/master-data/geartype/geartype/geartype.component';
import { RideRatingComponent } from './components/master-data/riderating/ride-rating/ride-rating.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ResolverService } from './service/resolver.service';
import { AmazingTimePickerModule } from 'amazing-time-picker'; 
import { CreateSubadminComponent } from './components/user-management/subAdmin_module/create-subadmin/create-subadmin.component';
import { LoaderComponent } from './components/loader/loader.component';
import { ConfirmEqualValidatorDirective } from './components/confirm-equal-validator';
import { LottieAnimationViewModule } from 'ng-lottie';
import { CustExtBrowserXhr } from 'src/cust-ext-browser-xhr';
// import { StripPaymentComponent } from './components/stripe-payment/strip-payment/strip-payment.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


// final prod server
// const baseURL ='https://lurnr-api1.trignodev.net/api/v1/'
// const picUrl ='https://lurnr-api1.trignodev.net/public/' 


// production url
// const baseURL = 'https://api.lurnr.co/api/v1/'
// const picUrl = 'https://api.lurnr.co/public/' 



// new production
// const baseURL ='https://builds.trignodev.net:9010/api/v1/'
// const picUrl ='https://builds.trignodev.net:9010/public/' 
// https://builds.trignodev.net:9011/   //ws

// const picUrl = 'http://122.160.147.18:9001/public/';
// const baseURL = 'http://122.160.147.18:9001/api/v1/';

 

// som ip
const picUrl = 'http://192.168.16.9:3000/public/' 
const baseURL = 'http://192.168.16.9:3000/api/v1/'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    DashboardComponent,
    UserManagementComponent,
    PaymentHistoryComponent,
    RideHistoryComponent,
    AddDriverComponent,
    SchoolCreateComponent,
    UserCreateComponent,
    BookingHistoryComponent,
    UpdateBookingRideComponent,
    BookingRideComponent,
    OrderHistoryComponent,
    AddTestCenterComponent,
    TestCenterManagementComponent,
    BadConnectionComponent,
    MasterManagementComponent,
    CreateInvoiceComponent,
    InvoiceDetailComponent,
    SchoolDriverManagementComponent,

    AttributeComponent,

    MasterManagerComponent,

    DocumentComponent,

    SlotComponent,

    VehicleComponent,

    CountryComponent,

    StateComponent,

    CityComponent,

    CurriculamComponent,

    PackageComponent,

    TaxComponent,

    GeartypeComponent,


    RideRatingComponent,
    CreateSubadminComponent,
    LoaderComponent,
    ConfirmEqualValidatorDirective,
    
    // StripPaymentComponent,

    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    SidebarModule,
    OrderModule,
    AmazingTimePickerModule ,

    NgxPaginationModule,
    LottieAnimationViewModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    NgxPasswordToggleModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    Ng2SearchPipeModule,
    OwlDateTimeModule, 
    OwlNativeDateTimeModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey:"AIzaSyC7c71fViNSKkLI2YOj0k8oxZEDvUYbzOY" ,
      libraries: ["places"]
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })

  ],
  providers: [DataService,VarService, DatePipe, ResolverService,
    { provide: 'picUrl', useValue: picUrl },
    { provide: 'baseURL', useValue: baseURL },
  {  provide: "Window", useValue: window },

  {provide: BrowserXhr, useClass:CustExtBrowserXhr},
  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
