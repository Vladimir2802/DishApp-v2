// import {Component, Input, OnInit} from '@angular/core';
// import {DishService} from '../../shared/services/dish.service';
// import {FormBuilder, FormGroup} from '@angular/forms';
// import {CategoriesService} from '../../shared/services/categories.service';
// import {ActivatedRoute} from '@angular/router';
//
// @Component({
//   selector: 'app-dish',
//   templateUrl: './dish.component.html',
//   styleUrls: ['./dish.component.scss']
// })
// export class DishComponent implements OnInit {
//
//   @Input() dishes: any;
//   newCategories: any;
//   newDishId: any;
//   newDishes: any = [];
//   dishGroup: FormGroup;
//   newCategoryId: any;
//
//   constructor(public dishService: DishService,
//               public activatedRoute: ActivatedRoute,
//               public categoriesService: CategoriesService,
//               public fb: FormBuilder) { }
//
//   ngOnInit() {
//     // this.newCategories = this.activatedRoute.snapshot.data['data']['data'];
//     this.dishGroup = this.fb.group({
//       name: [''],
//       description: [''],
//       price: [''],
//       priceWeight: ['0'],
//       image: [null],
//       weight: [''],
//       lang: ['en']
//     });
//     this.newCategoryId = this.newCategories[0].id;
//     console.log(this.newCategoryId);
//     // console.log(this.newGetDishesById(this.newCategoryId));
//   }
//
//   newGetDish(id: any) {
//     this.dishService.getIndex(id)
//       .subscribe(res =>{
//         console.log(res);
//       })
//   }
//
//   // newGetDishesById(id: any) {
//   // this.newCategoryId = id;
//   // this.dishService.getAll(id)
//   //   .subscribe(res => {
//   //     this.newDishes = res['data'];
//   //     console.log(this.newDishes);
//   //   })
//   // }
//
// }
