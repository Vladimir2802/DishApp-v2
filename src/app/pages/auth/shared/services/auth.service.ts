import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {APP_URL} from '../../../../shared/constants/common.url';
import {RequestService} from '../../../../shared/services/request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public request: RequestService) {
  }
  signIn(data: any): Observable<any> | any {
    return this.request.post(APP_URL.auth.login, data);
  }
}
