import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';
import { ResolverService } from '../../service/resolver.service';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  doc: any[] = [];
  temp: any[] = [];
  // reverse: boolean = false;
  isDriver: boolean = false;
  showBtn: boolean = false;
  users: any[] = [];
  order: string = 'item.email';
  userType: any = "all";
  details: any = {};
  userListDetail: any[] = [];
  schoolUserList: any[] = [];
  admin_token: any;
  schoolUsers: any = [];
  imageUrl: any;
  sortColumn: any;
  reverseSort: any;
  p: number = 1;
  sortedCollection: any[];
  isUsers: boolean = false;
  isSubAdmin: boolean = false;
  isAdmin: boolean = false;
  isschoolUsers: boolean = false;
  selectFilter: any = "all";
  verifiedIcon: boolean = false;
  check: boolean = false;
  cross: boolean = false;
  total: Number = 14;
  isSchoolNameShow: boolean = false;
  txtSearch = "";
  isSearching: boolean = false;
  currentPageDriver = 0;
  subAdminList: any = [];
  showAcceptButton: boolean = false;
  disableBtn: string;
  approveBtn: string;
  btnClass: string = "disablebtn";
  noData : boolean = false;
  // isDataFound : boolean = false;
  timePlaceHolder = "Please ASe"
  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private router: Router,
    private orderPipe: OrderPipe,
    private resolver: ResolverService,
    @Inject('picUrl') private picUrl: string,
  ) {


    this.imageUrl = 'assets/images/userPlaceholder.png';
    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "User Management";
    this.users = this.temp;
    this.sortedCollection = orderPipe.transform(this.users, 'item.firstName');
    console.log(this.sortedCollection);


  }

  ngOnInit() {

    let lp = JSON.parse(localStorage.getItem('adminDetail'));
    this.admin_token = lp.token;
    if (lp.userRole == "SUB_ADMIN") {

      this.isAdmin = false;
    } else {
      this.isAdmin = true;
    }
    let x = localStorage.getItem('userType')
    if (x != null) {
      this.userType = x;
      this.chooseUser()
    }
  }

  paginationForUsers(ev) {
    this.selectFilter = "all";
    this.p = ev;
    console.log(this.userType)
    if (this.userType == "driver") {
      if (this.txtSearch == "") {
        this.currentPageDriver = ev - 1
        this.drivers();
      } else {
        this.searchName(this.txtSearch, ev - 1);
      }
    } else if (this.userType == "lurnr") {

      if (this.txtSearch == "") {
        this.lurners(ev - 1)
      } else {
        this.searchName(this.txtSearch, ev - 1);
      }
    }

  }

  paginationForSchool(ev) {
    //console.log(ev);
    this.p = ev;
    if (this.txtSearch == "") {
      this.schools(ev - 1);
    } else {
      this.searchName(this.txtSearch, ev - 1);
    }


  }



  paginationForSubAdmin(ev) {
    //console.log(ev);
    this.p = ev;
    if (this.txtSearch == "") {
      this.subAdmin(ev - 1);
    } else {
      this.searchName(this.txtSearch, ev - 1);
    }


  }


  drivers() {

    this.isDriver = true;
    this.details['token'] = this.admin_token
    this.details['page'] = this.currentPageDriver;
    this.details['keyword'] = this.txtSearch;
    this.details['isSearching'] = this.isSearching;
    let body = this.details;
    this.myservice
      .postCall('admin/drivers', body)
      .subscribe(res => {
        if (res["status"] == 1) {
          this.temp = res['data'];
          this.users = this.temp;
          console.log(this.users, 'this.users')
          this.total = res.totalPages;

       

        } else {
          this.myservice.error(res["message"]);
          this.users = [];
          this.noData = true;
          
        }
      }, err => {
      });

  }

  lurners(currentPageCliked = 0) {
    this.isDriver = false;
    this.details['token'] = this.admin_token
    this.details['page'] = currentPageCliked;
    this.details['keyword'] = this.txtSearch;
    this.details['isSearching'] = this.isSearching;
    let body = this.details;
    this.myservice
      .postCall('admin/learners', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.users = this.temp;
          this.total = res.totalPages;
          this.noData = false;
          console.log(this.users, 'Lurners');
        } else {
          this.myservice.error(res["message"]);
         this.noData = true;
        }
      }, err => {
      });
  }

  subAdmin(currentPageCliked = 0) {
    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    this.details['keyword'] = this.txtSearch;
    this.details['isSearching'] = this.isSearching;
    let body = this.details;
    this.myservice
      .postCall('admin/getSubAdmin', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];

          this.subAdminList = this.temp;
          this.total = res.totalPages;
          this.users = [];
          console.log(this.users, 'schools');
          this.isSubAdmin = true;
          this.noData = false;
        } else {
          this.myservice.error(res["message"]);
          this.noData = true;
          this.isSubAdmin = false;
        }
      }, err => {
      });
  }





  schools(currentPageCliked = 0) {
    this.details['token'] = this.admin_token;
    this.details['page'] = currentPageCliked;
    this.details['keyword'] = this.txtSearch;
    this.details['isSearching'] = this.isSearching;
    let body = this.details;
    this.myservice
      .postCall('admin/schools', body)
      .subscribe(res => {
        if (res["status"]) {
          this.temp = res['data'];
          this.total = res.totalPages;
          this.schoolUsers = this.temp;
          this.users = [];
          this.noData = false;
          console.log(this.users, 'schools');
        } else {
          this.myservice.error(res["message"]);
          this.noData = true;
        }
      }, err => {
      });
  }

  goToUpdatePage(id, userType, schoolId, schoolName) {

    if (id && id.length > 0) {
      let type = 'school';

      this.router.navigate(['school-create', type, id, schoolId,]);

    }
    if (userType == "DRIVER") {
      let type = 'driver';
      this.router.navigate(['driver-create', type, id]);

    }
    if (userType == "LEARNER") {
      let type = 'lurnr'
      this.router.navigate(['user-create', type, id]);

    }
    if (userType == "PORTAL_USER") {

      let type = 'subadmin'
      this.router.navigate(['subadmin-create', type, id]);

    }
  }

  disableItem(name, item) {
    let body ={};
    let endpoint ;
    let action: string;
    if (name == "aprove") {
      action = "accept"
    } else {
      action = ""
    }

    if(this.userType =="school") {
      endpoint = "admin/enableDisableSchool";
     body = { schoolId: item.school._id, token: this.admin_token }
   
    } else if(this.userType =="driver" || this.userType =="subadmin" || this.userType =="lurnr") {
      endpoint = "admin/acceptDisableUsers";
      body = { driverId: item._id, token: this.admin_token, action: action }
    }

    
    console.log(this.details)
    this.myservice
      .postCall(endpoint, body)
      .subscribe(res => {
        if (res["status"]) {
          if (name == "aprove") {
            item.documents[0].isVerified = "1";
            item.documents[1].isVerified = "1";
          } else {
            if (item.isArchived) {
              item.isArchived = false;
            } else {
              item.isArchived = true;
            }
          }



          this.myservice.success(res['message'])

          if (this.userType == "driver" || this.userType == "lurnr") {
            var x = [];
            x = this.users;
            this.users = [];
            this.users = x;
            x = [];
          } else if (this.userType == "school") {
            var x = [];
            x = this.schoolUsers;
            this.schoolUsers = [];
            this.schoolUsers = x;
            x = [];
          } else {
            var x = [];
            x = this.subAdminList;
            this.subAdminList = [];
            this.subAdminList = x;
            x = [];
          }

        } else {
          console.log("user inserted");

        }
      }, err => {
      });
  }


  searchName(inputName, currentPageCliked = 0) {

    this.users = [];
    this.schoolUsers = [];
    this.subAdminList = [];
    this.isSearching = true;
    if (this.userType == "driver") {
      this.currentPageDriver = currentPageCliked;
      this.p = currentPageCliked + 1;
      this.drivers();
    }
    if (this.userType == "lurnr") {
      this.lurners();
    }
    if (this.userType == "school") {
      this.schools();
    }
    if (this.userType == "subadmin") {
      this.subAdmin();
    }


  }








  goToAddPage() {

    if (this.userType == "school") {
      this.router.navigate(['school-create']);
    }
    if (this.userType == "driver") {
      this.router.navigate(['driver-create']);
    }
    if (this.userType == "lurnr") {
      this.router.navigate(['user-create']);
    }
    if (this.userType == "subadmin") {
      this.router.navigate(['subadmin-create']);
    }
  }

  errorHandler(e) {
    console.log("event error img", e);
    e.target.src = "assets/images/userPlaceholder.png";
  }

  chooseUser() {
    this.txtSearch = '';
    localStorage.setItem('userType', this.userType)
    if (this.userType == "school") {
      this.schools();
      this.showBtn = true;
      this.isschoolUsers = true;
      this.isSubAdmin = false;
      this.isUsers = false;
      this.key = "school.contactPersonName";
    }

    if (this.userType == "driver") {
      this.drivers();
      this.showBtn = true;
      this.isschoolUsers = false;
      this.isUsers = true;
      this.isSubAdmin = false;
      this.verifiedIcon = true;
      this.key = "firstName"
      this.isSchoolNameShow = true;
    }

    if (this.userType == "lurnr") {
      this.lurners();
      //  this.users = this.temp.filter(ob => ob.userType == "LURNR");
      this.showBtn = true;
      this.isschoolUsers = false;
      this.isUsers = true;
      this.isSubAdmin = false;
      this.key = "firstName";
      this.isSchoolNameShow = false;
    }

    if (this.userType == "subadmin") {
      this.subAdmin();
      this.showBtn = true;
      this.isschoolUsers = false;
      this.isUsers = false;;
      this.isSubAdmin = true
      this.key = "firstName";
      this.isSchoolNameShow = false;
    }

  }

  chooseFilter() {
    this.setFilterData(this.selectFilter);
  }


  key = ''; // sort default by name
  reverse = false;

  sortList(key) {

    this.key = key;
    this.reverse = !this.reverse;
  }

  setFilterData(status = "all") {
    this.users = this.temp;
    console.log(this.users, 'user data')
    var ox = [];
    if (status != "all") {


      if (status == "conferm") {
        for (var i = 0; i < this.users.length; i++) {
          if ((this.users[i].documents.length > 0) && (this.users[i].documents != undefined) && (parseInt(this.users[i].documents[0].isVerified) == 1 && parseInt(this.users[i].documents[1].isVerified) == 1)) {
            this.check = true;
            this.cross = false;
            ox.push(this.users[i]);

          }
        }
      }
      if (status == "notverified") {
        for (var i = 0; i < this.users.length; i++) {
          if ((this.users[i].documents != undefined || this.users[i].documents != []) && this.users[i].documents.length > 1) {
            if
              ((parseInt(this.users[i].documents[0].isVerified) == 0 && parseInt(this.users[i].documents[1].isVerified) == 0)
              ||
              (parseInt(this.users[i].documents[0].isVerified) == 2 && parseInt(this.users[i].documents[1].isVerified) == 2)
            ) {
              this.check = false;
              this.cross = true;
              ox.push(this.users[i]);

            }
          } else {
            ox.push(this.users[i]);
          }
        }
      }
      this.users = ox;
      console.log(this.users, 'user data 2')


    } else {
      this.check = false;
      this.cross = false;
      this.drivers();


    }
  }

  isApproved(item) {
    let documents = item.documents;
    console.log(documents);
    if (documents != [] && documents.length == 2) {
      if (documents[0].isVerified == 1 && documents[1].isVerified == 1) {

        return true;
      }
    }

    return false;
  }
  isVerified(item) {

    if (item.isArchived == true) {
      return "Enable";
    }
    return "Disable";
  }

  setClass(item) {

    if (item.isArchived == true) {
      return "enableBtn";
    }
    return "disableBtn";
  }




}
