import {Injectable} from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService implements Resolve<any> {

  newMenuId: any;

  constructor(public request: RequestService) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    this.newMenuId = route.params['id'];
    return this.getIndex(route.params['id']);
  }

  getIndex(id = null) {
    return this.request.get(`${APP_URL.category.all}?menu_id=${id ? id : this.newMenuId}`);
  }

  getAll() {
    // const url = this.constHelper.url(this.serviceName, 'all');
    return this.request.get(APP_URL.category.all);
  }

  create(data) {
    return this.request.post(APP_URL.category.store, data);
  }

  update(data, id) {
    return this.request.post(APP_URL.category.update + id.toString(), data);
  }

  delete(id) {
    return this.request.delete(`${APP_URL.category.delete}/${id}`); // id: Category
  }

  swap(id1, id2){
    return this.request.post(`${APP_URL.category.swap}/${id1}/${id2}`,{});
  }
}
