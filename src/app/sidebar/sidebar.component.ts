import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VarService } from '../service/var.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  tabActive: any;



  constructor(private router: Router,

    public varCtrl: VarService, ) {

     }

  ngOnInit() {
  }


  clearUserType() {
    if (localStorage.getItem('userType') != null) {
      localStorage.removeItem('userType')
    }
  }



  logOut() {
    var r = window.confirm("Do You want to Log Out..!")
    if (r == true) {

      localStorage.removeItem('adminDetail');
      localStorage.removeItem('userType');
      localStorage.removeItem('schoolCountry');
      localStorage.removeItem('schoolState');
      localStorage.removeItem('schoolCity');
      this.varCtrl._opened = !this.varCtrl._opened;
      setTimeout(() => {
        this.router.navigate(['login'])
      }, 1000);

    } else {
      return;
    }

  }

}
