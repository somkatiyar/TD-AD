import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../service/var.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-center-management',
  templateUrl: './test-center-management.component.html',
  styleUrls: ['./test-center-management.component.css']
})
export class TestCenterManagementComponent implements OnInit {

  isPagination : boolean = false;
  admin_token: any;
  details: any = {};
  testCenterList: any = [];
  p: number = 1;
  isChecked: boolean = false;
  total : Number;
  selectFilter: any = "all";
  labelName : any;
  temp: any = [
    { testCenterName: "kanpur", address: "cdma school opp of shiva tample" },
    { testCenterName: "lucknow", address: "near station of old city" },
    { testCenterName: "banaras", address: "opp of rama road" },
    { testCenterName: "jhasi", address: "34/j01 near ASI hospital" },
    { testCenterName: "kannoj", address: "fool gali old building" },
  ];
  constructor(private myservice: DataService,
    private router: Router,
    private http: Http,
    private varCtrl: VarService,
  ) {
    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Test Center Management";


  }

  ngOnInit() {
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    if (this.admin_token) {
      console.log(this.admin_token);
      this.testCenter();
    }
  }

  paginationFortestList(ev){
    this.isPagination = true;
    //console.log(ev);
    this.p = ev;
    this.testCenter(ev-1);
  }

  testCenter(currentPageCliked = 0) {
    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    let body = this.details;
    this.myservice
      .postCall('master/testCenterList', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.testCenterList = this.temp;
          this.total = res.totalPages;
          this.isPagination = true;
          console.log(this.testCenterList, 'test center list');

          this.myservice.success("Test Center List..!");
        } else {
          this.myservice.success("Test Center Not Found..!");
        }
      }, err => {
      });
  }


  chooseFilter() {
    this.testCenterList = this.temp;
    if (this.selectFilter == "enable") {

      let test = this.testCenterList.filter(ob => ob.isArchived == false)
      console.log(test)
      this.testCenterList = test;
      if(this.testCenterList.length <= 0) {
        this.myservice.error("No Enable test center is present..!")
        this.isPagination = false;
      }

    } else {
      if(this.selectFilter == "disable") {
        let test = this.testCenterList.filter(ob => ob.isArchived == true)
        console.log(test)
        this.testCenterList = test;
        if(this.testCenterList.length <= 0) {
          this.myservice.error("No disabled test center is present..!")
          this.isPagination = false;
        }
      } 
      if(this.selectFilter == "selectFilter") {
      
        this.testCenterList = this.temp;
      }
    }
  }

  pageLoad() {
    this.testCenter();
  }

  goToUpdatePage(id) {

    if (id) {

      this.router.navigate(['add-test-center', id]);
    } else {
      this.router.navigate(['add-test-center']);
    }

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
   
    
      
    let body = { docId: item._id, token: this.admin_token,"master": "testcenters"}
  
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
           x = this.testCenterList;
           this.testCenterList = [];
           this.testCenterList = x;
           x = [];
          
          
  
        } 
      }, err => {
      });
  }
  
  
  



}
