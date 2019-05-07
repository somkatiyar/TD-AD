import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-school-create',
  templateUrl: './school-create.component.html',
  styleUrls: ['./school-create.component.css']
})
export class SchoolCreateComponent implements OnInit {
  @ViewChild('f') public myForm: NgForm;
  confirmPassword : any;
  password: any;
  email: any;
  mobileNumber: any;
  facebookLink: any;
  InstagramLink: any;
  googleLink: any;
  twitterLink: any;

  //Address field
  name: any;
  addressLineOne: any;
  addressLineTwo: any;

  lat: any;
  long: any;
  addressOf: any;
  pinCode: any;

  // Bank Detail
  bankName: any;
  accountNumber: any;
  IFSCCode: any;
  branchName: any;
  bankDetailId: any;

  details: any = {

  };
  country: any = "";
  state: any = "";
  city: any = "";
  isAutomatic: any = "";
  vehicleTypeId: any = "";
  countries: any = [];
  states: any = [];
  cities: any = [];
  countryList: any = [];
  stateList: any = [];
  cityList: any = [];

  school_id: any;
  btnTitle = "Submit";
  admin_token: any;
  typeUser: any;
  userId: any;
  addressId: any;

  id_school: any;
  driverList: any;
  schooldriverDetailId: any;
  showDriverbtn: boolean = false;
  isDriverListEmpty: boolean = false;
  driver_detail: any = {};
  isArchived: boolean = false;
  isChecked: any;
  isUpdatePage: boolean = false;
  schoolName: any;
  temp: any = [];
  show: any;
  disableBtn: string;
  btnClass: string = "disablebtn paddingAll";
  totalDrivers: any;
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Add School";

    this.school_id = this.activatedRoute.snapshot.params['id'];
    this.typeUser = this.activatedRoute.snapshot.params['type'];
    this.schooldriverDetailId = this.activatedRoute.snapshot.params['schoolId'];
    this.schoolName = this.activatedRoute.snapshot.params['schoolName'];




    if (!this.school_id) {
      this.btnTitle = "Submit"
      this.details = "";
      this.isUpdatePage = false;
      this.details = {
        userType: "LEARNER",
        role: "APP_USER"
      };
    }
    else {
      this.btnTitle = "Update"
      this.varCtrl.title = "Update School"
      this.showDriverbtn = true;
      this.isUpdatePage = true;
    }
  }

  ngOnInit() {
    this.getCountryList();
    this.getStateList();
    this.getCityList();
    
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if (this.admin_token) {
      this.singleUserDetail();

    }

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

  showHidePass() {
    this.show = !this.show;
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
















  numberOnly(event): boolean {
    console.log(event);
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }


  register() {
    if (!this.school_id) {
      this.schoolCreate();
    }
    else {
      this.schoolUpdate();
    }
  }

  singleUserDetail() {
    let body = { _id: this.school_id, token: this.admin_token, type: this.typeUser }
    if (this.school_id && this.admin_token)
      this.myservice
        .postCall('admin/userById', body)
        .subscribe(res => {
          if (res["status"]) {

            this.details = {
              schoolName: (res['data'][0]['school'] ? res['data'][0]['school'].schoolName : ""),
              taxId: (res['data'][0]['school'] ? res['data'][0]['school'].taxId : ""),
              contactPersonName: (res['data'][0]['school'] ? res['data'][0]['school'].contactPersonName : ""),
              contactPersonMobileNumber: (res['data'][0]['school'] ? res['data'][0]['school'].contactPersonMobileNumber : ""),
              contactPersonEmail: (res['data'][0]['school'] ? res['data'][0]['school'].contactPersonEmail : "")

            }
            this.bankName = (res['data'][0]['school']['bankDetail'] ? res['data'][0]['school']['bankDetail'].bankName : ""),
              this.accountNumber = (res['data'][0]['school']['bankDetail'] ? res['data'][0]['school']['bankDetail'].accountNumber : ""),
              this.IFSCCode = (res['data'][0]['school']['bankDetail'] ? res['data'][0]['school']['bankDetail'].IFSCCode : ""),
              this.branchName = (res['data'][0]['school']['bankDetail'] ? res['data'][0]['school']['bankDetail'].branchName : ""),
              this.bankDetailId = (res['data'][0]['school']['bankDetail'] ? res['data'][0]['school']['bankDetail']._id : ""),
              this.id_school = (res['data'][0]['school'] ? res['data'][0]['school']._id : ""),
              this.userId = (res['data'][0]['user'] ? res['data'][0]['user']._id : "");


            this.country = (res['data'][0]['user']['addresses'] ? res['data'][0]['user']['addresses'][0].country : "");
            this.addressId = (res['data'][0]['user']['addresses'] ? res['data'][0]['user']['addresses'][0]._id : "");
            this.state = (res['data'][0]['user']['addresses'] ? res['data'][0]['user']['addresses'][0].state : "");
            this.city = (res['data'][0]['user']['addresses'] ? res['data'][0]['user']['addresses'][0].city : ""),

            this.setLocalStorage(this.country, this.state, this.city)
            this.setUpFormForAddress();
            console.log(this.country, this.state, this.city, "school data11")
            this.pinCode = (res['data'][0]['user']['addresses'] ? res['data'][0]['user']['addresses'][0].pincode : ""),
            this.addressLineOne = (res['data'][0]['user']['addresses'] ? res['data'][0]['user']['addresses'][0].addressLineOne : ""),

            this.email = (res['data'][0]['user'] ? res['data'][0]['user'].email : "")
            this.password = (res['data'][0]['user'] ? res['data'][0]['user'].password : "")
            this.confirmPassword =(res['data'][0]['user'] ? res['data'][0]['user'].password : "")
            this.mobileNumber = (res['data'][0]['user'] ? res['data'][0]['user'].mobileNumber : "")
            this.isArchived = (res['data'][0]['user'] ? res['data'][0]['user'].isArchived : "")
            if (this.isArchived == true) {
              this.disableBtn = "Enable"
              this.btnClass = "enableBtn paddingAll"
            } else {
              this.disableBtn = "Disable"
              this.btnClass = "disableBtn paddingAll"
            }
            this.totalDrivers = res['totalDrivers'] ? res['totalDrivers'] : "0";

          } else {

          }
        }, err => {
        });

  }

  goBack() {
    this.removeLocalStorage();
    window.history.back();
  }


  filterDriver(id) {
    let item = this.driverList.filter(ob => ob._id == id)
    this.driver_detail = item[0];
    console.log(this.driver_detail, 'abc')
  }
  goToSchoolDriverPage() {

    let id = this.schooldriverDetailId;
    this.router.navigate(['school-driver-management', id]);
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
    this.stateList = this.states.filter(x => x.parent == this.country);


  }

  findCity() {
    this.city = "";
    this.cityList = this.cities.filter(x => x.parent == this.state);


  }




  schoolCreate() {
    this.details['token'] = this.admin_token;

    this.details['user'] = {
      userType: "PORTAL_USER",
      userRole: "SCHOOL_USER",
      email: this.email,
      mobileNumber: this.mobileNumber,
      password: this.password,
      facebookLink: "",
      InstagramLink: "",
      googleLink: "",
      twitterLink: "",

    }
    this.details['address'] = {
      addressOf: "SCHOOL_USER",
      name: this.name,
      addressLineOne: this.addressLineOne,
      addressLineTwo: this.addressLineTwo,
      city: this.city,
      state: this.state,
      pincode: this.pinCode,
      country: this.country,
      lat: this.lat,
      long: this.long,

    }

    this.details['bankDetail'] = {
      bankName: this.bankName,
      accountNumber: this.accountNumber,
      IFSCCode: this.IFSCCode,
      branchName: this.branchName,

    }

    let body = this.details;
    console.log(this.details)
    this.myservice
      .postCall('admin/schoolCreate', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success("School Created Successfully..!");
          this.myForm.resetForm();
          this.state = "";
          this.country = "";
          this.city = "";
          // this.router.navigate(['user-management'])
        } else {
          this.myservice.error("Email Id already exist..!");

        }
      }, err => {
      });

  }

  schoolUpdate() {

    this.details['token'] = this.admin_token;
    this.details['schoolId'] = this.id_school;
    this.details['user'] = {
      userType: "PORTAL_USER",
      userRole: "SCHOOL_USER",
      // email: this.email,
      mobileNumber: this.mobileNumber,
      // password: this.password,
      facebookLink: "",
      InstagramLink: "",
      googleLink: "",
      twitterLink: "",
      userId: this.userId,
      isArchived: this.isArchived
    }

    this.details['address'] = {
      addressOf: "SCHOOL_USER",
      name: this.name,
      addressLineOne: this.addressLineOne,
      addressLineTwo: this.addressLineTwo,
      city: this.city,
      state: this.state,
      pincode: this.pinCode,
      country: this.country,
      lat: this.lat,
      long: this.long,
      addressId: this.addressId

    }

    this.details['bankDetail'] = {
      bankName: this.bankName,
      accountNumber: this.accountNumber,
      IFSCCode: this.IFSCCode,
      branchName: this.branchName,
      bankDetailId: this.bankDetailId
    }
    let body = this.details;
    console.log(this.details)
    this.myservice
      .postCall('admin/schoolUpdate', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success(res['message']);
          this.setLocalStorage(this.country, this.state, this.city)
          // this.router.navigate(['user-management'])
        } else {
          this.myservice.error(res['message']);

        }
      }, err => {
      });
  }

  setLocalStorage(country, state, city) {
    localStorage.setItem('countryValue', country);
    localStorage.setItem('stateValue', state);
    localStorage.setItem('cityValue', city);

  }

  removeLocalStorage() {
    localStorage.removeItem('countryValue');
    localStorage.removeItem('stateValue');
    localStorage.removeItem('cityValue');
  }



  disableItem(name) {

    let action: string;
    if (name == "aprove") {
      action = "accept"
    } else {
      action = ""
    }
    let body = { schoolId: this.schooldriverDetailId, token: this.admin_token, }

    console.log(this.details)
    this.myservice
      .postCall('admin/enableDisableSchool', body)
      .subscribe(res => {
        if (res["status"]) {
          if (name == "aprove") {
            document.getElementById('approveBtn').style.display = 'none'

          } else {
            if (this.disableBtn == "Disable") {
              this.disableBtn = "Enable"
              this.btnClass = "enableBtn paddingAll"
            } else {
              this.disableBtn = "Disable"
              this.btnClass = "disableBtn paddingAll"
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
