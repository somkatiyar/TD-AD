import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.css']
})
export class PackageComponent implements OnInit {

  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  packageList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  noOfDay : any;
  noOflesson : any;
  tax : any;
  price : any;
  pageHeader : any;
  packageId: any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any;
  total : Number;
  currentIndexToUpdate = 0;
  labelName : any;
  noData: boolean = false;
  taxList: any = [];
  taxId: any;
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
    this.varCtrl.title = "Package Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    this.getTaxList();


    if(this.admin_token && this.admin_token.length > 0) {
      this.getpackageList()
    }
  }
  paginationForPackeges(ev) {
    //console.log(ev);
    this.p = ev;
    this.getpackageList(ev-1);
 }
  getpackageList(currentPageCliked = 0) {
   
    this.details['page'] = currentPageCliked;
    this.details['token'] = this.admin_token;
    let body = this.details;
    this.myservice
      .postCall('master/packages', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.total = res.totalPages;
          this.packageList = this.temp;
          this.noData = false;
          console.log(this.packageList,'package list')
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

  getTaxId(id) {
    this.taxId = id;
    this.tax = this.taxList.filter(ob => ob._id == id)[0].taxPercentage;
    console.log(this.tax, "taxpercentage")
  }



goToAddSection() {
  this.noData = false;
  this.addPage = true;
  this.updatePage = false;
  this.pageHeader = "Add Package "
  this.myForm.reset();
}

setUpdatedValue() {

  this.packageList[this.currentIndexToUpdate].name  = this.name;
  this.packageList[this.currentIndexToUpdate].numberOfDay = this.noOfDay; 
  this.packageList[this.currentIndexToUpdate].numberOfLesson  = this.noOflesson;
  this.packageList[this.currentIndexToUpdate].isArchived = this.isArchived;  
  console.log(this.tax,'tax today')
  this.packageList[this.currentIndexToUpdate].taxId.taxPercentage = this.tax; 
  this.packageList[this.currentIndexToUpdate].price = this.price; 

}
goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;
  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Package "

  this.details['token'] = this.admin_token;
  this.details['packageId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/packageById', body)
      .subscribe(res => {
        if (res["status"]) {
          console.log(res['data'],'data')
          this.name = (res['data']? res['data'].name : "NA");
          this.noOfDay = (res['data']? res['data'].numberOfDay : "NA");
          this.noOflesson = (res['data']? res['data'].numberOfLesson : "NA");
          // this.tax = (res['data']? res['data'].tax : "NA");
          this.tax = (res['data'].taxId ? res['data'].taxId.taxPercentage : "")
          this.price = (res['data'] ? res['data'].price : "NA");
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          this.packageId = (res['data']? res['data']._id : "NA");
  
        
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
   this.packageAdd();
 } else {
   this.packageUpdate();
 }
 
}



packageAdd() {
this.details = {
  name: this.name,
  numberOfDay : this.noOfDay,
  numberOfLesson : this.noOflesson,
  taxId : this.taxId,
  price : this.price,
  token : this.admin_token

}
  let body = this.details;
  this.myservice
    .postCall('master/addPackage', body)
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



packageUpdate() {
 
  this.details = {
    name: this.name,
    numberOfDay : this.noOfDay,
    numberOfLesson : this.noOflesson,
    taxId : this.taxId,
    price : this.price,
    isArchived : this.isArchived,
    token : this.admin_token,
    packageId : this.packageId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updatePackage", body)
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "packages"}

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
         x = this.packageList;
         this.packageList = [];
         this.packageList = x;
         x = [];
        
        

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

}
