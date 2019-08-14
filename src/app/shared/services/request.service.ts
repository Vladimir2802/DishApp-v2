import {Injectable} from '@angular/core';
import {Api} from '../interfaces/api.interface';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RequestService implements Api {
  constructor(public http: HttpClient) {
  }
  public get(url: string) {
    return this.http.get(url);
  }
  public post(url: string, credentials: any) {
    return this.http.post(url, credentials);
  }
  public delete(url: string) {
    return this.http.delete(url);
  }
  public put(url: string, credentials: any) {
    return this.http.put(url, credentials);
  }
}
