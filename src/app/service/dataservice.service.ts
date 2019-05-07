import { Injectable, Inject, ViewContainerRef } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import 'rxjs/Rx';


import { Observable, throwError } from 'rxjs';
import { resolve } from 'q';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { VarService } from './var.service';



declare var toastr: any;
@Injectable({
  providedIn: 'root'
})
export class DataService {


  
  constructor(private http: Http,

    @Inject('baseURL') private baseURL: string,
    private router : Router,
    @Inject('picUrl') private picUrl: string,
    private ctrl : VarService


  ) {

  }

  success(title: string, message?: string) {
    toastr.success(title, message);
  }

  error(title: string, message?: string) {
    toastr.error(title, message);
  }

  getCall(endpoint) {
    return this.http.get(this.baseURL + endpoint).map(response => response.json());
  }

  postCall(endpoint, requestJSON) {
    this.ctrl.isLoading = true;

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
  
    return this.http.post(this.baseURL + endpoint, requestJSON, options)
    .timeout(20000)
    
 
    .map((response)=>response.json())  
      .do((response: Response | any)=>{
      if(response['status']==0 && response['errorCode']==1) {
        this.error(response['message'])
        this.checkErrorCode();
        console.log(response,'res from service')
        this.router.navigateByUrl('/login');
      }
    }).finally(()=>{
      this.ctrl.isLoading = false;
    })
   
  }


  checkErrorCode() {

    localStorage.removeItem('adminDetail');
    localStorage.removeItem('userType');
    localStorage.removeItem('schoolCountry');
    localStorage.removeItem('schoolState');
    localStorage.removeItem('schoolCity'); 
    localStorage.removeItem('cities'); 
    localStorage.removeItem('countries'); 
    localStorage.removeItem('states'); 
  
  }

  upload(body): Observable<any> {
    console.log('formdata value', body.getAll('id', 'fileType', 'file'));
    const headers: Headers = new Headers();
    console.log("the service data are", body);
    return this.http.post(this.baseURL + 'common/resourceUpload', body).map(response => response.json())
      .catch((err: Response | any) => {
        return Observable.throw(err.statusText);
      })
  }



 



}
