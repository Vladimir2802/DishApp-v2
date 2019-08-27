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
    SharedModule
  ]
})
export class MainModule {
}
