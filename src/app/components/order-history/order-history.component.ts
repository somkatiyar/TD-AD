import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from 'src/app/service/var.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
 details :any =[];
 view_data:any = {};
 temp: any[] = [];
 order: string = 'name';
 admin_token: any;
 payment:any ={};
 p : number = 1;
 orderId:any ;
 total : Number; 
 noData:boolean = false;
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true; 
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Order History";
    this.details = this.temp;
  }
  
  ngOnInit() {
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
   
   
   let order_detail:any ={};
   order_detail['page'] = 0;
   order_detail['token'] = this.admin_token
    let body = order_detail;
    this.myservice
      .postCall('admin/orderHistory', body)
      .subscribe(res => {
        if (res["status"] ) {
         this.temp = res['data'];
         this.details = this.temp;
         this.total = res.totalPages;
         this.noData = false;
         console.log(this.details,'order history');
         } else {
        this.noData = true;
        }
      }, err => {
      });
  }
  renderToModal(data){

    this.orderId = data._id;
  this.view_data = {
  orderId :data._id,
  driver : (data.driverId ==null) ? "NA": data.driverId.firstName +" "+data.driverId.lastName ,
  driverId :(data.driverId ==null) ? "NA": data.driverId._id ,
  lurnr : (data.learnerId==null) ? "NA" : data.learnerId.firstName +" "+data.learnerId.lastName ,
  lurnrId : data.learnerId._id ? data.learnerId._id : "NA",
  paymentDate:data.createdDate ? data.createdDate : "NA",
  lession_start_date: data.lessonStartDate ? data.lessonStartDate : "NA",
  pickup_address:data.pickUpAddressId.name ? data.pickUpAddressId.name :"NA",
  slot:(data.slotId ==null)?"NA":data.slotId.name,
  paymentStatus:data.paymentStatus,
  packageName:data.packageId.name,
  packageDescription:data.packageId.description ? data.packageId.description : "NA"
};
console.log('all data',this.view_data);
  }
 
  key = ''; // sort default by name
  reverse = false;

  sortList(key) {

    this.key = key;
    this.reverse = !this.reverse;
  }


        orderNow(){
          let paymentDetails :any ={};
          let lp = JSON.parse(localStorage.getItem('adminDetail'));
          this.admin_token = lp.token;
          paymentDetails = {
            token:this.admin_token,
            paymentType: "ONLINE",
            orderId: this.orderId,
            paymentStatus: "COMPLETED",
            paymentId: this.payment.paymentId,
            transactionId: ""
          }
          var idx = document.getElementById("payment");
          let body = paymentDetails;
          this.myservice
          .postCall('common/paymentStatus', body)
          .subscribe(res => {
            if (res["status"] ) {
              this.myservice.success("Payment done Successfully..!");
              
              // idx.style.display = "none";
              
             } else {
              this.myservice.error(res["message"]);
             // idx.style.display = "none";
             
            }
          }, err => {
          });
        }
  
        orderHistoryOnPagination(currentPageCliked = 0) {
          let lp = JSON.parse(localStorage.getItem('adminDetail'));
          
          this.admin_token = lp.token;
          let order_detail:any ={};
          order_detail['token'] = this.admin_token
          order_detail['page'] = currentPageCliked;
           let body = order_detail;
           this.myservice
             .postCall('admin/orderHistory', body)
             .subscribe(res => {
               if (res["status"] ) {
                this.temp = res['data'];
                this.details = this.temp;
                this.total = res.totalPages;
                console.log(this.details,'order history');
                } else {
       
               }
             }, err => {
             });
        }
        paginationFororderHistory(ev) {
          //console.log(ev);
          this.p = ev;
          this.orderHistoryOnPagination(ev-1);
       }
}
