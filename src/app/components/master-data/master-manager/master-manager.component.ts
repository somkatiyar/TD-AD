import { Component, OnInit, Inject } from '@angular/core';
import { DataService } from '../../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../../service/var.service';
import { Router, ActivatedRoute } from '@angular/router';
import { OrderPipe } from 'ngx-order-pipe';

@Component({
  selector: 'app-master-manager',
  templateUrl: './master-manager.component.html',
  styleUrls: ['./master-manager.component.css']
})
export class MasterManagerComponent implements OnInit {

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
  isContry: boolean = false;
  isState: boolean = false;
  isCity: boolean = false;
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
  }
  chooseUser(value) {

    console.log(this.userType);
    if (this.userType == "attribute") {
      this.router.navigate(['attribute'])
    }

    if (this.userType == "doc_type") {
      this.router.navigate(['document'])
    }
    if (this.userType == "gearType") {
      this.router.navigate(['gearType'])
    }


    if (this.userType == "curriculam") {
      this.router.navigate(['curriculam'])
    }

    if (this.userType == "package") {
      this.router.navigate(['package'])
    }

    if (this.userType == "slot") {
      this.router.navigate(['slot'])
    }

    if (this.userType == "tax") {
      this.router.navigate(['tax'])
    }

    if (this.userType == "vechical_type") {
      this.router.navigate(['vehicle'])
    }
    if (this.userType == "country") {
      this.router.navigate(['country'])
    }
    if (this.userType == "state") {
      this.router.navigate(['state'])
    }
    if (this.userType == "city") {
      this.router.navigate(['city'])
    }
    if (this.userType == "rideRate") {
      this.router.navigate(['ride-rate'])
    }

  }
}
