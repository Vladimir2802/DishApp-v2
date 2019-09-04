import {Injectable} from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';

@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor(public request: RequestService) {
  }

  getAll(id: any) {
    return this.request.get(`${APP_URL.dish.all}?category_id=${id}`);
  }
  updateDish(id,data){
    return this.request.post(`${APP_URL.dish.one}/${id}`,data);
  }
  getIndex(id){
    return this.request.get(`${APP_URL.dish.one}/${id}`);
  }
  createDish( data) {
    return this.request.post(APP_URL.dish.create, data);
  }

  delete(id) {
    return this.request.delete(`${APP_URL.dish.delete}/${id}`);
  }

  swap(id1, id2){
    return this.request.post(`${APP_URL.dish.swap}/${id1}/${id2}`, {});
  }
}
