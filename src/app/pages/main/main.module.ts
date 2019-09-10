import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainComponent} from './main.component';
import {HomeComponent} from './home/home.component';
import {MainRoutingModule} from './main-routing.module';
import {SharedModule} from '../../shared/shared.module';
import {MenusComponent} from './menus/menus.component';
import {CategoriesComponent} from './categories/categories.component';
import {CafeComponent} from './cafe/cafe.component';
import {DishComponent} from './categories/dish/dish.component';
import { CreateCafeComponent } from './create-cafe/create-cafe.component';

import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

import { AgmCoreModule } from '@agm/core';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MenusComponent,
    CategoriesComponent,
    CafeComponent,
    DishComponent,
    CreateCafeComponent,
  ],
  imports: [
    MainRoutingModule,
    CommonModule,
    SharedModule,
    NgxMaterialTimepickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDGNinnVlrH3QrIyL5Abo2Z42aDJ4KLW3c',
      libraries: ['places']

    }),
    MatGoogleMapsAutocompleteModule.forRoot(),
],
  exports: [
    NgxMaterialTimepickerModule
  ]
})
export class MainModule {
}
