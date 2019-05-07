import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-curriculam',
  templateUrl: './curriculam.component.html',
  styleUrls: ['./curriculam.component.css']
})
export class CurriculamComponent implements OnInit {
  @ViewChild('f') public myForm : NgForm;

  admin_token : any;
  details : any = {};
  temp : any =[];
  curriculamList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  curriculumId : any;
  p: number = 1;
  isArchived : boolean = false;
  isChecked : any;
  total : Number;
  currentIndexToUpdate = 0;
  labelName : any;
  noData: boolean = false;
  constructor(private myservice: DataService,
    private varCtrl: VarService,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Curriculam Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getCurriculamList()
    }
  }

  paginationForCurriculam(ev) {
    //console.log(ev);
    this.p = ev;
    this.getCurriculamList(ev-1);
 }

  getCurriculamList(currentPageCliked = 0) {
   
    this.details['page'] = currentPageCliked;

    this.details['token'] = this.admin_token;
    let body = this.details;
    this.myservice
      .postCall('admin/curriculums', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.curriculamList = this.temp;
          this.noData = false;
           this.total = res.totalPages;
          console.log(this.curriculamList,'curriculam  list')
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
  this.pageHeader = "Add Curriculam"
  this.myForm.reset();
}

setUpdatedValue() {  

  this.curriculamList[this.currentIndexToUpdate].name  = this.name;
  this.curriculamList[this.currentIndexToUpdate].description = this.description; 
  this.curriculamList[this.currentIndexToUpdate].isArchived = this.isArchived; 

}
goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;
  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Curriculam"

  this.details['token'] = this.admin_token;
  this.details['curriculumId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/curriculumById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'] ? res['data'].name : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.curriculumId = (res['data'] ? res['data']._id : "NA");
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.name,this.description,this.curriculamList)
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
   this.curriculamAdd();
 } else {
   this.curriculamUpdate();
 }
 
}



curriculamAdd() {
this.details = {
  name: this.name,
  description : this.description,
  token : this.admin_token
}
  let body = this.details;
  this.myservice
    .postCall('master/addCurriculum', body)
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



curriculamUpdate() {
 
  this.details = {
    name: this.name,
    description : this.description,
    token : this.admin_token,
    isArchived : this.isArchived,
    curriculumId : this.curriculumId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateCurriculum", body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
        this.setUpdatedValue();
        // setTimeout(() => {

        //   window.location.reload();
   
        //    }, 200);
        // this.router.navigate(['master']);
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "curriculums"}

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
         x = this.curriculamList;
         this.curriculamList = [];
         this.curriculamList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}




}
