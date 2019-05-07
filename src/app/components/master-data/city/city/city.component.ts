import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DataService } from '../../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { NgForm } from '@angular/forms';
import { Back } from '../../back';

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {
  @ViewChild('f') public myForm : NgForm;
  admin_token : any;
  details : any = {};
  temp : any =[];
  cityList : any = [];
  addPage : boolean = false;
  updatePage : boolean = false;
  name : any;
  description : any;
  pageHeader : any;
  cityId: any;
  states : any = [];
  stateList : any = [];
  country : any ;
  value : any ;
  state : any ="";
  p: number = 1;
  isArchived : boolean = false;;
  isChecked : any;
  total : number;
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
    this.varCtrl.title = "City Management"

  }

  ngOnInit() {
    new Back();
    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;

    if(this.admin_token && this.admin_token.length > 0) {
      this.getStateList()
      this.getCityList()
    }

  }

  
  paginationForCity(ev) {
    //console.log(ev);
    this.p = ev;
    this.getCityList(ev-1);
 }

  getCityList(currentPageCliked = 0) {
   
 this.details['page'] = currentPageCliked;
    this.details['token'] = this.admin_token;
    let body = this.details;
    this.myservice
      .postCall('common/cities', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.cityList =  this.temp;
          this.total = res.totalPages;
          this.noData = false;
         console.log(this.cityList,'city list')
        } else {
        this.noData = true;
        }
      }, err => {
      });
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
          let x = this.temp.filter(ob=>ob.isArchived == false)
          this.temp = x;
          this.stateList = this.temp;
          this.total = res.totalPages;
          console.log(this.stateList,'state list')
        } else {

        }
      }, err => {
      });
  }


goToAddSection() {
  this.noData = false;
  this.addPage = true;
  this.updatePage = false;
  this.pageHeader = "Add City"
  this.myForm.reset();
  this.state = "";
}

setUpdatedValue() {
  this.cityList[this.currentIndexToUpdate].name  = this.details.name;
  this.cityList[this.currentIndexToUpdate].description = this.details.description; 
  this.cityList[this.currentIndexToUpdate].isArchived = this.details.isArchived;  
  this.cityList[this.currentIndexToUpdate].parent = this.details.parent; 

  this.name = this.details.name;
  this.description = this.details.description;
  this.isArchived = this.details.isArchived;
  this.state = this.details.parent;
  this.value = this.details.value;
}

goToUpdateSection(id,index) {
  this.noData = false;
  this.currentIndexToUpdate = index;
  let top = document.getElementById('top');
  top.scrollIntoView();
  top = null;
  this.addPage = false;  
  this.updatePage = true;
  this.pageHeader = "Update City"


  this.details['token'] = this.admin_token;
  this.details['cityId'] = id;
  let body = this.details;
    this.myservice
      .postCall('master/cityById', body)
      .subscribe(res => {
        if (res["status"]) {

          this.name = (res['data'] ? res['data'].name : "NA");
          this.value = (res['data'] ? res['data'].value : "NA");
          this.state = (res['data'] ? res['data'].parent : "NA");
          this.description = (res['data'] ? res['data'].description : "NA");
          this.cityId = (res['data'] ? res['data']._id : "NA");
          this.isArchived =  (res['data'] ? res['data'].isArchived : "");
          if(this.isArchived == true) {
            this.labelName = "Disabled"
            } else {
            this.labelName = "Enabled"
            
            }
          console.log(this.isArchived,'hii')
        } else {

        }
      }, err => {
      });


 
 }





onSubmit() {
 if(this.addPage) {
   this.cityAdd();
 } else {
   this.cityUpdate();
 }
 
}
disableUser(event) {
  if (event.target.checked) {
    this.isArchived = true;
 
  } else {
    this.isArchived = false;

  }
}


cityAdd() {
this.details = {
  name: this.name,
  // value : this.value,
  parent : this.state,
  description : this.description,
  token : this.admin_token
}
  let body = this.details;
  this.myservice
    .postCall('master/addCities', body)
    .subscribe(res => {
      if (res["status"]) {
        this.myservice.success(res['message'])
        this.myForm.resetForm();
        this.state ="";
    
      } else {
        this.myservice.error(res['message'])
      }
    }, err => {
    });
}



cityUpdate() {
 
  this.details = {
    name: this.name,
    // value : this.value,
    parent : this.state,
    description : this.description,
    token : this.admin_token,
    cityId : this.cityId,
    isArchived : this.isArchived
  }
  let body = this.details;
  console.log(body,"im body");
  this.myservice
    .postCall("master/updateCities", body)
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


getArchivedState(event:Event){
  console.clear();
  //console.log(ev);
  let index:number =  event.target["selectedIndex"] - 1;
  // alert( index)
  // alert(this.countries[index].isArchived);
  this.isArchived = this.states[index].isArchived
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
 
  
    
       let body = { docId: item._id, token: this.admin_token,"master": "cities"}
   
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
              x = this.cityList;
              this.cityList = [];
              this.cityList = x;
              x = [];
             
             
  
           } 
         }, err => {
         });
     }











}
