import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CafeService} from '../shared/services/cafe.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-cafe',
  templateUrl: './create-cafe.component.html',
  styleUrls: ['./create-cafe.component.scss']
})
export class CreateCafeComponent implements OnInit, AfterViewInit {

  // lat = 51.678418;
  // lng = 7.809007;
  lat = '';
  lng = '';

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
              public cafeService: CafeService,
              private router: Router) {
  }






  ngOnInit() {
    this.cafeGroup = this.fb.group({
      name: [''],
      address: [''],
      phone: [''],
      logo: [null]
    });
    this.timeGroup = this.fb.group({
      Monday: ['07'],
      MondayClose: ['21'],
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
        this.router.navigate(['/main/cafe']).finally();
      });
  }

  cancelCreateCafe() {
    this.router.navigate(['/main/cafe']).finally();
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
    fb.append('position[0]', this.lat);
    fb.append('position[1]', this.lng);
    return fb;

  }


  onAutocompleteSelected(ev){
    console.log(ev);
  }

  onLocationSelected(ev){
    this.lat = ev.latitude;
    this.lng = ev.longitude;

    this.cafeService.setPosition(this.lat, this.lng);
  }


}
