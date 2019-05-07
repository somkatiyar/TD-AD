import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from '../../service/dataservice.service';
import { Http } from '@angular/http';
import { VarService } from '../../service/var.service';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  details: any = {};
  userData: any = [];
  myForm: any;
  show : any;


  constructor(private myservice: DataService,
    private http: Http,
    private varCtrl: VarService,
    private loader: Ng4LoadingSpinnerService,
    private router: Router
  ) {

    this.varCtrl.isSideBar = false;
    this.varCtrl.isHeader = false;
    this.varCtrl.isTitle = false;

  }

  
  ngOnInit() {


    // this.getContries();
    // this.getStates();
    // this.getCities();




    this.myForm = new FormGroup({
      email: new FormControl("", Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl("", Validators.compose([
        Validators.required,
      ])),
    })

  }

  getStates() {

   let body = {};
    this.myservice
      .postCall('common/states', body)
      .subscribe(res => {
        if (res["status"] ) {
          localStorage.setItem('states', JSON.stringify(res['data']));
        } else {
        }
      }, err => {
      });

  }

  getCities() {

    let body = {};
    this.myservice
      .postCall('common/cities', body)
      .subscribe(res => {
        if (res["status"] ) {
          localStorage.setItem('cities',JSON.stringify(res['data']));
        } else {
        }
      }, err => {
      });
  }



  getContries() {

    let body = {token:'abc'};
    this.myservice
      .postCall('common/countries', body)
      .subscribe(res => {
        if (res["status"] ) {
          console.log(res['data'],'datatatat')
          localStorage.setItem('countries', JSON.stringify(res['data']));
        } else {
        }
      }, err => {
      });

  }

  login() {

    this.loader.show();
    let body = this.details;
    this.myservice
      .postCall('admin/login', body)
      .subscribe(res => {
        if (res["status"] ) {
           this.getContries();
           this.getStates();
           this.getCities();
 
          localStorage.setItem('adminDetail', JSON.stringify(res['data']));
          console.log(localStorage.getItem('adminDetail'));
          this.myservice.success("Login Successfully..!");
          setTimeout(()=>{
            this.router.navigateByUrl('dashboard');
          }, 1000);
        } else {
          this.myservice.error(res['message']);

        }
      }, err => {
      });
  }

  showHidePass() {

    this.show = !this.show;
  }



}


