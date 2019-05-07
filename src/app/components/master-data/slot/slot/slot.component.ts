import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {
  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  slotList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  fromTime : any;
  toTime : any;
  pageHeader : any;
  slotId: any;
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
    this.varCtrl.title = "Slot Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getSlotList()
    }
  }



  paginationForSlots(ev) {
    //console.log(ev);
    this.p = ev;
    this.getSlotList(ev-1);
 }

  getSlotList(currentPageCliked = 0) {
    this.details['page'] = currentPageCliked;
    this.details['token'] = this.admin_token;
    let body = this.details;
    this.myservice
      .postCall('master/slots', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.slotList = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.slotList,'slot list')
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
  this.pageHeader = "Add Slot "
  this.myForm.reset();
}


setUpdatedValue() {

  this.slotList[this.currentIndexToUpdate].name  = this.name;
  this.slotList[this.currentIndexToUpdate].description = this.description; 
  this.slotList[this.currentIndexToUpdate].fromTime  = this.fromTime;
  this.slotList[this.currentIndexToUpdate].toTime = this.toTime; 
  this.slotList[this.currentIndexToUpdate].isArchived = this.isArchived;  


}


goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;

  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Slot "

  this.details['token'] = this.admin_token;
  this.details['slotId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/slotById', body)
      .subscribe(res => {
        if (res["status"]) {
          console.log(res['data'],'data')
          this.name = (res['data']? res['data'].name : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.slotId = (res['data']? res['data']._id : "NA");
          this.fromTime = (res['data']? res['data'].fromTime : "NA");
          this.toTime = (res['data']? res['data'].toTime : "NA");
          this.isArchived =  (res['data']? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.fromTime,this.toTime,'hh')
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
   this.slotAdd();
 } else {
   this.slotUpdate();
 }
 
}



slotAdd() {
this.details = {
  name: this.name,
  description : this.description,
  fromTime : this.fromTime,
  toTime : this.toTime,
  token : this.admin_token
}
  let body = this.details;
  this.myservice
    .postCall('master/addSlot', body)
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



slotUpdate() {
 
  this.details = {
    name: this.name,
    description : this.description,
    fromTime : this.fromTime,
    toTime : this.toTime,
    token : this.admin_token,
    isArchived : this.isArchived,
    slotId : this.slotId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateSlot", body)
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "slots"}

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
         x = this.slotList;
         this.slotList = [];
         this.slotList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}





}
