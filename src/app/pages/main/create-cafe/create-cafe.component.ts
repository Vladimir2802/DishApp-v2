import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CafeService} from '../shared/services/cafe.service';

@Component({
  selector: 'app-create-cafe',
  templateUrl: './create-cafe.component.html',
  styleUrls: ['./create-cafe.component.scss']
})
export class CreateCafeComponent implements OnInit {
  cafeGroup: FormGroup;
  newFile: any;
  condition: boolean = true;


  constructor(public fb: FormBuilder,
              public cafeService: CafeService) {
  }

  ngOnInit() {
    this.cafeGroup = this.fb.group({
      name: [''],
      address: [''],
      phone: [''],
      workTime: [''],
      logo: [null],
    });
  }

  createCafe() {
    this.cafeService.storeCafe(this.newPrepareFormData())
      .subscribe(res => {
        console.log(res);
      });
  }

  addPhoto(event) {
    this.newFile = event.target.files[0];
  }

  newPrepareFormData() {
    let fb = new FormData();
    for (let prop in this.cafeGroup.value) {
      if (this.cafeGroup.value.hasOwnProperty(prop)) {
        fb.append(`${prop}`, this.cafeGroup.value[prop]);
      }
    }
    fb.append('image', this.newFile);
    return fb;
  }

}
