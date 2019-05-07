import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-school-driver-management',
  templateUrl: './school-driver-management.component.html',
  styleUrls: ['./school-driver-management.component.css']
})
export class SchoolDriverManagementComponent implements OnInit {

  schoolDriverId: any;
  details: any = {}
  admin_token: any;
  driverList: any = [];
  schoolName: any;
  total: any;
  p: number = 1;
  noData: boolean = false;
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('picUrl') private picUrl: string,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "School Driver Management";


    this.schoolDriverId = this.activatedRoute.snapshot.params['id'];
    this.schoolName = this.activatedRoute.snapshot.params['name'];

  }

  ngOnInit() {
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    console.log(this.admin_token, 'admin')

    if (this.schoolDriverId && this.admin_token) {

      this.showDriver();
    }
  }


  key = ''; // sort default by name
  reverse = false;

  sortList(key) {

    this.key = key;
    this.reverse = !this.reverse;
  }



  showDriver(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['schoolId'] = this.schoolDriverId;
    this.details['page'] = currentPageCliked;
    let body = this.details;
    console.log(this.details)
    this.myservice
      .postCall('admin/schoolDriver', body)
      .subscribe(res => {
        if (res["status"]) {
          this.driverList = res['data'];
          this.key = "firstName"
          this.schoolName = this.driverList.schoolDetail.schoolName
          this.total = res['totalPages'];
       
          if (this.driverList['userDetail'].length > 0) {
            this.noData = false;
            this.myservice.success("School Driver List..!")
          } else {
            this.noData = true;
            this.myservice.error("School Driver Not Added Yet..!")
          }
        } else {
          this.myservice.error(res["message"]);
          this.noData = true;
        }
      }, err => {
      });
  }





  paginationForDriver(ev) {
    this.p = ev;

    this.showDriver(ev - 1);
  }

  errorHandler(e) {
    console.log("event error img", e);
    e.target.src = "assets/images/userPlaceholder.png";
  }

  goToAddDriver() {
    let id = this.schoolDriverId;
    let name = "isSchool"
    this.router.navigate(['driver-create', name, id]);
  }

  goToUpdatePage(id) {

    let type = "driver";

    this.router.navigate(['/driver-create', type, id,]);
  }

  goBack() {

    window.history.back();
  }


  isApproved(item) {
    let documents = item.documents;
    if (documents != [] && documents.length == 2) {
      if (documents[0].isVerified == 1 && documents[1].isVerified == 1) {

        return true;
      }
    }

    return false;
  }
  isVerified(item) {

    if (item.isArchived == true) {
      return "Enable";
    }
    return "Disable";
  }

  setClass(item) {
    //console.log(item,'userdetail')
    if (item.isArchived == true) {

      return "enableBtn";
    }
    return "disableBtn";
  }

  disableItem(name, item) {
    let body = {};
    let endpoint;
    let action: string;
    if (name == "aprove") {
      action = "accept"
    } else {
      action = ""
    }


    endpoint = "admin/acceptDisableUsers";
    body = { driverId: item._id, token: this.admin_token, action: action }
    console.log(body, 'body')



    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {
        if (res["status"]) {
          if (name == "aprove") {
            item.documents[0].isVerified = "1";
            item.documents[1].isVerified = "1";
          } else {
            console.log(item, 'im here')
            if (item.isArchived) {

              item.isArchived = false;
            } else {
              item.isArchived = true;
            }
          }



          this.myservice.success(res['message'])

          var x = [];
          x = this.driverList;
          this.driverList = [];
          this.driverList = x;
          x = [];


        } else {
          console.log("user inserted");

        }
      }, err => {
      });
  }

}
