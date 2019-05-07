import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DataService } from 'src/app/service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from 'src/app/service/var.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-booking-ride',
  templateUrl: './booking-ride.component.html',
  styleUrls: ['./booking-ride.component.css']
})
export class BookingRideComponent implements OnInit {
  @ViewChild('close') modalClose: ElementRef;
  // @ViewChild('close1') modalClose1: ElementRef;
  @ViewChild('open') modelOpen: ElementRef;

  details : any ={};
  drivers :any= [];
  detail : any = {};
  driverId : any;
  
  slotupdate : any = {};
  temp: any[] = [];
  booking_id : any;
  order: string = 'name';
  admin_token: any;
  bookingRides :any[]= [];
  timeslots:any =[];
  slotBookingId : any;
  p : number = 1;
  pTotal : number = 1;
  txtSearch : any;
  isSearching : boolean = false;
  total: any;
  showDriverName : any;
  totalRide : any;
  newDriverSelected = false;
  orderId : any;
  
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private activatedRoute:ActivatedRoute,
    @Inject('picUrl') private picUrl: string
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Ride Details";
    this.bookingRides = this.temp;

    this.booking_id = this.activatedRoute.snapshot.params['id'];
    this.orderId = this.activatedRoute.snapshot.params['orderId'];


  }
  renderToModal(data){
    this.slotupdate = {
      driver: data.driver,
      time: data.slot
    }
  }
  renderToUpdateSlot(item,index){
    
    // this.setPopUp(index);
    // this.txtSearch ="";
    console.log(item,'slot item');
    this.slotBookingId = item._id;
  }

  createNewBooking() {
    let body : any ={};
    body['token'] = this.admin_token;
    body['bookingId'] = this.booking_id;
    body['orderId'] = this.orderId;
   
    this.myservice
      .postCall('admin/createNewRide', body)
      .subscribe(res => {
        if (res["status"] ) {
          this.myservice.success("Booking created succesfully..!");
          this.getBookingRide();
         } else {
          this.myservice.success(res["message"]);
        }
      }, err => {
      });
  }


  setPopUp(index) {

    if(!this.newDriverSelected){
    this.showDriverName = this.bookingRides[index].driverId.firstName + " " + this.bookingRides[index].driverId.lastName;
    this.slotupdate.time = this.bookingRides[index].slotId.name;
   
    } 

    
  }

  errorHandler(e) {
    console.log(e);
    e.target.src = 'assets/images/userPlaceholder.png';
  }


  ngOnInit() {
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

 

      this.getDrivers();
      
      this.getBookingRide();
  

        let getslots : any ={};
  
        getslots['token'] = this.admin_token
        let slot_body = getslots;
        this.myservice
          .postCall('common/slots', slot_body)
          .subscribe(res => {
            if (res["status"] ) {
           
             this.timeslots = res['data'];
             console.log(this.timeslots,'timeslots');
             } else {
    
            }
          }, err => {
          });

  }
  paginationForDrivers(ev) {
    console.log(ev,'ev')
    this.pTotal = ev;
   
   this.getDrivers(ev-1);
  }
  



  searchName(inputName,currentPageCliked = 0) {

    this.drivers= [];
    this.isSearching = true;
      this.getDrivers();
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
          console.log(this.total,'total')
          this.drivers = res['data'];
          console.log(this.drivers, 'drivers');
        } else {
  
        }
      }, err => {
      });
  }






  


  closeParentModel() {

    let el: HTMLElement = this.modalClose.nativeElement as HTMLElement;
    el.click();
    this.isSearching = false;
    this.getDrivers()

  }



  getDriverNamePlaceHolder(fname,lName, id) {

    let name = fname +" " + lName;
    this.newDriverSelected = true;
    this.driverId = id;
    this.showDriverName = name;
    this.txtSearch= "";
    console.log(this.driverId, this.showDriverName)
    let el: HTMLElement = this.modelOpen.nativeElement as HTMLElement;
    el.click();
  
  }

  paginationForBookingRide(ev) {
    //console.log(ev);
    this.p = ev;
    this.getBookingRide(ev - 1);
  }

getBookingRide(currentPageCliked = 0) {
  this.details['page'] = currentPageCliked;
  this.details['token'] = this.admin_token
  this.details['bookingId'] =  this.booking_id;
  let body = this.details;
  this.myservice
    .postCall('admin/bookingRides', body)
    .subscribe(res => {
      if (res["status"] ) {
       this.temp = res['data'];
       this.bookingRides = this.temp;
       this.totalRide = 2;
       console.log(this.bookingRides,'rides');
       } else {

      }
    }, err => {
    });
}


  UpdateDriverAndSlot(){
    this.newDriverSelected = false;
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
     let updateslot :any ={};
     updateslot['token'] = this.admin_token;
     updateslot['driverId'] = this.driverId;
     updateslot['slotId']=this.slotupdate.time;
     updateslot['type'] ="";
     updateslot['bookingId'] = '';
     updateslot['ridebBookingId'] = this.slotBookingId;
     let body = updateslot;
     this.myservice
      .postCall('admin/bookingDriverAndSlotUpdate', body)
      .subscribe(res => {
        if (res["status"] ) {
          this.myservice.success("Information updated Successfully..!");
          let el: HTMLElement = this.modalClose.nativeElement as HTMLElement;
          el.click();
          this.getBookingRide();
         } else {
  
        }
      }, err => {
      });
  }
}
