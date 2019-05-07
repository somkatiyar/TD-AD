import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../service/var.service';
import { Router, ActivatedRoute, } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';



@Component({
  selector: 'app-master-management',
  templateUrl: './master-management.component.html',
  styleUrls: ['./master-management.component.css']
})
export class MasterManagementComponent implements OnInit {

  temp: any[] = [

  ];
  temp1: any[] = [
    {
      "name": "9:00 - 10:00",
      "description": "First Slot",
    
      "toTime": "10:00",
      "_id": "1",
    },
    {
      "name": "10:00 - 11:00",
      "description": "second Slot",
      "fromTime": "10:00",
      "toTime": "11:00",
      "_id": "2"
    }
  ];
  details: any = [];
  pageHeader: string = "";
  addPageContent: boolean = false;
  updatePageContant: boolean = false;
  showBtn: boolean = false;
  users: any[] = [];
  order: string = 'name';
  userType: any = "all";


  admin_token: any;
  isAttribute: boolean = false;
  isCurriculam: boolean = false;
  isDoc_type: boolean = false;
  isPackage: boolean = false;
  isSlot: boolean = false;
  isVechical_type: boolean = false;
  isTax: boolean = false;
  isContry : boolean = false;
  isState : boolean = false;
  isCity : boolean = false;
  id: any;
  btnTitle: string = "submit";
  isUpdatePage: boolean = false;
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
    this.varCtrl.title = "Master Management"
    this.users = this.temp;

    this.id = this.activatedRoute.snapshot.params['id'];



  }

  ngOnInit() {
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
  }


  getDataList(value) {
    let endpoint;
    if (value == "attribute") {
      endpoint = 'admin/attribute';
    }
    if (value == "doc_type") {
      endpoint = 'admin/documentType';
    }
    if (value == "curriculam") {
      endpoint = 'admin/curriculam';
    }
    if (value == "package") {
      endpoint = 'admin/package';
    }
    if (value == "slot") {
      endpoint = 'admin/slot';
    }
    if (value == "tax") {
      endpoint = 'admin/tax';
    }
    if (value == "vechical_type") {
      endpoint = 'admin/vechicaltype';
    }
    if (value == "country") {
      endpoint = 'admin/country';
    }
    if (value == "state") {
      endpoint = 'admin/state';
    }
    if (value == "city") {
      endpoint = 'admin/city';
    }
    this.details['token'] = this.admin_token
    let body = this.details;
    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.users = this.temp;
        } else {

        }
      }, err => {
      });
  }

  masterEdit(id){

    this. goToUpdatePage(); 
    let body = {token: this.admin_token,_id : id, type:this.userType};
    console.log(body);
    this.myservice
      .postCall('admin/masterById', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          
            this.details = {
            name : this.temp1[0].name

          }
          console.log(this.details,body,'new data')
        } else {

        }
      }, err => {
      });

  }


  goToUpdatePage() {
   
    if (this.userType == "attribute") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Attribute"
      this.isAttribute = true;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }


    if (this.userType == "slot") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Slot"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = true;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;
    }

    if (this.userType == "package") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Package"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = true;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }

    if (this.userType == "doc_type") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Doc Type"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = true;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }

    if (this.userType == "tax") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Tax"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = true;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }

    if (this.userType == "vechical_type") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Vechical Type"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = true;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }

    if (this.userType == "curriculam") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Curriculam"
      this.isAttribute = false;
      this.isCurriculam = true;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }
    if (this.userType == "country") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update Country"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = true;
      this.isState  = false;
      this.isCity  = false;

    }
    if (this.userType == "state") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update State"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = true;
      this.isCity  = false;

    }
    if (this.userType == "city") {
      this.addPageContent = false;
      this.updatePageContant = true;
      this.pageHeader = "Update City"
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = true;

    }



  }

  goToAddPage() {

    if (this.userType == "attribute") {
      this.addPageContent = true;
      this.pageHeader = "Add Attribute"
      this.updatePageContant = false;
      this.isAttribute = true;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;
    }
    if (this.userType == "slot") {
      this.addPageContent = true;
      this.pageHeader = "Add Slot"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = true;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;
    }
    if (this.userType == "package") {
      this.addPageContent = true;
      this.pageHeader = "Add Package"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = true;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;
    }
    if (this.userType == "doc_type") {
      this.addPageContent = true;
      this.pageHeader = "Add Doc Type"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = true;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;
    }
    if (this.userType == "tax") {
      this.addPageContent = true;
      this.pageHeader = "Add Tax"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = true;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }
    if (this.userType == "vechical_type") {
      this.addPageContent = true;
      this.pageHeader = "Add Vechical Type"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = true;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;
    }
    if (this.userType == "curriculam") {
      this.addPageContent = true;
      this.pageHeader = "Add Curriculam"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = true;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = false;

    }

    if (this.userType == "country") {
      this.addPageContent = true;
      this.pageHeader = "Add Country"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = true;
      this.isState  = false;
      this.isCity  = false;

    }


    if (this.userType == "state") {
      this.addPageContent = true;
      this.pageHeader = "Add state"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = true;
      this.isCity  = false;

    }

    if (this.userType == "city") {
      this.addPageContent = true;
      this.pageHeader = "Add city"
      this.updatePageContant = false;
      this.isAttribute = false;
      this.isCurriculam = false;
      this.isDoc_type = false;
      this.isPackage = false;
      this.isSlot = false;
      this.isVechical_type = false;
      this.isTax = false;
      this.isContry = false;
      this.isState  = false;
      this.isCity  = true;

    }
  }

  chooseUser(value) {

    console.log(this.userType);
    if (this.userType == "attribute") {
      this.getDataList(this.userType);
      console.log(this.details);
      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

    if (this.userType == "doc_type") {
      this.getDataList(this.userType);
      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

    if (this.userType == "curriculam") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

    if (this.userType == "package") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

    if (this.userType == "slot") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

    if (this.userType == "tax") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

    if (this.userType == "vechical_type") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }
    if (this.userType == "country") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }
    if (this.userType == "state") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }
    if (this.userType == "city") {
      this.getDataList(this.userType);

      this.showBtn = true;
      this.addPageContent = false;
      this.updatePageContant = false;
    }

  }

  create() {

    let endpoint;
    if (this.userType == "attribute") {
      endpoint = 'admin/addAttribute';
    }
    if (this.userType == "doc_type") {
      endpoint = 'admin/addDocumentType';
    }
    if (this.userType == "curriculam") {
      endpoint = 'admin/addCurriculam';
    }
    if (this.userType== "package") {
      endpoint = 'admin/addPackage';
    }
    if (this.userType == "slot") {
      endpoint = 'admin/addSlot';
    }
    if (this.userType == "tax") {
      endpoint = 'admin/addTax';
    }
    if (this.userType== "vechical_type") {
      endpoint = 'admin/addVechicaltype';
    }
    if (this.userType== "country") {
      endpoint = 'admin/addCountry';
    }
    if (this.userType== "state") {
      endpoint = 'admin/addState';
    }
    if (this.userType== "city") {
      endpoint = 'admin/addCity';
   
    }
    this.details['token'] = this.admin_token
    let body = this.details;
    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
        } else {

        }
      }, err => {
      });
  }


  update() {

    let endpoint;
    if (this.userType == "attribute") {
      endpoint = 'admin/updateAttribute';
    }
    if (this.userType == "doc_type") {
      endpoint = 'admin/updateDocumentType';
    }
    if (this.userType == "curriculam") {
      endpoint = 'admin/updatecurriculam';
    }
    if (this.userType== "package") {
      endpoint = 'admin/updatePackage';
    }
    if (this.userType == "slot") {
      endpoint = 'admin/updateSlot';
    }
    if (this.userType == "tax") {
      endpoint = 'admin/updateTax';
    }
    if (this.userType== "vechical_type") {
      endpoint = 'admin/updateVechicaltype';
    }
    if (this.userType== "country") {
      endpoint = 'admin/updateCountry';
    }
    if (this.userType== "state") {
      endpoint = 'admin/updateState';
    }
    if (this.userType== "city") {
      endpoint = 'admin/updateCity';
     
    }
    this.details['token'] = this.admin_token
    let body = this.details;
    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
        } else {

        }
      }, err => {
      });
  }
















}
