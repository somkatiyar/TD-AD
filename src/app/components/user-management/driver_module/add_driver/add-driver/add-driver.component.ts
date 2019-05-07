import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { DataService } from '../../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../../service/var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-driver',
  templateUrl: './add-driver.component.html',
  styleUrls: ['./add-driver.component.css']
})
export class AddDriverComponent implements OnInit {
  @ViewChild('f') public myForm: NgForm;


  confirmPassword: any;
  stateName:any;
  countryName: any;
  cityName: any;
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
  action: any;
  details: any = {

  };
  gearTyps: any = []
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
  showDropDown: boolean = false;
  schoolList: any = [];
  schoolId: any = "";
  typeUser: any;
  imageUrl: any;
  image: any;
  documents: any[] = [];

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
  isVerified: boolean = false;
  verifiedFlag: any;
  notVerifiedFlag: any;
  txtSearch: any;
  isSearching: boolean = false;
  isProfileChange: boolean = false;
  temp: any = [];

  show: any;
  // isLoading : boolean = false;
  disableBtn: string;
  approveBtn: string;
  btnClass: string = "disablebtn";

  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    @Inject('picUrl') public picUrl: string,
  ) {

    this.imageUrl = "assets/images/userPlaceholder.png";
    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Add Driver";

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
        this.schoolId = this.userId;


        this.userId = "";
        this.btnTitle = "Submit"


      }
      else {
        if (this.userId && this.typeUser == "driver") {
        this.btnTitle = "Update"
        this.varCtrl.title = "Update Driver"
        this.isAddPage = false;
        this.companions = this.details['companions'];
      }
    }




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

  searchName(inputName, currentPageCliked = 0) {

    this.schoolList = [];
    this.isSearching = true;
    this.getSchoolList();
  }


  paginationForSchool(ev) {

    this.p = ev;
    if (this.txtSearch == "" || this.txtSearch == undefined) {

      this.getSchoolList(ev - 1);
    } else {


      this.searchName(this.txtSearch, ev - 1);
    }

  }




  ngOnInit() {

    this.vehicleTypes();
    this.gearTypes();
    this.getCountryList();
    this.getStateList();
    this.getCityList();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    if (this.admin_token) {
      this.singleUserDetail();
    }
    console.log(this.admin_token, 'token');

    this.getSchoolList();
 
    if ( !localStorage.getItem('countryValue') &&
    !localStorage.getItem('stateValue') &&
    !localStorage.getItem('cityvalue')) {

      this.showDropDown = true;
    
   }



  }


  // setSchoolAddress() {

  //   if ((this.typeUser)) {

  //     this.country = localStorage.getItem('countryValue');
  //     this.state = localStorage.getItem('stateValue');
  //     this.city = localStorage.getItem('cityvalue');

  //   }
  // }

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
          if(this.typeUser && localStorage.getItem('stateValue')) {
            
            let x = this.states.filter(ob=>ob.value == localStorage.getItem('stateValue'))
            
            this.stateName = x[0].name;
            this.state = x[0].value;
            console.log(this.stateName,'lko')
            }
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

          if(this.typeUser && localStorage.getItem('countryValue')) {
            
            let x = this.countries.filter(ob=>ob.value == localStorage.getItem('countryValue'))
            
            this.countryName = x[0].name;
            this.country = x[0].value;
            }

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


          if(this.typeUser && localStorage.getItem('cityValue')) {
            
            let x = this.cities.filter(ob=>ob.value == localStorage.getItem('cityValue'))
            
            this.cityName = x[0].name;
            this.city = x[0].value;
          
            }
        } else {

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



  getSchoolList(currentPageCliked = 0) {


    let body = {
      'token': this.admin_token,
      'page': currentPageCliked,
      'keyword': this.txtSearch,

      'isSearching': this.isSearching
    }


    this.myservice

      .postCall('admin/schools', body)
      .subscribe(res => {
        if (res["status"]) {
          this.schoolList = res['data'];
          this.total = res.totalPages;
        } else {
        }
      }, err => {
      });
  }

  errorHandler(e) {
    console.log("event error img", e);
    e.target.src = "assets/images/userPlaceholder.png";
  }


  // dropDown(event) {
  //   if (event.target.checked) {
  //     this.varCtrl.title = "Add School Driver"
  //     this.showDropDown = true;
  //   }
  //   else {
  //     this.showDropDown = false;
  //     this.varCtrl.title = "Add Driver"


  //   }

  // }


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



  register() {
    if (!this.userId) {
      this.btnTitle == "Register"
    }
    else {
      this.btnTitle = "Update"
    }
  }
  goBack() {
    localStorage.getItem('countryValue') 
    localStorage.getItem('stateValue') 
    localStorage.getItem('cityvalue')
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
            this.countryCode = (res['data'].countryCode ? res['data'].countryCode : "");
            this.lastName = (res['data'].lastName ? res['data'].lastName : "");
            console.log(this.firstName, this.lastName, 'singler user data');
            this.email = (res['data'].email ? res['data'].email : "");
            this.mobileNumber = (res['data'].mobileNumber ? res['data'].mobileNumber : "");
            this.password = (res['data'].password ? res['data'].password : "");
            this.confirmPassword =(res['data'].password ? res['data'].password : "");
            this.country = (res['data']['addresses'][0] ? res['data']['addresses'][0].country : "");
            this.state = (res['data']['addresses'][0] ? res['data']['addresses'][0].state : "");
            this.city = (res['data']['addresses'][0] ? res['data']['addresses'][0].city : "");
    
            this.setUpFormForAddress()
          
            this.pincode = (res['data']['addresses'][0] ? res['data']['addresses'][0].pincode : "");
            this.addressLineOne = (res['data']['addresses'][0] ? res['data']['addresses'][0].addressLineOne : "");;
            this.addressId = (res['data']["addresses"][0] ? res['data']["addresses"][0]._id : "")

            this.companions = (res['data']['companions'] ? res['data']['companions'] : "")
            this.registrationNumber = (res['data']['carInfo'] ? res['data']['carInfo'].registrationNumber : "");
            this.chassisNumber = (res['data']['carInfo'] ? res['data']['carInfo'].chassisNumber : "");
            this.vehicleTypeId = (res['data']['carInfo'] ? res['data']['carInfo'].vehicleTypeId : "");
            this.isArchived = (res['data'] ? res['data'].isArchived : "");
            console.log(this.isArchived);

            if (this.isArchived == true) {
              this.disableBtn = "Enable"
              this.btnClass = "enableBtn"
            } else {
              this.disableBtn = "Disable"
              this.btnClass = "disableBtn"
            }


            this.adiOrPdiBadgeNumber = res['data'] ? res['data'].adiOrPdiBadgeNumber : "";
            this.drivingLicense = res['data'] ? res['data'].drivingLicense : "";
            this.carInfoId = res['data'] ? res['data'].carInfo._id : "";
            this.isAutomatic = (res['data']['carInfo'] ? res['data']['carInfo'].gearType : "");
            this.profilePictureUrl = (res['data'].profilePictureUrl ? res['data'].profilePictureUrl : "")
            console.log(this.profilePictureUrl, "this.profilre");


            if (res && res['data'] && res['data']['documents'] && res['data']['documents'].length) {
              let documents = res['data']['documents'];
              for (let i = 0; i < documents.length; i++) {
                let docData = "";


                if (res['data']['documents'][i].isVerified == 0 || res['data']['documents'][i].isVerified == 2) {
                  this.notVerifiedFlag = "checked"
                  this.approveBtn = "Accept"


                } else {
                  this.verifiedFlag = "checked";
                  document.getElementById("approveBtn").style.display = "none";
                }


                this.toDataUrl(this.picUrl + documents[i]['value'], (myBase64: any) => {
                  // console.log(myBase64,'database64'); // myBase64 is the base64 string
                  docData = myBase64;
                  docData = myBase64.split(',')[1];

                  this.documents.push({
                    "data": docData,
                    "documentType": documents[i]['documentType']['name'],
                    "resourceType": "IMAGE",
                    "view": this.picUrl + documents[i]['value']
                  });

                });

              }
            }


          } else {
            this.myservice.error("data not found");
          }
        }, err => {
        });

  }



  toDataUrl(url, callback) {

    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader: any;
      reader = new FileReader();
      reader.onloadend = function () {
        reader.result.split
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }





  uploadFile() {
    let formData = new FormData();
    formData.append('id', this.userId);
    formData.append('fileType', "DRIVER_DOCS");

    let files = {
      data: this.documents
    }
    console.log(this.fileData, 'mnb');
    formData.append("files", JSON.stringify(files));
    this.myservice.upload(formData).subscribe((data) => {
      if (data["status"]) {
        console.log(data);

      } else {

      }
    });

  }


  uploadProfile() {


    let formData = new FormData();
    formData.append('id', this.userId);
    formData.append('fileType', "PROFILE_PICTURE");
    let files = {
      data: this.fileData
    }

    formData.append("files", JSON.stringify(files));

    this.myservice.upload(formData).subscribe((data) => {
      if (data["status"] || !data["status"]) {
        console.log(data);


      } else {

      }
    });

  }



  addProfilePicture(event, docType) {
    var reader = new FileReader();

    this.isProfile = true;

    reader.onload = (e => {
      this.isProfileChange = true;
      var src: any;
      src = reader.result;
      this.image = src;
      var data = src.split(',')[1];

      this.fileData.push({
        "data": [{
          "data": data, "documentType": "",
          "fileType": "PROFILE_PICTURE",
          "resourceType": "IMAGE"
        }]
      })
      //console.log(this.fileData[0]["data"][0]);
    });
    reader.readAsDataURL(event.target.files[0]);
  }



  addDocument(event, docType) {

    var reader: any;
    reader = new FileReader();
    reader.onload = (e => {

      var data = reader.result.split(',')[1];
      let index = this.documents.findIndex(el => el.documentType == docType);
      console.log(index, docType, 'count')
      if (index > -1) {

        this.documents[index]['data'] = data;
        this.documents[index]['name'] = event.target.files[0].name;
        this.documents[index]['view'] = reader.result;
        console.log("i");
      } else {
        this.documents.push({
          "data": data,
          "documentType": docType,
          "fileType": "DRIVER_DOCS",
          "resourceType": "IMAGE",
          "name": event.target.files[0].name,
          "view": reader.result
        });
        console.log("j");
      }
      // console.log(this.documents, 'all docs');

    });
    reader.readAsDataURL(event.target.files[0]);
  }

  getImagepath(event) {
    this.imagePath = event;
  }

  removeDocument(docType) {
    let index = this.documents.findIndex(el => el.documentType == docType);
    if (index > -1) {
      this.documents.splice(index, 1);
    }
  }


  removeSchool() {
    this.showDropDown = true;
    this.country = "";
    this.state = "";
    this.city = "";
    this.showSchoolName = "";
  }

  getSchoolNameplaceHolder(item,name, id) {
 

    this.showDropDown = false;
    let x = JSON.parse(item['user']['addresses'][0]['country']);
    let y = JSON.parse(item['user']['addresses'][0]['state']);
    let z = JSON.parse(item['user']['addresses'][0]['city']);
    console.log(item,'item')

    this.countryName = x[0].name;
    this.country = x[0].value;

    this.stateName = y[0].name;
    this.state = y[0].value;

    this.cityName = z[0].name;
    this.city = z[0].value;


    this.schoolId = id;
    this.showSchoolName = name;


  }



  vehicleTypes() {
    let body = {};
    console.log(this.details)
    this.myservice
      .postCall('common/vehicleTypes', body)
      .subscribe(res => {
        if (res["status"]) {
         
            this.vTypes = res['data']
          
          console.log(res['data'], 'vehicle type data');

        } else {
          console.log("user inserted");

        }
      }, err => {
      });
  }



  gearTypes() {
    let body = {};
    console.log(this.details)
    this.myservice
      .postCall('common/gearTypes', body)
      .subscribe(res => {
        if (res["status"]) {
          this.gearTyps = res['data'];

        } else {
          console.log('data not found')
        }
      }, err => {
      });
  }




  searchCompanions(txt) {
    if (!this.userId) {
      this.userId = "";
    }
    let body = { searchText: txt, driverId: this.userId };
    this.myservice
      .postCall('common/companions', body)
      .subscribe(res => {
        if (res["status"]) {
          this.final = res['data'];
        } else {

        }
      }, err => {
      });
  }

  addBuddies(id) {

    if (this.companions.length < 5) {
      this.buddyData = this.final.find(item => item._id === id);
      console.log(this.buddyData)
      if (this.companions.find(item => item._id === id)) {
        this.myservice.error("Buddy already added");
      }
      else {
        this.companions.push(this.buddyData);
        this.myservice.success('Buddy Added Succesfully')
        console.log(this.companions, 'buddydata');
      }

    } else {
      this.myservice.error("You can choose ony 5 buddy");
    }
  }

  removeBuddies(id) {
    let index = this.companions.findIndex(x => x._id == id);
    if (index > -1) {
      this.companions.splice(index, 1);
      console.log(this.companions, 'mm');
    }
    this.myservice.success('Buddy Removed Successfully')
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




    console.log("DRIVING_LICENSE", this.documents.findIndex(el => el.documentType == 'DRIVING_LICENSE'));
    console.log("BADGE_NUMBER", this.documents.findIndex(el => el.documentType == 'BADGE_NUMBER'))
    let isProfile = ((this.fileData && this.fileData.length && this.fileData.findIndex(el => el.documentType == 'PROFILE_PICTURE') > -1) ? true : false);
    let isDocDriverLicence = ((this.documents && this.documents.length && this.documents.findIndex(el => el.documentType == 'DRIVING_LICENSE') > -1) ? true : false);
    let isDocBadgeNumber = ((this.documents && this.documents.length && this.documents.findIndex(el => el.documentType == 'BADGE_NUMBER') > -1) ? true : false);
    let isBuddies = ((this.companions && this.companions.length) ? true : false);

    //this.fileData.push(this.documents);

    if (this.userId && this.profilePictureUrl.length > 0) {
      isProfile = this.profilePictureUrl

    }
    if ((!this.isProfileChange && !this.userId)) {
      this.myservice.error("Please choose a profile picture!");
    } else if (!isDocBadgeNumber) {
      this.myservice.error("Please Upload badge document!");
    } else if (!isDocDriverLicence) {
      this.myservice.error("Please Upload drivering licence !");
    } else {


      if (!this.userId) {
        // this.documents.forEach((x)=>{
        //   this.fileData.push(x);
        // })
        this.driverCreate();
      } else {
        if (!this.profilePictureUrl) {
          this.fileData.push({ "data": [] });
        }
        this.driverUpdate();
      }
    }


  }



  driverCreate() {
    this.details = {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      countryCode: this.countryCode,
      password: this.password,
      adiOrPdiBadgeNumber: this.adiOrPdiBadgeNumber,
      drivingLicense: this.drivingLicense,
      mobileNumber: this.mobileNumber,

      userType: "DRIVER",
      useRole: "APP_USER",
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
    this.details['companions'] = this.companions;

    this.details['carInfo'] = {
      registrationNumber: this.registrationNumber,
      chassisNumber: this.chassisNumber,
      vehicleTypeId: this.vehicleTypeId,
      gearType: this.isAutomatic
    }

    var d = {
      "data": { "data": this.fileData[0]["data"][0]["data"] }, "documentType": "",
      "fileType": "PROFILE_PICTURE",
      "resourceType": "IMAGE"
    }
    this.details['files'] = {
      data: [d, this.documents[0], this.documents[1]]
    }

    let endpoint = "";
    if (this.schoolId && this.schoolId.length > 0) {
      endpoint = "common/driverCreateNew"
      this.details['schoolId'] = this.schoolId;

    } else {
      endpoint = "common/driverCreateNew"
    }

    let body = this.details;
    console.log(this.details, 'detailed body')
    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {



        if (res["status"]) {


          this.userId = res['data'].driverId;
          this.myservice.success(res['message']);
          this.resetForm();
          this.removeLocalStorage();
          // this.isAutomatic = "";
          // this.vehicleTypeId = "";
          // this.image = null;
          // this.documents = [];
          // this.companions = [];
          // this.showSchoolName = "";
          setTimeout(()=>{
            window.location.reload()
          }, 1000);
        } else {
          this.myservice.error(res['message']);

        }
      }, err => {
      });


  }

  removeLocalStorage() {
   localStorage.getItem('countryValue') 
    localStorage.getItem('stateValue') 
    localStorage.getItem('cityvalue')
  }
  resetForm() {

    if(this.showSchoolName) {
 
    this.myForm.resetForm({
   
      cityName: this.cityName,
      stateName: this.stateName,
      countryName: this.countryName

    }); 
  } else{
 
    this.myForm.resetForm({
   
    city:"",
    country:"",
    state:""

    });
  }

  }


  driverUpdate() {
    console.log(this.details, "details data")
    console.log(this.admin_token, this.userId, "details data")
    this.details = {
      token: this.admin_token,

      driverId: this.userId,
      firstName: this.firstName,

      lastName: this.lastName,
      // email: this.email,
      password: this.password,
      adiOrPdiBadgeNumber: this.adiOrPdiBadgeNumber,
      isArchived: this.isArchived,
      userType: "DRIVER",
      userRole: "APP_USER",
      drivingLicense: this.drivingLicense,
      mobileNumber: this.mobileNumber,
      isVerified: this.isVerified,
      countryCode: this.countryCode
    }

    this.details['address'] = {
      addressId: this.addressId,

      city: this.city,
      state: this.state,
      pincode: this.pincode,
      country: this.country,
      addressLineOne: this.addressLineOne,
      addressOf: "APP_DRIVER"
    },
      this.details['companions'] = this.companions;
    console.log(this.companions, 'campanion in')


    this.details['carInfo'] = {
      carInfoId: this.carInfoId,
      registrationNumber: this.registrationNumber,
      chassisNumber: this.chassisNumber,
      vehicleTypeId: this.vehicleTypeId,
      gearType: this.isAutomatic


    }


    if (this.isProfileChange) {
      this.details['files'] = {
        data: this.fileData[0]["data"]
      }
    } else {
      this.details['files'] = {
        data: new Array()
      }
    }



    let body = this.details;
    console.log(this.details, 'outcome')
    this.myservice
      .postCall("common/driverUpdate", body)
      .subscribe(res => {
        if (res["status"]) {


          console.log("user inserted");
          this.driverId = res['driverId']


          this.myservice.success(res['message']);



        } else {
          this.myservice.error(res['message']);

        }
      }, err => {
      });


  }





}