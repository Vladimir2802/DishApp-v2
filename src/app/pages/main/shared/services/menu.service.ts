import {Injectable} from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService implements Resolve<any>{
  constructor(public request: RequestService) {
  }
  resolve(): Observable<any> | any {
    return this.getAll();
  }
  getAll(): Observable<any> | any {
    return this.request.get(APP_URL.menu.all);
  }
}
