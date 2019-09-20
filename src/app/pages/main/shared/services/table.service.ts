import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService implements Resolve <any> {

  newCafeId: any;

  constructor(public  request: RequestService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    this.newCafeId = route.params['id'];
    return this.getAll(route.params['id']);
  }

  getAll(id: any) {
    return this.request.get(`${APP_URL.table.all}?hall_id=${id}`);
  }

  delete(id:any){
    return this.request.delete(`${APP_URL.table.delete}/${id}`);
  }

  createTable(data){
    return this.request.post(APP_URL.table.store, data);
  }

  updateTable(id:any, data){
    return this.request.post(`${APP_URL.table.update}/${id}`, data);
  }




}

