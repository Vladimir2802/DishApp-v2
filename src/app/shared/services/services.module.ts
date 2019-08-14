import { NgModule } from '@angular/core';
import {RequestService} from './request.service';
import {MenuService} from '../../pages/main/shared/services/menu.service';

@NgModule({
  providers: [
    RequestService,
    MenuService
  ]
})
export class ServicesModule {
}
