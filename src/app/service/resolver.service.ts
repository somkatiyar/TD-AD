import { Injectable, Inject } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Http, Headers, RequestOptions } from '@angular/http';

import { DataService } from './dataservice.service';

@Injectable({
  providedIn: 'root'
})

export class ResolverService implements Resolve<any> {

  constructor(private renderData : DataService,
    @Inject('baseURL') private baseURL: string,) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){

  console.log(route,'route')
    return this.renderData.postCall(route, state);

  }


}
