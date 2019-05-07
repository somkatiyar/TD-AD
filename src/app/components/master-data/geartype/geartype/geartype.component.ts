import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-geartype',
  templateUrl: './geartype.component.html',
  styleUrls: ['./geartype.component.css']
})
export class GeartypeComponent implements OnInit {

  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  gearList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  gearId: any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any;
  total : Number;
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
    this.varCtrl.title = "Gear Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.gearTypeList()
    }
  }
  
  paginationForGearType(ev) {
    //console.log(ev);
    this.p = ev;
    this.gearTypeList(ev-1);
 }

  gearTypeList(currentPageCliked = 0) {
   
    this.details['page'] = currentPageCliked;
    this.details['token'] = this.admin_token;
    let body = this.details;
    this.myservice
      .postCall('master/gearTypes', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.gearList = this.temp;
          this.total = res.totalPage
          this.noData = false;
          console.log(this.gearList,'country list')
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
  this.pageHeader = "Add GearType"
  this.myForm.reset();
}


setUpdatedValue() {

  this.gearList[this.currentIndexToUpdate].name  = this.name;
  this.gearList[this.currentIndexToUpdate].description = this.description; 
  this.gearList[this.currentIndexToUpdate].isArchived = this.isArchived;  

}
goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;
  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update GearType"

  this.details['token'] = this.admin_token;
  this.details['gearId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/gearTypeById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'] ? res['data'].name : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.gearId = (res['data'] ? res['data']._id : "NA");
          this.isArchived =  (res['data']? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.name,this.description,this.gearId)
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
   this.gearTypeAdd();
 } else {
   this.gearTypeUpdate();
 }
 
}



gearTypeAdd() {
this.details = {
  name: this.name,
  description : this.description,
  token : this.admin_token
}
  let body = this.details;
  this.myservice
    .postCall('master/addGearType', body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
        this.myForm.resetForm()
      } else {
        this.myservice.error(res['message'])
      }
    }, err => {
    });
}



gearTypeUpdate() {
 
  this.details = {
    name: this.name,
    description : this.description,
    token : this.admin_token,
    isArchived : this.isArchived,
    gearId : this.gearId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateGearType", body)
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "geartypes"}

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
         x = this.gearList;
         this.gearList = [];
         this.gearList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}



}
