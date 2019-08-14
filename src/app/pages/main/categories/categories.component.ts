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

  categories: any = [];

  // image: any = new EventEmitter<any>();

  file: any;

  dishes: any = [];

  dishId: any;

  newCategory: any;
  categoryId: any;

  createPopup: boolean = false;

  dishGroup: FormGroup;

  constructor(public route: ActivatedRoute,
              public categoriesService: CategoriesService,
              public dishService: DishService,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.categories = this.route.snapshot.data['data']['data'];
    this.dishGroup = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      priceWeight: ['0'],
      image: [null],
      weight: [''],
      lang: ['en']
    });
    this.categoryId = this.categories[0].id;
    // this.submitRegister();
  }


  deleteCategory(id) {
    this.categoriesService.delete(id)
      .subscribe(res => {
        if (res['success']) {
          this.categories = this.categories.filter(item => {
            return item.id !== id;
          });
        }
      });
  }

  //
  // deleteDishes(id) {
  //   this.dishService.delete(id)
  //     .subscribe(res =>{
  //       if(res['success']){
  //         this.dishService = this.dishId;
  //       }
  //     })
  // }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.dishes, event.previousIndex, event.currentIndex);
  // }

  addDish() {
    this.dishService.createDish(this.prepareFormData())
      .subscribe(res => {
        console.log(res);
        this.dishGroup.reset('');
        this.getDishsById(this.categoryId);
      });
  }

  prepareFormData() {
    let fd = new FormData();
    for (let prop in this.dishGroup.value) {
      if (this.dishGroup.value.hasOwnProperty(prop)) {
        fd.append(`${prop}`, this.dishGroup.value[prop]);
      }
    }
    fd.append('image', this.file);
    fd.append('categoryId', this.categoryId);
    return fd;
  }

  updateDish() {
    this.dishService.updateDish(this.dishId, this.prepareFormData())
      .subscribe(res => {
        this.getDishsById(this.categoryId);
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
          });
      });
  }

  getDish(id) {
    this.dishService.getIndex(id)
      .subscribe(res => {
        this.dishId = id;
        this.dishGroup.patchValue(res['data']);
      });
  }

  getDishsById(id: any) {
    this.categoryId = id;
    this.dishService.getAll(id)
      .subscribe(res => {
        this.dishes = res['data'];
        console.log(this.dishes);
      });
  }

  // fileSelect(event) {
  //   const img = event.target.files[0];
  //   this.readThis(img);
  //   console.log(event);
  //   event.target.value = '';
  // }

  addPhoto(event) {
    console.log(event.target.files[0]);
    this.file = event.target.files[0];
  }


  // submitRegister() {
  //   if(this.files) {
  //     this.dishGroup.patchValue({image: })
  //     // console.log(this.files);
  //     // let files = this.files;
  //     // const formData = new FormData();
  //     // formData.append('image', files);
  //     // formData.append('data', JSON.stringify(this.files));
  //     // console.log(formData.getAll('image'));
  //   }
  //   // else finalData = this.dishGroup;
  // }

  // fileSelect(event: any): void {
  //   let file = event.target.files[0];
  //   if (this.reportService.checkVideoFormat(file.type)) {
  //     this.checkDuration(file);
  //   }
  //   input.value = '';
  // }

  // readThis(img: any): void {
  //   const myReader: FileReader = new FileReader();
  //   myReader.onloadend = (ev) => {
  //     const image = myReader.result;
  //     this.image.emit(image);
  //     this.dishGroup.value.image = image;
  //   };
  //   myReader.readAsDataURL(img);
  // }

}
