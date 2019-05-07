import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {

  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  stateList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  stateId: any;
  value : any ;
  country: any = "";
  countries: any = [];
  countryList: any = [];
  parent : any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any;
  total : Number;
  currentIndexToUpdate = 0;
  labelName : any;
  noData: boolean = false;
  constructor(private myservice: DataService,

    private varCtrl: VarService,

    @Inject('picUrl') private picUrl: string,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "State Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getCountryList();
      this.getStateList()
    }



  }
  
  paginationForStates(ev) {
    //console.log(ev);
    this.p = ev;
    this.getStateList(ev-1);
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
          this.stateList = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.stateList,'state list')
        } else {
          this.noData = true;
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





goToAddSection() {
  this.noData = false;
  this.addPage = true;
  this.updatePage = false;
  this.pageHeader = "Add State"
  this.myForm.reset();
  this.country ="";
}


setUpdatedValue() {

  this.stateList[this.currentIndexToUpdate].name  = this.name;
  this.stateList[this.currentIndexToUpdate].description = this.description; 
  this.stateList[this.currentIndexToUpdate].value  = this.value;
  this.stateList[this.currentIndexToUpdate].isArchived = this.isArchived;  
  this.stateList[this.currentIndexToUpdate].parent = this.country; 
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
  this.pageHeader = "Update State"

  this.details['token'] = this.admin_token;
  this.details['stateId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/stateById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'] ? res['data'].name : "NA");
          this.value = (res['data'] ? res['data'].value : "NA");
          this.country = (res['data'] ? res['data'].parent : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.stateId = (res['data'] ? res['data']._id : "NA")
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.name,this.description,this.stateId)
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
   this.stateAdd();
 } else {
   this.stateUpdate();
 }
 
}



stateAdd() {
this.details = {
  name: this.name,
  // value : this.value,
  parent : this.country,
  description : this.description,
  token : this.admin_token,
  isArchived : this.isArchived
}
  let body = this.details;
  this.myservice
    .postCall('master/addStates', body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
     this.myForm.resetForm();
     this.country ="";
      } else {
        this.myservice.error(res['message'])
      }
    }, err => {
    });
}

getArchivedCountry(event:Event){
  console.clear();
  //console.log(ev);
  let index:number =  event.target["selectedIndex"] - 1;
  // alert( index)
  // alert(this.countries[index].isArchived);
  this.isArchived = this.countries[index].isArchived
}


stateUpdate() {
 
  this.details = {
    name: this.name,
    // value : this.value,
    parent : this.country,
    description : this.description,
    isArchived : this.isArchived,
    token : this.admin_token,
    stateId : this.stateId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateStates", body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
        this.setUpdatedValue();
      } else {
        this.myservice.error(res["message"])
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "states"}

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
         x = this.stateList;
         this.stateList = [];
         this.stateList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}




}
