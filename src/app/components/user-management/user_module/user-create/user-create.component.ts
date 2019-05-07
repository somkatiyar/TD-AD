import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { parseDate } from 'ngx-bootstrap';
import { NgForm } from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  
  @ViewChild('f') public myForm : NgForm;

  isUpdatePage: boolean = false;
  btnTitle: string = "Submit"
  userId: any;
  details: any = {	userType: "LEARNER",
	role:"APP_USER"};
  admin_token: any;
  isProfile: boolean = false;
  fileData: any = [];
  selectedImage: any;
  typeUser : any;
  imageUrl : any;
  dob : any = "";
  firstName: any;
  lastName: any;
  email: any;
  mobileNumber: any;
  drivingLicense: any;
  profilePictureUrl : any;
  isArchived : boolean = false;
  isChecked : any;
  isDisable : boolean;
  countries : any = [];
  countryList : any = [];
  country : any = "";
  countryCode : any;
  disableBtn : string ;
  approveBtn : string ;
  btnClass : string = "disablebtn";
  isAddPage : boolean = false;;
  constructor(private myservice: DataService,
    private varCtrl: VarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject('picUrl') private picUrl: string,
  ) {



    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Add User";

    this.userId = this.activatedRoute.snapshot.params['id'];
    this.typeUser = this.activatedRoute.snapshot.params['type'];


    if(!this.userId) {
      this.btnTitle = "Submit"
      this.details = "";
      this.isAddPage = true;
     
      this.details = {	userType: "LEARNER", 
      role:"APP_USER", };
    }
    else {
      this.btnTitle = "Update"
      this.varCtrl.title = "Update User"
      this.isUpdatePage = true;
      this.isAddPage = false;
   
      console.log(this.isUpdatePage,"updateeeee")
    }

  }

  ngOnInit() {
    let countries = localStorage.getItem('countries');
    this.countries = JSON.parse(countries);
    this.countryList = this.countries;
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    if (this.admin_token) {
       this.singleUserDetail();
    }
   
  }

  findCountryCode() {
    let x = this.countryList.filter(ob => ob.value == this.country)
 
    this.countryCode = x[0].countryCode;
    console.log(this.countryCode,"country code")

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
      if (data["status"]) {
        console.log(data);

      }
    });

  }


  addProfilePicture(event, docType) {
    var reader = new FileReader();
    this.isProfile = true;
    reader.onload = (e => {
      var src : any;
     src = reader.result;
      this.selectedImage = src;
      var data = src.split(',')[1];
      this.fileData.push({ "data": data, "documentType": docType, "resourceType": "IMAGE" });
      console.log(this.fileData)
    });
    reader.readAsDataURL(event.target.files[0]);
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
  if(!this.userId) {
 
    this.learnerCreate();

  }
  else {
;
    this.lernerUpdate();

  }
}

errorHandler(e){
  console.log("event error img", e);
  e.target.src = "assets/images/userPlaceholder.png";
}

disableUser(event) {
  if (event.target.checked) {
    this.isArchived = true;

  } else {
    this.isArchived = false;

  }
}


singleUserDetail() {
  let body = { _id: this.userId, token: this.admin_token, type: this.typeUser }
  if (this.userId && this.admin_token)
  this.myservice
  .postCall('admin/userById', body)
  .subscribe(res => {
    if (res["status"] ) {
      

      this.details = (res['data'] );
      this.profilePictureUrl = (res['data'] ? res['data'].profilePictureUrl : " ");
        let x =(res['data'] ? res['data'].dob : " ");

        //this.dob =(this.datePipe.transform(x, 'yyyy/MM/dd')); //whatever format you need. 
        this.dob = new Date(x);
        console.log(x,'x value',this.dob,'dob value');
        this.firstName = (res['data'] ? res['data'].firstName : " ");
     
        this.lastName =(res['data'] ? res['data'].lastName : " ");
        this.mobileNumber =(res['data'] ? res['data'].mobileNumber : " ");
        this.drivingLicense =(res['data'] ? res['data'].drivingLicense : " "),
        this.email = (res['data'] ? res['data'].email : " ");
        this.isArchived = (res['data'] ? res['data'].isArchived : "");
        if(this.isArchived ==true) {
          this.disableBtn = "Enable"
          this.btnClass = "enableBtn"
        } else{
          this.disableBtn = "Disable"
          this.btnClass = "disableBtn"
        }
         this.countryCode = (res['data'] ? res['data'].countryCode : " ");
         console.log(this.countryCode,'code');
         
         if(this.countryCode) {
     
           let x = this.countryList.filter(ob =>ob.countryCode == this.countryCode)
          this.country = x[0].value;
           console.log(x);
         }
      

    } else {
     
    }
  }, err => {
  });

}



  learnerCreate() {
    this.details['userType'] = "LEARNER";
    this.details['token'] = this.admin_token;
    this.details['role'] = "APP_USER";
    this.details['countryCode'] = this.countryCode;
    let body = this.details;
      this.myservice
        .postCall('admin/learnerCreate', body)
        .subscribe(res => {
          if (res["status"] ) {
            localStorage.setItem('lurnrDetail', JSON.stringify(res['data']));
            this.myservice.success("Lurnr Create Successfully..!");
           
            this.myForm.resetForm();
            this.country = "";
    
          } else {
            this.myservice.error("Email Id already Exist..!");
  
          }
        }, err => {
        });
  }
  
  lernerUpdate() {
    this.details['isArchived'] = this.isArchived;
    this.details['token'] = this.admin_token;
    this.details['_id'] = this.userId;
    this.details['countryCode'] = this.countryCode;

    let body = this.details;
    console.log(this.details);
        this.myservice
          .postCall('admin/learnerUpdate', body)
          .subscribe(res => {
            if (res["status"] ) {
              this.myservice.success("Lurnr Update Successfully..!");
              if(this.isProfile) {
                this.uploadProfile();
              }
            
 
            } else {
              this.myservice.error("Lurnr not Updated.!");
          
    
            }
          }, err => {
          });
  }



  disableItem(name) {

    let action : string;
     if(name=="aprove") {
       action = "accept"
     }else{
        action  = ""
     }
     let body = { driverId: this.userId, token: this.admin_token, action: action}
 
     console.log(this.details)
     this.myservice
       .postCall('admin/acceptDisableUsers', body)
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



}
