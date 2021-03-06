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
import {MatGridListModule, MatTooltipModule} from '@angular/material';
import { TableComponent } from './cafe/table/table.component';
import {AutosizeModule} from 'ngx-autosize';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    MenusComponent,
    CategoriesComponent,
    CafeComponent,
    DishComponent,
    CreateCafeComponent,
    TableComponent,
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
    MatGridListModule,
    MatTooltipModule,
    AutosizeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
  ],
  exports: [
    NgxMaterialTimepickerModule
  ]
})
export class MainModule {
}
