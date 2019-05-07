import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { Form, NgForm } from '@angular/forms';
import { DISABLED } from '@angular/forms/src/model';
import { Back } from '../../back';

@Component({
  selector: 'app-attribute',
  templateUrl: './attribute.component.html',
  styleUrls: ['./attribute.component.css']
})



export class AttributeComponent implements OnInit {

  @ViewChild('f') public myForm: NgForm;




  labelName: any = "";
  admin_token: any;
  details: any = {};
  temp: any = [];
  attributeList: any = [];
  addPage: boolean = false;
  updatePage: boolean = false;
  name: any;
  description: any;
  pageHeader: any;
  attributeId: any;
  p: number = 1;
  isArchived: boolean = false;
  isChecked: any;
  total: Number;
  currentIndexToUpdate = 0;
  noData: boolean = false;

  constructor(private myservice: DataService,

    private varCtrl: VarService,
    private router: Router,

  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Attribute Management"

  }




  ngOnInit() {

    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    console.log(this.admin_token, this.admin_token)
    if (this.admin_token && this.admin_token.length > 0) {
      this.getAttributeList()
    }
  }

  paginationForAttribute(ev) {
    //console.log(ev);
    this.p = ev;
    this.getAttributeList(ev - 1);
  }

  getAttributeList(currentPageCliked = 0) {

    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    let body = this.details;
    this.myservice
      .postCall('master/attributeList', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.total = res.totalPages;
          this.attributeList = this.temp;
          this.noData = false;
          console.log(this.attributeList, 'attribute list')
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
    this.pageHeader = "Add Attribute"

    this.myForm.reset();

    let x = document.getElementsByName('form')


  }

  goToUpdateSection(id, index) {
    this.noData = false;
    this.currentIndexToUpdate = index;

    let top = document.getElementById('top');
    top.scrollIntoView();
    top = null;

    this.addPage = false;
    this.updatePage = true;
    this.pageHeader = "Update Attribute"

    this.details['token'] = this.admin_token;
    this.details['attributeId'] = id;
    let body = this.details;
    this.myservice
      .postCall('master/attributebyId', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'][0] ? res['data'][0].name : "NA");
          this.description = (res['data'][0] ? res['data'][0].description : "NA");
          this.attributeId = (res['data'][0] ? res['data'][0]._id : "NA")
          this.isArchived = (res['data'][0] ? res['data'][0].isArchived : "");
          if (this.isArchived == true) {
            this.labelName = "Disabled"
          } else {
            this.labelName = "Enabled"

          }
          console.log(this.name, this.description, this.attributeId)
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
    if (this.addPage) {
      this.attributeAdd();
    } else {
      this.attributeUpdate();
    }

  }



  attributeAdd() {

    this.details = {
      name: this.name,
      description: this.description,
      token: this.admin_token,

    }
    let body = this.details;
    this.myservice
      .postCall('master/addAttribute', body)
      .subscribe(res => {
        if (res["status"]) {
          this.myservice.success(res['message'])
          this.myForm.resetForm();
          // this.getAttributeList()
          // this.attributeList.push(this.details)
          console.log(this.attributeList, "hcx")
          // this.router.navigate(['master']);
        } else {
          this.myservice.error(res['message'])
        }
      }, err => {
      });
  }

  setUpdatedValue() {
    this.attributeList[this.currentIndexToUpdate].name = this.name;
    this.attributeList[this.currentIndexToUpdate].description = this.description;
    this.attributeList[this.currentIndexToUpdate].isArchived = this.isArchived;
    console.log(this.name, this.description, "ddd")
  }

  attributeUpdate() {

    this.details = {
      name: this.name,
      description: this.description,
      token: this.admin_token,
      isArchived: this.isArchived,
      attributeId: this.attributeId,
    }
    let body = this.details;
    console.log(body)
    this.myservice
      .postCall("master/updateAttribute", body)
      .subscribe(res => {

        if (res["status"]) {

          this.myservice.success(res['message'])
          this.setUpdatedValue();


          // this.myForm.resetForm();

        } else {
          this.myservice.error(res['message'])
        }
      }, err => {
      });
  }


  setClass(item) {

    if (item.isArchived == true) {
      return "enableBtn";
    }
    return "disableBtn";
  }

  isVerified(item) {

    if (item.isArchived == true) {
      return "Enable";
    }
    return "Disable";
  }


  disableItem(name, item) {



    let body = { docId: item._id, token: this.admin_token, "master": "attributes" }

    console.log(this.details)
    this.myservice
      .postCall('admin/enableDisableMaster', body)
      .subscribe(res => {
        if (res["status"]) {


          this.myservice.success(res['message'])
          if (item.isArchived) {

            item.isArchived = false;
            this.labelName = "Enabled"
          } else {

            item.isArchived = true;
            this.labelName = "Disabled"
          }

          var x = [];
          x = this.attributeList;
          this.attributeList = [];
          this.attributeList = x;
          x = [];



        }
      }, err => {
      });
  }


}

