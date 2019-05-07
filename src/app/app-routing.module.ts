import { InvoiceDetailComponent } from './components/invoice-detail/invoice-detail.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { PaymentHistoryComponent } from './components/payment-history/payment-history.component';
import { RideHistoryComponent } from './components/ride-history/ride-history.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';


import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';

import {BookingHistoryComponent} from './components/booking-history/booking-history.component';
 import {UpdateBookingRideComponent} from './components/update-booking-ride/update-booking-ride.component';
import { SchoolCreateComponent } from './components/user-management/school_module/school-create/school-create.component';
import { AddDriverComponent } from './components/user-management/driver_module/add_driver/add-driver/add-driver.component';
import { UserCreateComponent } from './components/user-management/user_module/user-create/user-create.component';
import {BookingRideComponent} from './components/booking-ride/booking-ride.component';
import { AddTestCenterComponent } from './components/test-center-module/add-test-center/add-test-center.component';
import { TestCenterManagementComponent } from './components/test-center-module/test-center-management/test-center-management.component';
import { BadConnectionComponent } from './components/bad-connection/bad-connection.component';

import {OrderHistoryComponent} from './components/order-history/order-history.component';
import { MasterManagementComponent } from './components/master-module/master-management/master-management.component';
import { SchoolDriverManagementComponent } from './components/user-management/school_module/school-driver-management/school-driver-management.component';
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
import { AuthGaurdService } from './service/auth-gaurd.service';
import { ResolverService } from './service/resolver.service';
import { CreateSubadminComponent } from './components/user-management/subAdmin_module/create-subadmin/create-subadmin.component';
// import { StripPaymentComponent } from './components/stripe-payment/strip-payment/strip-payment.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate : [AuthGaurdService]  },
  { path: 'user-management', component: UserManagementComponent ,canActivate : [AuthGaurdService] },
  { path: 'ride-history', component: RideHistoryComponent,canActivate : [AuthGaurdService] ,resolve : {usermanager : ResolverService} },
  { path: 'payment-history', component: PaymentHistoryComponent ,canActivate : [AuthGaurdService]  },
  { path: 'header', component: HeaderComponent ,canActivate : [AuthGaurdService] },
  { path: 'driver-create', component: AddDriverComponent ,canActivate : [AuthGaurdService] },
 
  // { path: 'driver-create/:type/:id', component: AddDriverComponent ,canActivate : [AuthGaurdService] },
  { path: 'subadmin-create', component: CreateSubadminComponent,canActivate : [AuthGaurdService] },
  { path: 'subadmin-create/:type/:id', component: CreateSubadminComponent ,canActivate : [AuthGaurdService]},
  { path: 'driver-create/:type/:id', component: AddDriverComponent,canActivate : [AuthGaurdService] },
  { path: 'school-create', component: SchoolCreateComponent ,canActivate : [AuthGaurdService]  },
  { path: 'school-create/:type/:id/:schoolId', component: SchoolCreateComponent ,canActivate : [AuthGaurdService] },
  { path: 'user-create', component: UserCreateComponent ,canActivate : [AuthGaurdService]  },
  { path: 'user-create/:type/:id', component: UserCreateComponent ,canActivate : [AuthGaurdService]  },
  { path: 'booking-history', component: BookingHistoryComponent ,canActivate : [AuthGaurdService] },
  { path: 'invoice-detail/:id', component: InvoiceDetailComponent ,canActivate : [AuthGaurdService] },
  { path:'update-booking-ride',component:UpdateBookingRideComponent,canActivate : [AuthGaurdService] },
  { path:'booking-ride',component:BookingRideComponent ,canActivate : [AuthGaurdService] },
  { path:'add-test-center',component:AddTestCenterComponent ,canActivate : [AuthGaurdService] },
  { path:'add-test-center/:id',component:AddTestCenterComponent ,canActivate : [AuthGaurdService] },
  { path:'test-center-management',component:TestCenterManagementComponent , canActivate : [AuthGaurdService] },
  { path:'master-management',component:MasterManagementComponent , canActivate : [AuthGaurdService] },
  { path:'bad-connection/:id',component:BadConnectionComponent ,canActivate : [AuthGaurdService] },

  {path:'update-booking-ride',component:UpdateBookingRideComponent ,canActivate : [AuthGaurdService] },
  {path:'booking-ride',component:BookingRideComponent ,canActivate : [AuthGaurdService] },
  {path:'booking-ride/:id/:orderId',component:BookingRideComponent ,canActivate : [AuthGaurdService] },
  {path:'order-history',component:OrderHistoryComponent ,canActivate : [AuthGaurdService] },
  {path:'school-driver-management',component:SchoolDriverManagementComponent , canActivate : [AuthGaurdService] },
  {path:'school-driver-management/:id/:name',component:SchoolDriverManagementComponent , canActivate : [AuthGaurdService] },
  {path:'school-driver-management/:id',component:SchoolDriverManagementComponent , canActivate : [AuthGaurdService] },
  {path:'attribute',component:AttributeComponent ,canActivate : [AuthGaurdService] },
  {path:'document',component:DocumentComponent ,canActivate : [AuthGaurdService] }, 
  {path:'country',component:CountryComponent ,canActivate : [AuthGaurdService] },
  {path:'state',component:StateComponent , canActivate : [AuthGaurdService] },
  {path:'city',component:CityComponent ,canActivate : [AuthGaurdService] },
  {path:'slot',component:SlotComponent ,canActivate : [AuthGaurdService] },
  {path:'vehicle',component:VehicleComponent ,canActivate : [AuthGaurdService] },
  {path:'curriculam',component:CurriculamComponent ,canActivate : [AuthGaurdService] },
  {path:'package',component:PackageComponent ,canActivate : [AuthGaurdService] },
  {path:'tax',component:TaxComponent ,canActivate : [AuthGaurdService] },
  {path:'gearType',component:GeartypeComponent,canActivate : [AuthGaurdService] },
  {path:'ride-rate',component:RideRatingComponent,canActivate : [AuthGaurdService] },
 
  {path:'master',component:MasterManagerComponent,canActivate : [AuthGaurdService] },
  { path: 'create-invoice', component: CreateInvoiceComponent,canActivate : [AuthGaurdService]  },

  // { path: 'payment', component: StripPaymentComponent  },


];

@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: []
})
export class AppRoutingModule { }
