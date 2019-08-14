import {Injectable} from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements Resolve<any> {

  menuId: any;

  constructor(public request: RequestService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    this.menuId = route.params['id'];
    console.log(route);
    return this.getIndex(route.params['id']);
  }

  getIndex(id = null) {
    console.log(id);
    return this.request.get(`${APP_URL.category.all}?menu_id=${id ? id : this.menuId}`);
  }

  getAll() {
    // const url = this.constHelper.url(this.serviceName, 'all');
    return this.request.get(APP_URL.category.all);
  }

  create(data) {
    return this.request.post(APP_URL.category.store, data);
  }

  delete(id) {
    return this.request.delete(`${APP_URL.category.delete}${id}`); // id: Category
  }
}
