import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from 'src/app/service/var.service';
import { ConnectionService } from 'ng-connection-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  
 status = 'ONLINE';
 isConnected = true;

  constructor(
    private connectionService: ConnectionService,
    private router: Router,
    private varCtrl: VarService,
  ) {

    this.varCtrl.isSideBar = true;
    this.varCtrl.isHeader = true;
    this.varCtrl.isTitle = true;
    this.varCtrl.title = "Dashboard";
  }

ngOnInit() {
 // this.connectionCheck();
  }

 

}
