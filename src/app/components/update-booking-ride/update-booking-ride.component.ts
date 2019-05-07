import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from 'src/app/service/var.service';

@Component({
  selector: 'app-update-booking-ride',
  templateUrl: './update-booking-ride.component.html',
  styleUrls: ['./update-booking-ride.component.css']
})
export class UpdateBookingRideComponent implements OnInit {
  drivers :any = {};
  details : any = {};
  timeslots:any = {};
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.drivers = [
      {name:"Ram"},
      {name:"Sohan"}
    ];
    this.timeslots = [
      {slot:"12:00"},
      {slot:"1:00"},
      {slot:"2:00"},
      {slot:"3:00"}
    ]
  }


  ngOnInit() {
  }
 update(){
   console.log("update details",this.details);

   let body = this.details;
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
}
