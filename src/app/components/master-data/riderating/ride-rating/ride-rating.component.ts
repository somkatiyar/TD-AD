import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VarService } from '../../../../service/var.service';
import { Http } from '@angular/http';
import { DataService } from '../../../../service/dataservice.service';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-ride-rating',
  templateUrl: './ride-rating.component.html',
  styleUrls: ['./ride-rating.component.css']
})
export class RideRatingComponent implements OnInit {

  @ViewChild('f') public myForm: NgForm;
  admin_token: any;
  details: any = {};
  temp: any = [];
  packageList: any = [];
  addPage: boolean = false;
  updatePage: boolean = false;
  name: any;
  noOfDay: any;
  noOflesson: any;
  tax: any;
  price: any;
  pageHeader: any;
  packageId: any;
  pRideRate: number = 1;
  pDriver:number = 1;
  pSchool:Number = 1;
  isArchived: boolean = false;
  isChecked: any;
  taxList: any = [];
  rideRateList = [];
  isSearching:boolean = false;
  total: Number;
  totalDriverPage: Number;
  totalSchoolPages:Number;
  drivers: any = [];
  schools: any = [];
  showUserName: any;
  driverId: any;
  taxId: any;
  isSchool: boolean = false;
  isGeneric: boolean = false;
  rideId: any;
  currentIndexToUpdate = 0;
  labelName: any;
  noData: boolean = false;
  whoName: any;
  txtSearch: any;
  constructor(private myservice: DataService,
    @Inject('picUrl') public picUrl: string,
    private varCtrl: VarService,

  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Ride Rate Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    this.getTaxList();

    if (this.admin_token && this.admin_token.length > 0) {
      this.getRideRateList()
    }
  }

  paginationForRideRate(ev) {
    //console.log(ev);
    this.pRideRate = ev;
    this.getRideRateList(ev - 1);
  }


  getRideRateList(currentPageCliked = 0) {

    this.details['page'] = currentPageCliked;

    this.details['token'] = this.admin_token;
    let body = this.details;
    this.myservice
      .postCall('master/riderates', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];

          this.total = res.totalPages;
          this.rideRateList = this.temp;
          this.noData = false;
          let x;
          x = this.rideRateList.filter(ob => ob ? ob.userRole == "SCHOOL_USER" : "false")
          // x.userRole =
          //   console.log(this.rideRateList, x, 'ride rate list')
        } else {

          this.noData = true;

        }
      }, err => {
      });
  }
  getTaxList() {


    this.details['token'] = this.admin_token;
    this.details['page'] = 0;
    let body = this.details;
    this.myservice
      .postCall('master/taxes', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          let x = this.temp.filter(ob=>ob.isArchived == false)
          this.temp = x;
          this.taxList = this.temp;
          // console.log(this.taxList,'ride rate list')
        } else {

        }
      }, err => {
      });
  }


  getDriveListPagination(currentPageCliked = 0) {

    let getdriver: any = {};
    getdriver['page'] = currentPageCliked;
    getdriver['token'] = this.admin_token
    getdriver['keyword'] = this.txtSearch;

    getdriver['isSearching'] = this.isSearching;
    let driver_body = getdriver;
    this.myservice
      .postCall('admin/drivers', driver_body)
      .subscribe(res => {
        if (res["status"]) {
          this.totalDriverPage = res.totalPages;
          this.drivers = res['data'];
          this.schools = [];
        } else {

        }
      }, err => {
      });
  }

  paginationFordrivers(ev) {
    this.pDriver = ev;
   
   this.getDriveListPagination(ev-1);
  }


  getSchoolListpagination(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    this.details['keyword'] = this.txtSearch;

    this.details['isSearching'] = this.isSearching;
    let body = this.details;
    this.myservice
      .postCall('admin/schools', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.totalSchoolPages = res.totalPages;
          this.schools = this.temp;
          this.drivers = [];
        } else {

        }
      }, err => {
      });
  }


  paginationForSchools(ev) {
    this.pSchool = ev;
   
    this.getSchoolListpagination(ev-1);
  }

  errorHandler(e) {
    console.log(e);
    e.target.src = 'assets/images/userPlaceholder.png';
  }
  
//   paginationForPopUp(ev) {
//     this.p = ev;
// if(this.isSchool) {
//   this.getSchoolListpagination(ev - 1);
// } else {
//   this.getDriveListPagination(ev - 1);
// }
 
   
//   }


  getDriverNamePlaceHolder(fname, id) {

    let name = fname
    this.driverId = id;
    this.showUserName = name;


  }


  getTaxId(id) {
    this.taxId = id;
    this.tax = this.taxList.filter(ob => ob._id == id)[0].taxPercentage;
    console.log(this.tax, "taxpercentage")
  }

  selectUserType(value) {

    if (value == "school") {
      this.getSchoolListpagination();
      this.isSchool = true;

    } else {
      this.getDriveListPagination();
      this.isSchool = false;
    }
  }


  searchDriverName(inputName,currentPageCliked = 0) {

    this.drivers= [];
    this.isSearching = true;
    this.getDriveListPagination();
    }

    searchSchoolName() {
      this.schools= [];
      this.isSearching = true;
      this.getSchoolListpagination();
    }

  goToAddSection() {
    this.noData = false;
    this.addPage = true;
    this.updatePage = false;
    this.pageHeader = "Add Ride Rate "
    this.myForm.reset();
  }

  setUpdatedValue() {

    this.rideRateList[this.currentIndexToUpdate].price = this.price;


    this.tax = this.taxList.filter(ob => ob._id == this.taxId)[0].taxPercentage;
    console.log(this.tax, 'yyyy')
    this.rideRateList[this.currentIndexToUpdate].taxId.taxPercentage = this.tax;
    this.rideRateList[this.currentIndexToUpdate].isArchived = this.isArchived;

  }

  goToUpdateSection(id, index) {
    this.noData = false;
    this.currentIndexToUpdate = index;
    let top = document.getElementById('top');
    top.scrollIntoView();
    top = null;

    this.rideId = id;
    this.addPage = false;
    this.updatePage = true;
    this.pageHeader = "Update Ride Rate "

    let x = this.rideRateList.filter(ob => ob._id == id)


    this.price = x[0].price ? x[0].price : "NA";
    this.tax = x[0].taxId ? x[0].taxId.taxPercentage : "NA";
    this.whoName = x[0].who.schoolName  ? x[0].who.schoolName : x[0].who.firstName ? x[0].who.firstName :"NA"

    this.isArchived = x[0].isArchived ? x[0].isArchived : "NA";
    if (this.isArchived == true) {
      this.labelName = "Disabled"
    } else {
      this.labelName = "Enabled"

    }
    console.log(this.tax, 'this.tax')
    console.log(this.price, 'xcxcxc')


  }




  onSubmit() {
    if (this.addPage) {
      this.addRideRate();
    } else {
      this.attributeUpdate();
    }

  }

  addRideRate() {


    if (this.rideRateList.length < 0) {
      this.isGeneric = true;
    } else {
      this.isGeneric = false;
    }


    this.details = {
      who: this.driverId,
      price: this.price,
      token: this.admin_token,
      isGeneric: this.isGeneric,
      isSchool: this.isSchool,
      taxId: this.taxId

    }
    let body = this.details;
    this.myservice
      .postCall('master/addRideRate', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success(res['message'])
          this.myForm.resetForm();
        } else {
          this.myservice.error(res['message'])
        }
      }, err => {
      });
  }


  attributeUpdate() {

    this.details = {
      price: this.price,
      taxId: this.taxId,
      rideId: this.rideId,
      token: this.admin_token,
      // isArchived : this.isArchived,

    }
    let body = this.details;
    console.log(body)
    this.myservice
      .postCall("master/updateRideRate", body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success(res['message'])
          this.setUpdatedValue();
        } else {
          this.myservice.error(res['message'])
        }
      }, err => {
      });
  }




  setClass(item) {

    if (item.isArchived == true) {
      return "enableBtn";
    }
    return "disableBtn";
  }

  isVerified(item) {

    if (item.isArchived == true) {
      return "Enable";
    }
    return "Disable";
  }

  disableItem(name, item) {



    let body = { docId: item._id, token: this.admin_token, "master": "riderates" }

    console.log(this.details)
    this.myservice
      .postCall('admin/enableDisableMaster', body)
      .subscribe(res => {
        if (res["status"]) {


          this.myservice.success(res['message'])
          if (item.isArchived) {

            item.isArchived = false;
            this.labelName = "Enabled"
          } else {

            item.isArchived = true;
            this.labelName = "Disabled"
          }

          var x = [];
          x = this.rideRateList;
          this.rideRateList = [];
          this.rideRateList = x;
          x = [];



        }
      }, err => {
      });
  }

}
