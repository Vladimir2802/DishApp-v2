import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesService} from './shared/services/categories.service';
import {CafeComponent} from './cafe/cafe.component';
import {CafeService} from './shared/services/cafe.service';
import {DishComponent} from './categories/dish/dish.component';
import {CreateCafeComponent} from './create-cafe/create-cafe.component';
import {TablesService} from './shared/services/table.service';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      // {path: 'home', component: HomeComponent,},
      {path: 'create-cafe', component: CreateCafeComponent},
      {path: 'cafe', component: CafeComponent, resolve: {data: CafeService}},
      // {path: ':id/table', component: TableComponent, resolve: {data: TablesService}},
      {path: ':id/categories', component: CategoriesComponent, resolve: {data: CategoriesService}},
      {
        path: ':id/categories', component: CategoriesComponent, resolve: {data: CategoriesService}, children: [
          {path: 'dishes', component: DishComponent}]
      },
      {path: '', redirectTo: 'cafe', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MainRoutingModule {
}
