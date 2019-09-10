import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DishService} from '../../shared/services/dish.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss']
})
export class DishComponent implements OnInit {
  @Input() categoryId: any;

  @Input() newDishes: any = [];
  dishGroup: FormGroup;
  ingredientsGroup: FormGroup;
  ingredients: any = [];
  complete: boolean = false;
  newFile: any;
  dishId: any;
  @Input() condition: boolean;
  @Output() conditionForm: any = new EventEmitter<any>();
  text: any = {};
  readonly: boolean = true;
  readonlyDishes: boolean = true;
  hide: boolean = true;

  updateDishGroup: FormGroup;

  constructor(public dishService: DishService,
              public activatedRoute: ActivatedRoute,
              public categoriesService: CategoriesService,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.dishGroup = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      priceWeight: ['0'],
      // image: [null],
      weight: [''],
      lang: ['en']
    });
    this.updateDishGroup = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      priceWeight: ['0'],
      image: [null],
      weight: [''],
      lang: ['en']
    });
    this.ingredientsGroup = this.fb.group({
      name: [''],
      price: ['']
    });
  }

  toggle(state?) {
    this.condition = !this.condition;
    if (state === 'hide') {
      this.hide = false;
    } else {
      this.hide = true;
    }
    if (!this.condition) {
      this.conditionForm.emit(this.condition);
    }
  }


  newGetDish(id: any) {
    this.dishId = id;
    this.dishService.getIndex(id)
      .subscribe(res => {
        this.dishGroup.patchValue(res['data']);
        this.dishGroup.patchValue({lang: 'en'});
      });
  }

  getDish(id: any) {
    this.dishService.getIndex(this.categoryId)
      .subscribe(res => {
        this.dishGroup.patchValue(
          {
            name: res['name'],
            description: res['description'],
            price: res['price'],
            priceWeight: ['priceWeight'],
            image: ['image'],
            weight: ['weight'],
            lang: ['en']
          });
      });
  }

  newGetDishesById() {
    this.dishService.getAll(this.categoryId)
      .subscribe(res => {
        this.newDishes = res['data'];
        this.newDishes.forEach(item => {
          item.edit = true;
        });
        // console.log(this.newDishes);
      });
  }

  getAllIngredients(id) {
    console.log(this.dishId);
    // this.dishService.getAll(this.)
  }

  addDish() {
    this.dishService.createDish(this.newPrepareFormData())
      .subscribe(res => {
        this.dishId = res['data']['id'];
        this.newGetDishesById();
        this.addIngredients(res['data']['id']);
      });
  }

  addIngredientsItem() {
    if (!this.complete) {
      this.addDish();
      this.complete = true;
    } else {
      this.addIngredients(this.dishId);
    }
  }

  addDishItem() {
    if (!this.complete) {
      this.addDish();
      // this.dishGroup.reset('');
    } else {
      this.toggle();
    }
  }

  addIngredients(id) {
    this.dishService.createIngredients(this.newPrepareFormDataIngredients(id))
      .subscribe(res => {
        this.ingredients.push(res['data']);
        console.log(this.ingredients);
        this.ingredientsGroup.patchValue({
          name: '',
          price: ''
        });
      });
  }



  newPrepareFormDataIngredients(id) {
    let fb = new FormData();
    for (let prop in this.ingredientsGroup.value) {
      if (this.ingredientsGroup.value.hasOwnProperty(prop)) {
        fb.append(`${prop}`, this.ingredientsGroup.value[prop]);
      }
    }
    fb.append('dishId', id);
    fb.append('lang', 'en');
    return fb;
  }

  dblClickDishes(menu) {
    menu.edit = false;
    this.updateDishGroup.patchValue({
      name: menu.name,
      description: menu.description,
      price: menu.price,
      // priceWeight: menu.priceWeight,
      weight: menu.weight,
    });
  }

  newPrepareFormData() {
    let fd = new FormData();
    for (let prop in this.dishGroup.value) {
      if (this.dishGroup.value.hasOwnProperty(prop)) {
        fd.append(`${prop}`, this.dishGroup.value[prop]);
      }
    }
    fd.append('image', this.newFile);
    fd.append('categoryId', this.categoryId);
    fd.append('lang', 'en');
    return fd;
  }

  updateDish(dish) {
    this.dishId = dish.id;
    this.dishService.updateDish(this.dishId, this.newPrepareFormDataDb())
      .subscribe(res => {
        this.newGetDishesById();
      });

  }

  newPrepareFormDataDb() {
    let fd = new FormData();
    for (let prop in this.updateDishGroup.value) {
      if (this.updateDishGroup.value.hasOwnProperty(prop)) {
        fd.append(`${prop}`, this.updateDishGroup.value[prop]);
      }
    }
    fd.append('image', this.newFile);
    fd.append('categoryId', this.categoryId);
    return fd;
  }

  newAddPhoto(event) {
    this.newFile = event.target.files[0];
  }

  deleteDish(id) {
    this.dishService.delete(id)
      .subscribe(res => {
        console.log(res);
        if (res['success']) {
          this.newDishes = this.newDishes.filter(item => {
              return item.id !== id;
            }
          );
        }
      });
  }


  changeDishesUpdate(item) {
    if (this.dishGroup.value.name !== this.text.dishGroup) {
      this.dishService.updateDish(item.id, {
        name: this.dishGroup.value.name,
        description: this.dishGroup.value.description,
        lang: 'en',
      })
        .subscribe(res => {
          item.name = res['data']['name'];
          item.edit = !item.edit;
          this.readonly = !this.readonly;
        });
    }
  }


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.newDishes, event.previousIndex, event.currentIndex);
    let id1 = this.newDishes[event.previousIndex].id;
    let id2 = this.newDishes[event.currentIndex].id;
    if (id1 === id2) {
      return;
    }

    this.dishService.swap(id1, id2)
      .subscribe(res => {
        console.log(res);
      });
  }


}
