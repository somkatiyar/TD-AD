import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { VarService } from './service/var.service';
import { DataService } from './service/dataservice.service';
import { ActivatedRoute } from '@angular/router';
import { ConnectionService } from 'ng-connection-service';

import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  currentUrl = "";

  constructor(public varCtrl: VarService,
    public myService: DataService, public route: ActivatedRoute,
    private router: Router,
    private connectionService: ConnectionService,
    private cd: ChangeDetectorRef
  ) {
   


  }


ngOnInit() {

  
  
}


  onActivate(event) {
    window.scroll(200,200);
    this.currentUrl = this.route.snapshot.firstChild.url[0].path;
    this.connectionCheck();
    
  }
  connectionCheck() {


    this.connectionService.monitor().subscribe(isConnected => {
      isConnected = isConnected;

      if (isConnected) {
        //     status = "ONLINE";
        //  this.router.navigate([this.currentUrl]);
      }
      else {
        status = "OFFLINE";
        this.varCtrl.isSideBar = false;
        this.varCtrl.isHeader = false;
        this.varCtrl.isTitle = false;

        this.router.navigate(['bad-connection', this.currentUrl], { skipLocationChange: true })
      }
    })

  }
}
