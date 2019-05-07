import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';




@Component({
  selector: 'app-create-subadmin',
  templateUrl: './create-subadmin.component.html',
  styleUrls: ['./create-subadmin.component.css']
})
export class CreateSubadminComponent implements OnInit {

  @ViewChild('f') public myForm: NgForm;
  schoolPlaceHolder: any = "Please Select School";
  isAddPage: boolean = true;
  isProfile: boolean = false;
  selectedImage: any;
  fileData = [];
  showSchoolName: any;
  isAutomatic: any = "";
  vehicleTypeId: any = "";
  dlName: string;
  bedgeName: string;
  p: any = 1;
  driverId: any;
  admin_token: any;

  details: any = {

  };
  total: any;
  countryCode: any;
  // address var
  addressLineOne: any;
  pincode: any;
  long: any;
  countries: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];
  states: any = [];
  cities: any = [];
  country: any = "";
  state: any = "";
  city: any = "";
  addressId: any;
  //car var
  registrationNumber: any;
  chassisNumber: any;
  vTypes: any = [];
  carInfoId: any;

  //buddy var
  final: any = [];
  companions: any = [];
  buddyData: any = [];
  userId: any;
  btnTitle: string = "Register";

  typeUser: any;

  show: any;

  imagePath: any;
  profilePictureUrl: any;

  firstName: any;
  email: any;
  password: any;
  adiOrPdiBadgeNumber: any;
  lastName: any;
  drivingLicense: any;
  mobileNumber: any;
  isArchived: boolean = false;
  isChecked: any;

  txtSearch: any;
  isSearching: boolean = false;
  isProfileChange: boolean = false;
  temp: any = [];

  disableBtn: string;
  approveBtn: string;
  btnClass: string = "disablebtn";
  confirmPassword: any;
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,

    @Inject('picUrl') public picUrl: string,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Add Sub Admin";
    // let new_id = this.activatedRoute.snapshot.params['id'];
    // console.log(new_id, 'new id')
    this.userId = this.activatedRoute.snapshot.params['id'];
    this.typeUser = this.activatedRoute.snapshot.params['type'];
    console.log(this.userId, 'userid is')
    console.log(this.typeUser, 'type is')


    if (!this.userId) {

      this.btnTitle = "Submit"

    }
    else {
      if (this.userId && this.typeUser == "isSchool") {
        this.isAddPage = false;


        this.userId = "";
        this.btnTitle = "Submit"


      } else {

        this.btnTitle = "Update"
        this.varCtrl.title = "Update SubAdmin"
        this.isAddPage = false;
        this.companions = this.details['companions'];
      }




    }

  }

  showHidePass() {
    this.show = !this.show;
  }


  omit_special_char(event)
  {   
     var k;  
     k = event.charCode;  //         k = event.keyCode;  (Both can be used)
     return((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57)); 
  }

  charOnly(event): boolean {
    console.log(event);
        const charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return true;
        }
        return false;
    
  }



  searchName(inputName, currentPageCliked = 0) {


    this.isSearching = true;

  }



  ngOnInit() {

    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    if (this.admin_token) {
 
      this.getCountryList();
      this.getStateList();
      this.getCityList();
      this.singleUserDetail();
    
    }




  }



  getStateList(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;

    let body = this.details;
    this.myservice
      .postCall('common/states', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.states = this.temp;
        } else {

        }
      }, err => {
      });
  }



  getCountryList(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;

    let body = this.details;
    this.myservice
      .postCall('common/countries', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.countries = this.temp;
        } else {

        }
      }, err => {
      });


  }

  getCityList(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;

    let body = this.details;
    this.myservice
      .postCall('common/cities', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.cities = this.temp;
        } else {

        }
      }, err => {
      });


  }





  errorHandler(e) {
    console.log("event error img", e);
    e.target.src = "assets/images/userPlaceholder.png";
  }


  dropDown(event) {

    this.varCtrl.title = "Add Sub Admin"



  }



  register() {
    if (!this.userId) {
      this.btnTitle == "Register"
    }
    else {
      this.btnTitle = "Update"
    }
  }
  goBack() {

    window.history.back();
  }



  singleUserDetail() {

    let body = { _id: this.userId, token: this.admin_token, type: this.typeUser }

    console.log(body, 'here body is')
    if (this.userId && this.admin_token)
      this.myservice
        .postCall('admin/userById', body)
        .subscribe(res => {
          if (res["status"]) {
            this.details = res['data']
            this.firstName = (res['data'].firstName ? res['data'].firstName : "");
            this.lastName = (res['data'].lastName ? res['data'].lastName : "");
            console.log(this.firstName, this.lastName, 'singler user data');
            this.email = (res['data'].email ? res['data'].email : "");
            this.mobileNumber = (res['data'].mobileNumber ? res['data'].mobileNumber : "");
            this.password = (res['data'].password ? res['data'].password : "");
            this.confirmPassword =(res['data'].password ? res['data'].password : "");
            this.isArchived = (res['data'] ? res['data'].isArchived : "");


            if (this.isArchived == true) {
              this.disableBtn = "Enable"
              this.btnClass = "enableBtn"
            } else {
              this.disableBtn = "Disable"
              this.btnClass = "disableBtn"
            }
            this.countryCode = (res['data']['addresses'][0] ? res['data']['addresses'][0].countryCode : "");
            this.country = (res['data']['addresses'][0] ? res['data']['addresses'][0].country : "");


            this.state = (res['data']['addresses'][0] ? res['data']['addresses'][0].state : "");


            this.city = (res['data']['addresses'][0] ? res['data']['addresses'][0].city : "");
            this.setUpFormForAddress();
            this.pincode = (res['data']['addresses'][0] ? res['data']['addresses'][0].pincode : "");
            this.addressLineOne = (res['data']['addresses'][0] ? res['data']['addresses'][0].addressLineOne : "");;
            this.addressId = (res['data']["addresses"][0] ? res['data']["addresses"][0]._id : "")



            this.adiOrPdiBadgeNumber = res['data'] ? res['data'].adiOrPdiBadgeNumber : "";
            this.drivingLicense = res['data'] ? res['data'].drivingLicense : "";

          } else {
            this.myservice.error("data not found");
          }
        }, err => {
        });

  }

  setUpFormForAddress() {
    this.stateList = this.states.filter(x => x.parent == this.country);
    let tempState = this.state;
    this.state = "";
    this.state = tempState;
    tempState = null;
    this.cityList = this.cities.filter(x => x.parent == this.state);
    let tempCity = this.city;
    this.city = "";
    this.city = tempCity;
    tempCity = null;
  }


  findState() {

    this.state = "";
    let x = this.countries.filter(ob => ob.value == this.country)

    this.countryCode = x[0].countryCode;

    this.stateList = this.states.filter(x => x.parent == this.country);

  }

  findCity() {
    this.city = "";
    this.cityList = this.cities.filter(x => x.parent == this.state);

  }






  numberOnly(event): boolean {
    console.log(event);
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  onSubmit() {





    if (!this.userId) {
      this.subAdminCreate();
    } else {
      this.suAdminUpdate();
    }
  }






  subAdminCreate() {

    this.details = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      countryCode: this.countryCode,
      password: this.password,
      adiOrPdiBadgeNumber: this.adiOrPdiBadgeNumber,
      drivingLicense: this.drivingLicense,
      mobileNumber: this.mobileNumber,
      userType: "PORTAL_USER",
      useRole: "SUB_ADMIN",
      token: this.admin_token,
    }



    this.details['address'] = {

      addressLineOne: this.addressLineOne,

      city: this.city,
      state: this.state,
      pincode: this.pincode,
      country: this.country,
      lat: "",
      long: "",
      addressOf: "APP_DRIVER"
    }




    let endpoint = "admin/createSubAdmin";


    let body = this.details;
    console.log(this.details, 'detailed body')
    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {
        if (res["status"] == 1) {
          console.log("user inserted");

          this.myservice.success(res["message"]);

          this.myForm.resetForm();
          this.state = "";
          this.country = "";
          this.city = "";
        } else {
          this.myservice.error(res['message']);

        }
      }, err => {
      });


  }

  suAdminUpdate() {
    this.details = {
      firstName: this.firstName,
      lastName: this.lastName,
      // email: this.email,
      countryCode: this.countryCode,
      password: this.password,
      adiOrPdiBadgeNumber: this.adiOrPdiBadgeNumber,
      drivingLicense: this.drivingLicense,
      mobileNumber: this.mobileNumber,
      userType: "PORTAL_USER",
      useRole: "SUB_ADMIN",
      token: this.admin_token,
      isArchived: this.isArchived
    }

    this.details['adminId'] = this.userId;

    this.details['address'] = {

      addressLineOne: this.addressLineOne,

      city: this.city,
      state: this.state,
      pincode: this.pincode,
      country: this.country,
      lat: "",
      long: "",
      addressOf: "APP_DRIVER",
      addressId: this.addressId,
    }

    let body = this.details;
    console.log(this.details, 'outcome')
    this.myservice
      .postCall("admin/updateSubAdmin", body)
      .subscribe(res => {
        if (res["status"] == 1) {
          this.myservice.success(res['message']);

        } else {
          this.myservice.error(res["message"]);
        }
      }, err => {
      });


  }


  errorHandlerDoc(e) {
    console.log(e);
    e.target.src = 'assets/images/userPlaceholder.png';
  }



  disableItem(name) {

    let action: string;
    if (name == "aprove") {
      action = "accept"
    } else {
      action = ""
    }
    let body = { driverId: this.userId, token: this.admin_token, action: action }
    console.log(this.details)
    this.myservice
      .postCall('admin/acceptDisableUsers', body)
      .subscribe(res => {
        if (res["status"]) {
          if (name == "aprove") {
            document.getElementById('approveBtn').style.display = 'none'

          } else {
            if (this.disableBtn == "Disable") {
              this.disableBtn = "Enable"
              this.btnClass = "enableBtn"
            } else {
              this.disableBtn = "Disable"
              this.btnClass = "disableBtn"
            }
          }
          this.myservice.success(res['message'])
        } else {
          console.log("user inserted");

        }
      }, err => {
      });
  }



}

