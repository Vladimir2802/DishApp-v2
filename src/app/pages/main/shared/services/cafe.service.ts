import {Injectable} from '@angular/core';
import {RequestService} from '../../../../shared/services/request.service';
import {APP_URL} from '../../../../shared/constants/common.url';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CafeService implements Resolve <any> {

  position: any = {
    lat: '',
    lng: ''
};

  private selectedMenu: number;

  constructor(public request: RequestService) {
  }


  resolve(): Observable<any> | any {
    return this.getAll();
  }

  getAll() {
    return this.request.get(APP_URL.cafe.all);
  }

  getIndex(id) {
    return this.request.get(`${APP_URL.cafe.one}/${id}`);
  }

  storeCafe(data) {
    return this.request.post(APP_URL.cafe.store, data);
  }

  updateCafe(id, data) {
    return this.request.post(`${APP_URL.cafe.update}${id}`, data);
  }

  deleteCafe(id: any) {
    return this.request.delete(`${APP_URL.cafe.delete}/${id}`);
  }

  setPosition(lat, lng) {
    this.position.lat = lat;
    this.position.lng = lng;
  }

  getPosition(){
    return  this.position;
  }

  setSelectedMenu(id: number){
    this.selectedMenu = id;
  }

  getSelectedMenu(){
    return this.selectedMenu;
  }
}
