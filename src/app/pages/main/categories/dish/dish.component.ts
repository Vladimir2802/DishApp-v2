import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DishService} from '../../shared/services/dish.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {ActivatedRoute} from '@angular/router';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {ToastrService} from 'ngx-toastr';

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
  ingredientsUpdateGroup: FormGroup;
  ingredients: any = [];
  complete: boolean = false;
  newFile: any;
  dishId: any;
  @Input() condition: boolean;
  @Input() isItCurrent: number;
  @Output() conditionForm: any = new EventEmitter<any>();
  text: any = {};
  readonly: boolean = true;
  readonlyDishes: boolean = true;
  hide: boolean = true;
  dishHaveBeenAdded: boolean;

  updateDishGroup: FormGroup;
  panelOpenState: boolean;

  constructor(public dishService: DishService,
              public activatedRoute: ActivatedRoute,
              public categoriesService: CategoriesService,
              public fb: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.initFormGroups();
  }

  toggle(state?) {
    this.condition = !this.condition;
    if (state === 'hide') {
      this.initFormGroups();
      this.hide = false;
    } else {
      this.initFormGroups();
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
            // image: ['image'],
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
      });
  }

  getAllIngredients(id) {
    // this.dishService.getAll(this.)
  }

  // addDish() {
  //   this.dishService.createDish(this.newPrepareFormData())
  //     .subscribe(res => {
  //       this.dishId = res['data']['id'];
  //       this.newGetDishesById();
  //       this.addIngredients(res['data']['id']);
  //     });
  // }

  addIngredientsItem() {
    if (this.ingredientsGroup.valid) {
      if (!this.complete) {
        this.addDish();
        this.complete = true;
      } else {
        this.addIngredients(this.dishId);
      }
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
        // console.log(this.ingredients);
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

  changeIngredientProperty(ingredient, dishIndex, ingIndex) {
    // @ts-ignore
    ingredient.name = document.getElementsByClassName('dish-search')[dishIndex].getElementsByClassName('ingredients-input__name')[ingIndex].value;
    // @ts-ignore
    ingredient.price = document.getElementsByClassName('dish-search')[dishIndex].getElementsByClassName('ingredients-input__price')[ingIndex].value;
  }

  newPrepareFormData() {
    let fd = new FormData();
    for (let prop in this.dishGroup.value) {
      if (this.dishGroup.value.hasOwnProperty(prop)) {
        fd.append(`${prop}`, this.dishGroup.value[prop]);
      }
    }
    if(this.newFile) {
      fd.append('image', this.newFile);
    }
    fd.append('categoryId', this.categoryId);
    fd.append('lang', 'en');
    return fd;
  }

  updateDish(dish) {
    this.dishId = dish.id;
    this.dishService.updateDish(this.dishId, this.newPrepareFormDataDb())
      .subscribe(res => {
        dish.ingredients.forEach((item, index) => {
          const fd = new FormData();
          fd.append('lang', 'en');
          fd.append('name', item.name);
          fd.append('price', item.price);
          this.dishService.updateIngredients(item.id, fd)
            .subscribe(data => {});
        });
        this.newFile = null;
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
    if(this.newFile) {
      fd.append('image', this.newFile);
    }
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

  initFormGroups() {
    this.dishHaveBeenAdded = false;
    this.newFile = undefined;
    this.ingredients.length = 0;
    this.dishGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^\\d+(\\.|\\,)\\d{2}$')]],
      priceWeight: ['0', [Validators.required, Validators.maxLength(8)]],
      // image: [null],
      weight: ['', [Validators.required, Validators.maxLength(8)]],
      lang: ['en']
    });
    this.updateDishGroup = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^\\d+(\\.|\\,)\\d{2}$')]],
      priceWeight: ['0', [Validators.required, Validators.maxLength(8)]],
      // image: [null],
      weight: ['', [Validators.required, Validators.maxLength(6)]],
      lang: ['en']
    });
    this.ingredientsGroup = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.maxLength(8), Validators.pattern('^\\d+(\\.|\\,)\\d{2}$')]]
    });
  }

  addDish() {
      if (!this.dishHaveBeenAdded) {
        const FD = new FormData();
        FD.append('lang', 'en');
        FD.append('name', this.dishGroup.controls.name.value);
        FD.append('description', this.dishGroup.controls.description.value);
        FD.append('image', this.newFile);
        FD.append('price', this.dishGroup.controls.price.value);
        FD.append('weight', this.dishGroup.controls.weight.value);
        FD.append('categoryId', this.categoryId);
        this.dishService.createDish(FD)
          .subscribe(data => {
            this.dishHaveBeenAdded = true;
            this.dishId = data['data']['id'];
            this.newGetDishesById();
          }, error => {
            this.toastr.error('ERROR');
          });
      }
  }

  cancelDishAdd() {
    if (this.dishHaveBeenAdded) {
      this.dishService.delete(this.dishId)
        .subscribe(data => {
          this.panelOpenState = false;
          this.newGetDishesById();
        });
    }else{
    }
  }

  addIngredient() {
    const FD = new FormData();
    FD.append('lang', 'en');
    FD.append('name', this.ingredientsGroup.controls.name.value);
    FD.append('price', this.ingredientsGroup.controls.price.value);
    FD.append('dishId', this.dishId);
    this.dishService.createIngredients(FD)
      .subscribe(res => {
        this.ingredients.push(res['data']);
        this.ingredientsGroup.patchValue({
          name: '',
          price: ''
        });
      });
  }
}
