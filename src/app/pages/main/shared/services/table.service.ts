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
    return this.request.get(`${APP_URL.table.all}?cafe_id=${id}`);
  }

}
