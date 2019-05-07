import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { DataService } from '../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../service/var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, NgForm } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { MouseEvent } from '@agm/core';
declare var google: any;

@Component({
  selector: 'app-add-test-center',
  templateUrl: './add-test-center.component.html',
  styleUrls: ['./add-test-center.component.css']
})


export class AddTestCenterComponent implements OnInit {

  @ViewChild("search")
  public searchElementRef: any = ElementRef;

  @ViewChild('f') public myForm : NgForm;

  isUpdatePage : boolean = false;
  AddressLineOne: any;
  country: any = "";
  state: any = "";
  city: any = "";
  // lat: any = "";
  // long: any = "";
  details: any = {};
  countries: any = [];
  countryList: any = [];
  states: any = [];
  cities: any = [];
  stateList: any = [];
  cityList: any = [];
  testCenterId: any;
  btnTitle: string = "Submit"
  admin_token: any;
  pincode: any;
  addressId: any;
  Test_center_name: any;
  fromTime: any = "";
  toTime: any = "";
  totalTime: string = this.fromTime + "To" + this.toTime;

  contactNumber: any;
  email: any;
  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  isArchived: boolean = false;
  isChecked: any;
  temp : any =[];
  countryCode: any = "";
  disableBtn : string ;
  approveBtn : string ;
  countryName: any;
  btnClass : string = "disablebtn";
  styles = [
    {
      "featureType": "administrative",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#444444"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#378b90"
        }
      ]
    },
    {
      "featureType": "administrative.neighborhood",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#31b9c1"
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "all",
      "stylers": [
        {
          "color": "#f2f2f2"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "all",
      "stylers": [
        {
          "saturation": -100
        },
        {
          "lightness": 45
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "simplified"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "all",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "all",
      "stylers": [
        {
          "color": "#46bcec"
        },
        {
          "visibility": "on"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#31b9c1"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#31b9c1"
        }
      ]
    }
  ];


  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {


    this.getCountryList();
    this.getStateList();
    this.getCityList();


    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Add Test Center";


    this.testCenterId = this.activatedRoute.snapshot.params['id'];

    if (!this.testCenterId) {
      this.btnTitle = "Submit"
    }
    else {
      
      this.btnTitle = "Update "
      this.varCtrl.title = "Update Test Center"
      this.isUpdatePage = true;
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


  async GetLocation(event) {

    return new Promise((resolve, reject) => {

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ 'address': this.AddressLineOne }, (results, status) => {
        if (status == google.maps.GeocoderStatus.OK) {
          this.latitude = results[0].geometry.location.lat();
          this.longitude = results[0].geometry.location.lng();
          console.log(this.latitude, this.longitude, "lat long11")

          resolve()
        } else {
          this.latitude = 0.0;
          this.longitude = 0.0;
          resolve()
        }
      });

    })

  };


  mapInit() {
    let countryName;
    if(this.countryName =="United Kingdom") {
      countryName = 'us'
    }else if(this.countryName =="india") {
      countryName = 'in'
    }
    console.log(countryName,'hhh')
    this.zoom = 10;
    this.latitude = Number(this.latitude) ? Number(this.latitude) : 28.5355;
    this.longitude = Number(this.longitude) ? Number(this.longitude) : 77.3910;

    this.searchControl = new FormControl();

  
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.setComponentRestrictions(
      
        {'country': [countryName]});
   
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
        
          let place: any = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }


          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          console.log(this.latitude, this.longitude, 'hhhh')
          this.zoom = 12;
        });
      });
    });
  }

  // private setCurrentPosition() {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }


 async getAddressFromLatLong(latitude,longitude) {
  return new Promise((resolve, reject) => {
    var reverseGeocoder = new google.maps.Geocoder();
    var currentPosition = new google.maps.LatLng(this.latitude, this.longitude);
    reverseGeocoder.geocode({'latLng': currentPosition}, function(results, status) {
  
            if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                    // alert('Address : ' + results[0].formatted_address + ',' + 'Type : ' + results[0].types);
                    alert( results[0].formatted_address );
               
                    let address : any;
                    address = results[0].formatted_address
                    if(address) {
                     
                      var data = {"address":address};
                      
                      resolve(data);
                      console.log(address,'line one')
                    }
                 
  
                  }
            else {
           
                   alert('Unable to detect your address.');
                   reject();
                    }
        } else {
            alert('Unable to detect your address.');
        }
    });
  })

}


async mapClicked($event: MouseEvent) {

   this.latitude = $event.coords.lat;
   this.longitude = $event.coords.lng;
   console.log(this.latitude,this.longitude)
   let data = await this.getAddressFromLatLong(this.latitude , this.longitude);
   this.AddressLineOne = data["address"]
    
  }


  async  ngOnInit() {


    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if (this.admin_token && this.testCenterId) {

      this.testCenterById().then(() => {
        this.mapInit();
      })

    } else {
      this.mapInit();
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















  async testCenterById() {
    return new Promise((resolve, reject) => {
      let body = { testCenterId: this.testCenterId, token: this.admin_token }
      if (this.testCenterId && this.admin_token)
        this.myservice
          .postCall('master/testCenterById', body)
          .subscribe(res => {
            if (res["status"]) {
              this.details = res['data']

              this.isArchived = (res['data'][0] ? res['data'][0].isArchived : "");
              if(this.isArchived ==true) {
                this.disableBtn = "Enable"
                this.btnClass = "enableBtn"
              } else{
                this.disableBtn = "Disable"
                this.btnClass = "disableBtn"
              }
              this.Test_center_name = (res['data'][0] ? res['data'][0].name : "");

           
          
              this.email = (res['data'][0] ? res['data'][0].email : "");
            
                this.AddressLineOne = (res['data'][0] ? res['data'][0]['addressId'].addressLineOne : "");
              console.log(this.AddressLineOne, 'address line one')
              this.country = (res['data'][0] ? res['data'][0]['addressId'].country : "");


              // if (this.country) {
              //   this.findState();
              // }
              this.state = (res['data'][0] ? res['data'][0]['addressId'].state : "");
              // if (this.state) {
               
              //   this.findCity();
              // }
              console.log(this.state,'state ')
              console.log(this.city,' city')
              this.city = (res['data'][0] ? res['data'][0]['addressId'].city : "");

              this.setUpFormForAddress();

              let contactNum = (res['data'][0] ? res['data'][0].contactNumber : "");
              this.countryCode = contactNum.split(" ")[0];
              this.contactNumber = contactNum.split(" ")[1];

              // alert(this.city)
              this.pincode = (res['data'][0] ? res['data'][0]['addressId'].pincode : "");
              console.log(this.pincode)
              this.addressId = (res['data'][0] ? res['data'][0]['addressId']._id : "");
              let timing = (res['data'][0] ? res['data'][0].timing : "");
              console.log(timing, 'jjajaj')
              if (timing && timing.length > 0) {

                this.fromTime = timing.split("To")[0];
                this.toTime = timing.split("To")[1];
              }

            } else {

            }
            this.latitude = (res['data'][0] ? res['data'][0]['addressId'].lat : "");
            this.longitude = (res['data'][0] ? res['data'][0]['addressId'].long : "");
            console.log(this.latitude, this.longitude, 'from func')
            resolve();
          }, err => {
          });
    });
  }

setUpFormForAddress() {
  this.stateList= this.states.filter(x => x.parent == this.country);
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
    this.countryName = x[0].name;
    this.stateList = this.states.filter(x => x.parent == this.country);


  }

  findCity() {
    this.city = "";
   this.cityList = this.cities.filter(x => x.parent == this.state);


  }

  disableUser(event) {
    if (event.target.checked) {
      this.isArchived = true;

    } else {
      this.isArchived = false;

    }
  }

  async register() {

    try {

      let data = await this.GetLocation(event);
      if (!this.testCenterId ) {
        this.addTestCenter();
      }
      else {
        this.updateTestCenter();
      }
    } catch (error) {
      console.log(error);

    }

    // this.GetLocation().then( () => {
    //   if (!this.testCenterId && this.lat && this.long) {
    //     this.addTestCenter();
    //   }
    //   else {
    //     this.updateTestCenter();
    //   }
    // })   
    // .catch ( e => {
    //   console.log(e);

    // })


  }




  addTestCenter() {

    this.details['token'] = this.admin_token;

    this.details['testCenterName'] = this.Test_center_name;
    this.details['contactNumber'] = this.countryCode + " " + this.contactNumber;
    this.details['email'] = this.email;
    if (this.fromTime && this.toTime) {
      this.details['timing'] = this.fromTime + "To" + this.toTime;
    }
    this.details['testType'] = "Learner";
    this.details['address'] = {
      city: this.city,
      state: this.state,
      country: this.country,
      lat: this.latitude,
      long: this.longitude,
      addressLineOne: this.AddressLineOne,
      pincode: this.pincode,
      addressOf: "MASTER_DATA",
      countryCode : this.countryCode



    }
    let body = this.details;
    this.myservice
      .postCall('master/addTestCenter', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success("Test Center Added Succesfully..!")
        this.myForm.resetForm();
        this.state = "";
        this.country = "";
        this.city = "";
          // this.router.navigate(['test-center-management']);
        } else {
          this.myservice.error("Test Center Not Added..!")
        }
      }, err => {
      });
  }

  updateTestCenter() {
    this.details = {};
    if (this.fromTime && this.toTime) {
      this.details['timing'] = this.fromTime + "To" + this.toTime;
    }
    this.details['testCenterId'] = this.testCenterId;
    this.details['testCenterName'] = this.Test_center_name
    this.details['contactNumber'] = this.countryCode + " " + this.contactNumber;
    this.details['email'] = this.email;
    this.details['testType'] = "Learner";
    this.details['token'] = this.admin_token;
    this.details['isArchived'] = this.isArchived;
    this.details['address'] = {
      city: this.city,
      state: this.state,
      country: this.country,
      lat: this.latitude,
      long: this.longitude,
      pincode: this.pincode,
      addressLineOne: this.AddressLineOne,
      addressId: this.addressId,
      addressOf: "MASTER_DATA",

    }

    let body = this.details;
    console.log(body, 'dhjk')
    this.myservice
      .postCall('master/updateTestCenter', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success("Test Center Updated Succesfully..!")
        } else {
          this.myservice.error("Test Center Not Update..!")
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





  disableItem(name) {

    let action : string;
     if(name=="aprove") {
       action = "accept"
     }else{
        action  = ""
     }
     let body = {  docId: this.testCenterId, token: this.admin_token,"master": "testcenters"}
 
     console.log(this.details)
     this.myservice
       .postCall('admin/enableDisableMaster', body)
       .subscribe(res => {
         if (res["status"]) {
           if(name=="aprove") {
             document.getElementById('approveBtn').style.display = 'none'
 
           } else {
             if(this.disableBtn =="Disable") {
               this.disableBtn = "Enable"
               this.btnClass = "enableBtn"
             }else{
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
