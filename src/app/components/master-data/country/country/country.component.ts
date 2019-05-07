import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  countryList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  countryId: any;
  value : any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any;
  total : Number;
  countryCode : any;
  currentIndexToUpdate = 0;
  labelName : any;
  noData : boolean = false;
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private router: Router,
    private orderPipe: OrderPipe,
    private activatedRoute: ActivatedRoute,
    @Inject('picUrl') private picUrl: string,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Country Management"

  }

  ngOnInit() {
     new Back()
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getCountryList()
    }
  }

  
  paginationForCountries(ev) {
    //console.log(ev);
    this.p = ev;
    this.getCountryList(ev-1);
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
          this.countryList = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          this.countryCode = (res['data'] ? res['data'].countryCode : "NA");
          console.log(this.countryCode,'country list')
        } else {
          this.noData = true;
        }
      }, err => {
      });
  }


goToAddSection() {
  this.noData = false;
  this.addPage = true;
  this.updatePage = false;
  this.pageHeader = "Add Country"
  this.myForm.reset();
}


setUpdatedValue() {

  this.countryList[this.currentIndexToUpdate].name  = this.details.name;
  this.countryList[this.currentIndexToUpdate].description = this.details.description; 
  this.countryList[this.currentIndexToUpdate].isArchived = this.details.isArchived;  
  this.countryList[this.currentIndexToUpdate].parent = this.details.parent; 

  this.name = this.details.name;
  this.description = this.details.description;
  this.isArchived = this.details.isArchived;
  this.value = this.details.value;


}

goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;
  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Country"

  this.details['token'] = this.admin_token;
  this.details['countryId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/countriesById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'] ? res['data'].name : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.countryId = (res['data'] ? res['data']._id : "NA")
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          this.value = (res['data'] ? res['data'].value : "NA");
          this.countryCode = (res['data'] ? res['data'].countryCode : "NA");
          console.log(this.countryCode,'country code');
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.name,this.description,this.countryId)
        } else {

        }
      }, err => {
      });


 
 }


 disableUser(event) {
  if (event.target.checked) {
    this.isArchived = true;
 
  } else {
    this.isArchived = false;

  }
}


onSubmit() {
 if(this.addPage) {
   this.countryAdd();
 } else {
   this.countryUpdate();
 }
 
}



countryAdd() {
this.details = {
  name: this.name,
  description : this.description,
  // value : this.value,
  token : this.admin_token,
  countryCode : this.countryCode
}
  let body = this.details;
  this.myservice
    .postCall('master/addCountries', body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
        this.myForm.resetForm();
        // this.router.navigate(['master']);
      } else {
        this.myservice.error(res['message'])
      }
    }, err => {
    });
}



countryUpdate() {
 
  this.details = {
    name: this.name,
    countryCode : this.countryCode,
    description : this.description,
    // value: this.value,
    token : this.admin_token,
    countryId : this.countryId,
    isArchived : this.isArchived
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateCountries", body)
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

  if(item.isArchived == true) {
    return "enableBtn";
  }
  return "disableBtn";
  }

  isVerified(item) {

    if(item.isArchived == true) {
      return "Enable";
    }
    return "Disable";
    }

disableItem(name,item) {
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "countries"}

  console.log(this.details)
  this.myservice
    .postCall('admin/enableDisableMaster', body)
    .subscribe(res => {
      if (res["status"]) {
     
       
         this.myservice.success(res['message'])
         if(item.isArchived){
     
           item.isArchived = false;
           this.labelName="Enabled"
         } else {
         
          item.isArchived = true;
          this.labelName="Disabled"
         }
       
         var x = [];
         x = this.countryList;
         this.countryList = [];
         this.countryList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}






}
