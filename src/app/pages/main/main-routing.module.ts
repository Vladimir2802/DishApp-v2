import {NgModule} from '@angular/core';
import {MainComponent} from './main.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CategoriesComponent} from './categories/categories.component';
import {CategoriesService} from './shared/services/categories.service';
import {CafeComponent} from './cafe/cafe.component';
import {CafeService} from './shared/services/cafe.service';
// import {DishComponent} from './categories/dish/dish.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {path: 'home', component: HomeComponent},
      {path: 'cafe', component: CafeComponent, resolve: {data: CafeService}},
      {path: ':id/categories', component: CategoriesComponent, resolve: {data: CategoriesService}},
      // {path: ':id/categories', component: CategoriesComponent, resolve: {data: CategoriesService}, children: [
      //     {path: 'dishes', component: DishComponent}]},
      {path: '', redirectTo: 'home', pathMatch: 'full'}
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
