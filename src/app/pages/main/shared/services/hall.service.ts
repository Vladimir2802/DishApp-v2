import { Injectable } from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';
import {ActivatedRouteSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  newHallId: any;

  constructor(public request: RequestService) { }

  resolve(route: ActivatedRouteSnapshot){
    this.newHallId = route.params['id'];
    return this.getAll(route.params['id']);
  }

  getAll(id:any){
    return this.request.get(`${APP_URL.hall.all}?cafe_id=${id}`);
  }
}
