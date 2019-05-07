import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent implements OnInit {

  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  taxList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  taxId: any;
  countries: any = [];
  countryList: any = [];
  country : any = "";
  taxFor : any;
  taxPercentage : any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any
  total : any;
  currentIndexToUpdate = 0;
  labelName : any;
  noData: boolean = false;
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
    this.varCtrl.title = "Tax Management"

  }

  ngOnInit() {
  
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    this.getCountryList();
    if(this.admin_token && this.admin_token.length > 0) {
      this.getTaxList()
    }


    // let countries = localStorage.getItem('countries');
    // this.countries = JSON.parse(countries);
    // this.countryList = this.countries;

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

          let x = this.temp.filter(ob=>ob.isArchived == false)
          this.temp = x;
          console.log(x)
          this.countryList = this.temp;
          this.total = res.totalPages;
        } else {

        }
      }, err => {
      });
  }



  paginationForTaxes(ev) {
    //console.log(ev);
    this.p = ev;
    this.getTaxList(ev-1);
 }

  getTaxList(currentPageCliked = 0) {
    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;

    let body = this.details;
    this.myservice
      .postCall('master/taxes', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.taxList = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.taxList,'tax list')
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
  this.pageHeader = "Add Tax"
  this.myForm.reset();
}

setUpdatedValue() {

  this.taxList[this.currentIndexToUpdate].countryCode  = this.country;
  this.taxList[this.currentIndexToUpdate].description = this.description; 

  this.taxList[this.currentIndexToUpdate].isArchived = this.isArchived;  
  this.taxList[this.currentIndexToUpdate].taxFor = this.taxFor; 

  this.taxList[this.currentIndexToUpdate].taxPercentage = this.taxPercentage;  

  console.log(this.name,this.description,"ddd")

}
goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;

  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Tax"

  this.details['token'] = this.admin_token;
  this.details['taxId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/taxById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.country = (res['data'] ? res['data'].countryCode : "NA");
          this.taxFor = (res['data'] ? res['data'].taxFor : "NA");
          this.taxPercentage = (res['data'] ? res['data'].taxPercentage : "NA");
          this.taxId = (res['data'] ? res['data']._id : "NA");
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.country,this.taxFor,this.taxPercentage,this.taxId)
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
   this.taxAdd();
 } else {
   this.taxUpdate();
 }
 
}



taxAdd() {
this.details = {
  countryCode : this.country,
  taxFor : this.taxFor,
  taxPercentage : this.taxPercentage,
  description : this.description,
  token : this.admin_token
}
  let body = this.details;
  this.myservice
    .postCall('master/addTax', body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
     this.myForm.resetForm()
     this.country = "";
      } else {
        this.myservice.error(res['message'])
      }
    }, err => {
    });
}



taxUpdate() {
 
  this.details = {
  countryCode : this.country,
  taxFor : this.taxFor,
  token : this.admin_token,
  taxPercentage : this.taxPercentage,
  description : this.description,
  isArchived : this.isArchived,
  taxId : this.taxId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateTax", body)
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




numberOnly(event): boolean {
  console.log(event);
  const charCode = (event.which) ? event.which : event.keyCode;
  if (charCode > 31 && (charCode < 48 || charCode > 57)) {
    return false;
  }
  return true;
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "taxes"}

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
         x = this.taxList;
         this.taxList = [];
         this.taxList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}



}
