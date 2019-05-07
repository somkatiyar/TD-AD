import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { DataService } from 'src/app/service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from 'src/app/service/var.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { $ } from 'protractor';

@Component({
  selector: 'app-booking-history',
  templateUrl: './booking-history.component.html',
  styleUrls: ['./booking-history.component.css']
})
export class BookingHistoryComponent implements OnInit {

  @ViewChild('close') modalClose: ElementRef;
  @ViewChild('close1') modalClose1: ElementRef;
  @ViewChild('open') modelOpen: ElementRef;
  details: any = {};
  tab: number = 0;
  driver: any = {};
  lerner: any = {};
  type: any = {};
  show: any = {};
  hide: any = {};
  user = "";
  instructor = "";
  drivers: any = [];
  detail: any = {};
  timeslots: any = [];
  slotupdate: any = {};
  selectedData: any = {};
  testcenter: any = {};
  testCenterBookings: any[] = [];
  isTestCenterBookingData: boolean = false;
  temp: any[] = [];
  temp_sec: any[] = [];
  order: string = 'name';
  admin_token: any;
  bookingHistory: any[] = [];
  allstatus: any = {};
  bookTest: any = {};
  BookedCenterId: any;
  slotBookingId: any;
  p: number = 1;
  total: Number;
  totalBookingPage: Number;
  totalDriverPage: Number;
  driverId: any;
  showDriverName: any;
  isSearching: boolean = false;
  txtSearch: any;
  newDriverSelected = false;
  noData: boolean = false;

  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private router: Router,
    @Inject('picUrl') private picUrl: string,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Booking History";

    this.allstatus = ['PENDING',
      'CONFIRMED',
      'COMPLETED',
      'CANCELLED'];


    this.show = false;
    this.hide = true;

    this.testCenterBookings = this.temp;
    this.bookingHistory = this.temp_sec;
  }

  renderToModal(data) {

    this.slotupdate = {
      driver: data.driver,
      time: data.slot
    }
  }

  setPopUp(index) {

    if (!this.newDriverSelected) {
      this.showDriverName = this.bookingHistory[index].driverId.firstName + " " + this.bookingHistory[index].driverId.lastName;
      this.slotupdate.slot = this.bookingHistory[index].slotId._id;
    }
  }


  changePageTitle(title) {
    this.varCtrl.isTitle = true;
    this.varCtrl.title = title;
    if (title == "Booking History") {
      this.getBookingHistory();
    } else {
      this.getTestCenterBooking();
    }
  }



  ngOnInit() {

    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    this.getBookingHistory();
    this.getDrivers();
    this.getSlots();

  }



  getTestCenterBooking() {
    this.details['token'] = this.admin_token;
    this.details['page'] = 0;
    let body = this.details;
    this.myservice
      .postCall('admin/testCenterBookings', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.total = res.totalPages;

          this.testCenterBookings = this.temp;

          this.noData = false;
          console.log(this.testCenterBookings, 'test booking center');
        } else {
          this.noData = true;

        }
      }, err => {
      });
  }


  getBookingHistory() {
    this.details['page'] = 0;
    this.details['token'] = this.admin_token;

    let body_sec = this.details;
    this.myservice
      .postCall('admin/bookingHistory', body_sec)
      .subscribe(res => {
        if (res["status"]) {
          this.temp_sec = res['data'];
          for (var i = 0; i < res['data'].length; i++) {


          }
          this.bookingHistory = this.temp_sec;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.bookingHistory, 'booking history');
        } else {
          this.noData = true;
        }
      }, err => {
      });
  }



  searchName(inputName, currentPageCliked = 0) {

    this.drivers = [];
    this.isSearching = true;
    this.getDrivers();
  }





  getDriverNamePlaceHolder(fname, lName, id) {
    this.newDriverSelected = true;
    let name = fname + " " + lName;
    this.driverId = id;
    this.showDriverName = name;
    console.log(this.driverId, this.showDriverName)
    let el: HTMLElement = this.modelOpen.nativeElement as HTMLElement;
    el.click();

  }

  getDrivers(currentPageCliked = 0) {

    let getdriver: any = {};
    getdriver['token'] = this.admin_token
    getdriver['page'] = currentPageCliked;
    getdriver['keyword'] = this.txtSearch;

    getdriver['isSearching'] = this.isSearching;
    let driver_body = getdriver;
    this.myservice
      .postCall('admin/drivers', driver_body)
      .subscribe(res => {
        if (res["status"]) {
          this.total = res.totalPages;

          this.drivers = res['data'];
          console.log(this.drivers, 'drivers');
        } else {

        }
      }, err => {
      });
  }




  getSlots() {


    let getslots: any = {};

    getslots['token'] = this.admin_token
    let slot_body = getslots;
    this.myservice
      .postCall('common/slots', slot_body)
      .subscribe(res => {
        if (res["status"]) {

          this.timeslots = res['data'];
          console.log(this.timeslots, 'timeslots');
        } else {

        }
      }, err => {
      });
  }


  // getDriveListPagination(currentPageCliked = 0) {

  //   let getdriver: any = {};
  //   getdriver['page'] = currentPageCliked;
  //   getdriver['token'] = this.admin_token
  //   let driver_body = getdriver;
  //   this.myservice
  //     .postCall('admin/drivers', driver_body)
  //     .subscribe(res => {
  //       if (res["status"]) {
  //         this.totalDriverPage = res.totalPages;
  //         this.drivers = res['data'];
  //         console.log(this.drivers, 'drivers');
  //       } else {

  //       }
  //     }, err => {
  //     });
  // }



  paginationForDrivers(ev) {
    this.p = ev;

    this.getDrivers(ev - 1);
  }


  paginationForPaymentHistory(ev) {
    //console.log(ev);
    this.p = ev;
    this.getBookingHistoryOnPagination(ev - 1);
  }

  paginationForTestCenterBooking(ev) {
    this.p = ev;
    this.getTestCenterBookingOnPagination(ev - 1);
  }

  getBookingHistoryOnPagination(currentPageCliked = 0) {
    this.details['page'] = currentPageCliked;
    let body_sec = this.details;

    this.myservice
      .postCall('admin/bookingHistory', body_sec)
      .subscribe(res => {
        if (res["status"]) {
          this.temp_sec = res['data'];
          this.bookingHistory = this.temp_sec;
          this.totalBookingPage = res.totalPages;

          console.log(this.bookingHistory, this.total, 'booking history');
        } else {

        }
      }, err => {
      });
  }

  getTestCenterBookingOnPagination(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    let body = this.details;
    this.myservice
      .postCall('admin/testCenterBookings', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.testCenterBookings = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.testCenterBookings, 'test booking center');
        } else {
          this.noData = true;
        }
      }, err => {
      });
  }

  getData() {
    this.show = true;
    this.hide = false;
    console.log(this.type.type);
    if (this.type.type == 'Lerner') {
      this.details = this.lerner;
    } else {
      this.details = this.driver;
    }
    console.log(this.details);
  }

  errorHandler(e) {
    console.log(e);
    e.target.src = 'assets/images/userPlaceholder.png';
  }


  update() {
    console.log("update details", this.slotupdate);

    let body = this.slotupdate;
    // this.myservice
    //   .postCall('admin/login', body)
    //   .subscribe(res => {
    //     if (res["status"] ) {
    //       this.myservice.success("Updated Successfully..!");
    //     } else {
    //       this.myservice.error("Error in updation..!");
    //    }
    //   }, err => {
    //   });


  }
  goToBookingRides(id, orderId) {
    this.router.navigate(['/booking-ride', id, orderId])
  }
  renderToCenterUpdate(item) {

    this.BookedCenterId = item._id;
  }
  renderToUpdateSlot(item, index) {
    // alert(index)
    // this.setPopUp(index);
    this.txtSearch = "";
    console.log(item, 'slot item');
    this.slotBookingId = item._id;
  }
  UpdateBookTestCenter() {
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    this.details['token'] = this.admin_token;
    this.details['bookedTestCenterId'] = this.BookedCenterId;
    this.details['status'] = this.bookTest.status;
    this.details['testDate'] = this.bookTest.dateTime;
    let body = this.details;



    this.myservice
      .postCall('admin/updateTestBookingCenter', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success("Status updated Successfully..!");

          let el: HTMLElement = this.modalClose1.nativeElement as HTMLElement;
          el.click();
          setTimeout(() => {

            window.location.reload();

          }, 200);
          this.bookTest.status = '';
          this.bookTest.dateTime = '';
        } else {

        }
      }, err => {
      });
  }
  UpdateDriverAndSlot() {
    this.newDriverSelected = false;
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    let updateslot: any = {};
    updateslot['token'] = this.admin_token;
    updateslot['driverId'] = this.driverId;
    updateslot['slotId'] = this.slotupdate.time;
    updateslot['type'] = "bookings";
    updateslot['bookingId'] = this.slotBookingId;
    updateslot['ridebBookingId'] = ''
    let body = updateslot;
    this.myservice
      .postCall('admin/bookingDriverAndSlotUpdate', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success("Information updated Successfully..!");
          let el: HTMLElement = this.modalClose.nativeElement as HTMLElement;
          el.click();
        } else {

        }
      }, err => {
      });
  }
  key = "learnerId ? learnerId.firstName : '' ";
  reverse = false;
  sortList(key) {

    this.key = key;
    this.reverse = !this.reverse;
  }


  filterFunction() {
    var input, filter, ul, li, a, i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    // var div = document.getElementById("myDropdown");
    //  a = div.getElementsByTagName("a");
    for (i = 0; i < this.drivers.length; i++) {
      if (a[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
        a[i].style.display = "";
      } else {
        a[i].style.display = "none";
      }
    }
  }

  closeParentModel() {

    let el: HTMLElement = this.modalClose.nativeElement as HTMLElement;
    el.click();
    this.isSearching = false;
    this.getDrivers()
  }
}
