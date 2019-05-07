import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  vehicleTypeList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  vehicleId: any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any;
  total : Number;
  currentIndexToUpdate = 0;
  labelName : any;
  noData:boolean= false;
  constructor(private myservice: DataService,
    private varCtrl: VarService,
    private router: Router,

  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Vehicle Type Management"

  }

  ngOnInit() {
 new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getVehicleTypeList()
    }
  }
  
  paginationForVehicle(ev) {
    //console.log(ev);
    this.p = ev;
    this.getVehicleTypeList(ev-1);
 }

  getVehicleTypeList(currentPageCliked = 0) {
  
    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;

    let body = this.details;
    this.myservice
      .postCall('common/vehicleTypes', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.vehicleTypeList = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.vehicleTypeList,'vehicle  list')
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
  this.pageHeader = "Add Vehicle Type"
  this.myForm.reset();
}


setUpdatedValue() {

  this.vehicleTypeList[this.currentIndexToUpdate].name  = this.name;
  this.vehicleTypeList[this.currentIndexToUpdate].description = this.description; 
  this.vehicleTypeList[this.currentIndexToUpdate].isArchived = this.isArchived;  

}

goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;

  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Vehicle Type"

  this.details['token'] = this.admin_token;
  this.details['vehicleId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/vehicleTypeById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'] ? res['data'].name : "NA");
          this.description = (res['data']? res['data'].description : "NA");
          this.vehicleId = (res['data']? res['data']._id : "NA");
          this.isArchived =  (res['data']? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.name,this.description,this.vehicleId)
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
    this.VehicleTypeAdd();
  } else {
    this.VehicleTypeUpdate();
  }
  
 }
 
 
 
 VehicleTypeAdd() {
 this.details = {
   name: this.name,
   description : this.description,
   token : this.admin_token
 }
   let body = this.details;
   this.myservice
     .postCall('master/addVehicleType', body)
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
 
 
 
 VehicleTypeUpdate() {
  
   this.details = {
     name: this.name,
     description : this.description,
     token : this.admin_token,
     isArchived : this.isArchived,
     vehicleId : this.vehicleId,
   }
   let body = this.details;
   console.log(body)
   this.myservice
     .postCall("master/updateVehicleType", body)
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "vehicletypes"}

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
         x = this.vehicleTypeList;
         this.vehicleTypeList = [];
         this.vehicleTypeList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}









}