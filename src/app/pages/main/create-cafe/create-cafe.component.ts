import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CafeService} from '../shared/services/cafe.service';


@Component({
  selector: 'app-create-cafe',
  templateUrl: './create-cafe.component.html',
  styleUrls: ['./create-cafe.component.scss']
})
export class CreateCafeComponent implements OnInit, AfterViewInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  cafeGroup: FormGroup;
  timeGroup: FormGroup;
  newFile: any;
  condition: boolean = true;

  workTime: string[];

  week: any = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  // cafeTimeGroup: string[] = [];


  constructor(public fb: FormBuilder,
              public cafeService: CafeService) {
  }






  ngOnInit() {
    this.cafeGroup = this.fb.group({
      name: [''],
      address: [''],
      phone: [''],
      logo: [null]
    });
    this.timeGroup = this.fb.group({
      Monday: [''],
      MondayClose: [''],
      Tuesday: [''],
      TuesdayClose: [''],
      Wednesday: [''],
      WednesdayClose: [''],
      Thursday: [''],
      ThursdayClose: [''],
      Friday: [''],
      FridayClose: [''],
      Saturday: [''],
      SaturdayClose: [''],
      Sunday: [''],
      SundayClose: ['']
    });

  }

  ngAfterViewInit() {
    this.getTime();
  }

  createCafe() {
    this.plusTime();
    this.cafeService.storeCafe(this.newPrepareFormData())
      .subscribe(res => {
        console.log(res);
      });
    console.log(this.cafeGroup.value);

  }

  plusTime(){
    this.workTime  = [];
    for (let day of this.week) {
      let open = this.timeGroup.value[day];
      let close = this.timeGroup.value[`${day}Close`];

      console.log({day, open, close});

      if (open && close) {
        this.workTime.push(`${open} - ${close}`);
      } else {
        this.workTime.push('-');
      }
    }
    console.log(this.workTime);
  }

  addPhoto(event) {
    this.newFile = event.target.files[0];
  }

  getTime() {
  }

  newPrepareFormData() {
    let fb = new FormData();
    for (let prop in this.cafeGroup.value) {
      if (this.cafeGroup.value.hasOwnProperty(prop) && this.week.indexOf(prop) === -1) {
        fb.append(`${prop}`, this.cafeGroup.value[prop]);
      }
    }
    for (let day of this.workTime) {
      fb.append(`work_time[]`, day);
    }
    fb.append('logo', this.newFile);
    fb.append('position[0]', '49.5859836');
    fb.append('position[1]', '34.5469355');
    return fb;

  }

}
