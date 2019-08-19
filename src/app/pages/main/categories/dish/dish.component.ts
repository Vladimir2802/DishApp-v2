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
  newCategories: any;
  newDishId: any;
  @Input() newDishes: any = [];
  dishGroup: FormGroup;
  newCategoryId: any;
  newFile: any;
  dishId: any;
  @Input() condition: boolean;
  @Output() conditionForm: any = new EventEmitter<any>();
  text: any = {};
  readonly: boolean = true;
  btnSaveCheck: boolean = true;


  constructor(public dishService: DishService,
              public activatedRoute: ActivatedRoute,
              public categoriesService: CategoriesService,
              public fb: FormBuilder) { }

  ngOnInit() {
    // this.newCategories = this.activatedRoute.snapshot.data['data']['data'];
    this.dishGroup = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      priceWeight: ['0'],
      image: [null],
      weight: [''],
      lang: ['en']
    });
    console.log(this.newDishes);
    console.log(this.condition);
    // this.getDish(this.categoryId);
    // this.getDish();
  }

  toggle() {
    this.condition = !this.condition;
    if (!this.condition) {
      this.conditionForm.emit(this.condition);
    }
  }

  newGetDish(id: any) {
    this.dishId = id;
    this.dishService.getIndex(id)
      .subscribe(res =>{
        this.dishGroup.patchValue(res['data']);
        this.dishGroup.patchValue({lang: 'en'})
      })
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
          })
      })
  }

  newGetDishesById() {
  this.dishService.getAll(this.categoryId)
    .subscribe(res => {
      this.newDishes = res['data'];
      console.log(this.newDishes);
    })
  }
  addDish() {
    this.dishService.createDish(this.newPrepareFormData())
      .subscribe(res => {
        console.log(res);
        this.dishGroup.reset('');
        this.newGetDishesById();
      });
  }
  updateDish() {
    this.dishService.updateDish(this.dishId, this.newPrepareFormData())
      .subscribe(res => {
        this.newGetDishesById();
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
    console.log(this.categoryId);
    fd.append('categoryId', this.categoryId);
    return fd;
  }

  newAddPhoto(event) {
    console.log(event.target.files[0]);
    this.newFile = event.target.files[0];
  }
  deleteDish(id) {
    this.dishService.delete(id)
      .subscribe(res => {
        console.log(res);
        if(res['success'] ) {
          this.newDishes = this.newDishes.filter(item => {
              return item.id !== id;
            }
          )
        }
      })
  }

  drop(event: CdkDragDrop<{title: string, poster: string}[]>) {
    moveItemInArray(this.newDishes, event.previousIndex, event.currentIndex);
  }

  changeDishesUpdate(id) {
    if(this.dishGroup.value.name !== this.text.dishGroup) {
      this.dishService.updateDish(id, {
        name: this.dishGroup.value.name,
        description: this.dishGroup.value.description
      })
        .subscribe(res => {
          this.dishGroup.patchValue({name: res['data']['name']});
        })
    }
  }
inputValue() {
    this.readonly = !this.readonly;
}

saveCheck() {
    this.btnSaveCheck = !this.btnSaveCheck;
}

}
