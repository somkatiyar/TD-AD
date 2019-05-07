import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { VarService } from '../../../../service/var.service';
import { Router,  } from '@angular/router';

import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-document',
  templateUrl: './document.component.html',
  styleUrls: ['./document.component.css']
})
export class DocumentComponent implements OnInit {
  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  documentList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  documentId: any;
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
    this.varCtrl.title = "Document Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getDocumetTypeList()
    }
  }


  paginationForDocType(ev) {
     //console.log(ev);
     this.p = ev;
     this.getDocumetTypeList(ev-1);
  }
  getDocumetTypeList(currentPageCliked = 0) {
   

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    let body = this.details;
    this.myservice
      .postCall('master/documentTypes', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.total = res.totalPages;
          this.documentList = this.temp;
          this.noData = false;
          console.log(this.documentList,'document list')
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
  this.pageHeader = "Add Document Type"
  this.myForm.reset();
}


setUpdatedValue() {

  this.documentList[this.currentIndexToUpdate].name  = this.name;
  this.documentList[this.currentIndexToUpdate].description = this.description; 
  this.documentList[this.currentIndexToUpdate].isArchived = this.isArchived;  
}
goToUpdateSection(id, index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;

  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update Document Type"

  this.details['token'] = this.admin_token;
  this.details['documentId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/documentTypeById', body)
      .subscribe(res => {
        if (res["status"]) {
          console.log(res['data'],'data')
          this.name = (res['data']? res['data'].name : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.documentId = (res['data']? res['data']._id : "NA");
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.name,this.description,this.documentId)
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
   this.documentTypeAdd();
 } else {
   this.documentTypeUpdate();
 }
 
}



documentTypeAdd() {
this.details = {
  name: this.name,
  description : this.description,
  token : this.admin_token
}
  let body = this.details;
  this.myservice
    .postCall('master/addDocumentType', body)
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



documentTypeUpdate() {
 
  this.details = {
    name: this.name,
    description : this.description,
    token : this.admin_token,
    isArchived : this.isArchived,
    documentId : this.documentId,
  }
  let body = this.details;
  console.log(body)
  this.myservice
    .postCall("master/updateDocumentType", body)
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
 
  
    
  let body = { docId: item._id, token: this.admin_token,"master": "documenttypes"}

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
         x = this.documentList;
         this.documentList = [];
         this.documentList = x;
         x = [];
        
        

      } 
    }, err => {
    });
}




}


