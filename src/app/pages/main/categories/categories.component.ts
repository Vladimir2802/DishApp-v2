import {Component, OnInit, EventEmitter} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoriesService} from '../shared/services/categories.service';
import {DishService} from '../shared/services/dish.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  constructor(public route: ActivatedRoute,
              public categoriesService: CategoriesService,
              public dishService: DishService,
              public fb: FormBuilder) {
  }

  animationCategoryIndex; animationCategoryDurationTime; animationCategoryDirectionRight: boolean;
  categories: any = [];
  file: any;
  dishes: any = [];
  lastDishes: any = [];
  dishId: any;
  condition = true;
  newCategory: any;
  categoryId: any;
  lastCategoryId: any;
  lastCategoryIndex: any;
  editingCategoryId: number; editingCategoryInput: string;

  createPopup = false;
  showMoreCategoriesArrows: boolean;

  lowestPagginationNumber; higestPagginationNumber;

  dishGroup: FormGroup;

  private tout;

  ngOnInit() {
    this.categories = this.route.snapshot.data.data.data;
    this.getDishsById(this.categories[0].id, 0);
    this.lowestPagginationNumber = 0; this.higestPagginationNumber = 6;
    if (this.categories.length > 6) {this.showMoreCategoriesArrows = true; } else {this.showMoreCategoriesArrows = false; }
  }


  deleteCategory(id, index) {
    this.categoriesService.delete(id)
      .subscribe(res => {
        if (res['success']) {
          this.categories = this.categories.filter(item => {
            return item.id !== id;
          });
          if (this.categories.length > 6) {this.showMoreCategoriesArrows = true; } else {this.showMoreCategoriesArrows = false; }
          this.changeCategoriesPage(true, index);
        }
      });
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    const id1 = this.categories[event.previousIndex].id;
    const id2 = this.categories[event.currentIndex].id;
    if (id1 === id2) { return; }

    this.categoriesService.swap(id1, id2)
      .subscribe(res => {
        console.log(res);
      });
  }

  addCategory() {
    this.categoriesService.create(
      {
        lang: 'en',
        name: this.newCategory,
        menu_id: this.route.snapshot.params['id']
      })
      .subscribe(res => {
        this.categoriesService.getIndex()
          .subscribe(res => {
            this.categories = res['data'];
            this.newCategory = '';
            this.createPopup = false;
            if (this.categories.length > 6) {this.showMoreCategoriesArrows = true; } else {this.showMoreCategoriesArrows = false; }
            this.changeCategoriesPage(true, this.categories.length);
          });
      });
  }


  getDishsById(id: any, i) {
    if (i < this.lastCategoryIndex) {
      this.animationCategoryDirectionRight = false;
    } else {
      this.animationCategoryDirectionRight = true;
    }
    this.lastCategoryId = this.categoryId;
    this.categoryId = id;
    this.lastDishes = this.dishes;
    this.animationCategoryDurationTime = 0;
    if (i < this.lastCategoryIndex) {
      this.animationCategoryDirectionRight = false;
      this.animationCategoryIndex = 1;
    } else {
      this.animationCategoryDirectionRight = true;
      this.animationCategoryIndex = 0;
    }
    this.dishService.getAll(id)
      .subscribe(res => {
        this.dishes = res['data'];
        this.dishes.forEach(item => {
          item.edit = true;
          item.readOnly = true;
        });
        if (!this.condition) {
          this.condition = true;
        }
        // this.activeCategory(i);
        this.animationCategoryDurationTime = 1000;
        if (this.animationCategoryDirectionRight) {
          this.animationCategoryIndex = 1;
        } else {
          this.animationCategoryIndex = 0;
        }
        this.lastCategoryIndex = i;
      });
  }
  //
  // private tout;
  //
  // activeCategory(i) {
  //   const act = document.querySelectorAll('.example-box');
  //   const mw = document.querySelector('.menu');
  //   const act = document.querySelectorAll('.example-box');
  //   const mw = document.getElementsByClassName('.menu');
  //   act.forEach(item => {
  //     item.classList.remove('active__category');
  //   });
  //
  //   mw[0].classList.remove('anim-hide-infinite');
  //   mw[1].classList.remove('anim-show-infinite');
  //   // @ts-ignore
  //   mw[0].offsetWidth;
  //   // @ts-ignore
  //   mw[0].classList.add('anim-hide-infinite');
  //   // @ts-ignore
  //   mw[1].offsetWidth;
  //   // @ts-ignore
  //   mw[1].classList.add('anim-show-infinite');
  //
  //   act[i].classList.add('active__category');
  //
  // }

  eventEmit(ev) {
    this.condition = ev;
  }

  changeCategoriesPage(next: boolean, elementToScrollIndex?: number) {
      if (next) {
        if (this.higestPagginationNumber < this.categories.length) {
          this.lowestPagginationNumber += 1;
          this.higestPagginationNumber += 1;
        } else {
          this.changeCategoriesPage(false);
        }
      } else {
        if (this.lowestPagginationNumber > 0) {
          this.lowestPagginationNumber -= 1;
          this.higestPagginationNumber -= 1;
        }
      }

      if (elementToScrollIndex) {
        if (elementToScrollIndex > this.higestPagginationNumber) {
          this.changeCategoriesPage(true, elementToScrollIndex);
        }
      }
    }

  editCategory(category: any) {
    if (this.editingCategoryId === category.id) {
      this.saveCategoryName(category);
      this.editingCategoryId = undefined;
    } else {
      this.editingCategoryId = category.id;
      this.editingCategoryInput = category.name;
    }
  }

  saveCategoryName(category: any) {
    const categoryData = new FormData();
    categoryData.append('name', this.editingCategoryInput);
    categoryData.append('lang', 'en');

    this.categoriesService.update(categoryData, category.id)
      .subscribe(data => {
        // @ts-ignore
        category.name = data.data.name;
      });
  }

}
