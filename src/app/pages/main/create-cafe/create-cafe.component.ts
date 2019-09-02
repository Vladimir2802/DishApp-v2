import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CafeService} from '../shared/services/cafe.service';
import {NgxTimepickerFieldComponent} from 'ngx-material-timepicker';


@Component({
  selector: 'app-create-cafe',
  templateUrl: './create-cafe.component.html',
  styleUrls: ['./create-cafe.component.scss']
})
export class CreateCafeComponent implements OnInit, AfterViewInit {
  cafeGroup: FormGroup;
  newFile: any;
  condition: boolean = true;

  week: any = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  workTime: any = [];
  @ViewChild('week', {static: false}) private timepicker: NgxTimepickerFieldComponent;



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
      Monday: [''],
      Tuesday: [''],
      Wednesday: [''],
      Thursday: [''],
      Friday: [''],
      Saturday: [''],
      Sunday: ['']
    });
  }

  ngAfterViewInit(){
    this.getTime();
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

  getTime(){
    this.timepicker.registerOnChange(async () => {
      console.log(this.timepicker);
    });
  }

  newPrepareFormData() {
    let fb = new FormData();
    for (let prop in this.cafeGroup.value) {
      if (this.cafeGroup.value.hasOwnProperty(prop) && this.week.indexOf(prop) === -1) {
        fb.append(`${prop}`, this.cafeGroup.value[prop]);
      }
    }
    for (let prop of this.week) {
      fb.append(`work_time[]`, this.cafeGroup.value[prop]);
    }
    fb.append('image', this.newFile);
    return fb;
  }

}
