import {Component, Input, OnInit} from '@angular/core';
import {DishService} from '../../shared/services/dish.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CategoriesService} from '../../shared/services/categories.service';
import {ActivatedRoute} from '@angular/router';

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
  }

  newGetDish(id: any) {
    this.dishId = id;
    this.dishService.getIndex(id)
      .subscribe(res =>{
        this.dishGroup.patchValue(res['data']);
        this.dishGroup.patchValue({lang: 'en'})
      })
  }

  newGetDishesById() {
  this.dishService.getAll(this.categoryId)
    .subscribe(res => {
      this.newDishes = res['data'];
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



}
