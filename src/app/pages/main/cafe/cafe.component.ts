import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CafeService} from '../shared/services/cafe.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.scss']
})
export class CafeComponent implements OnInit {
  cafes: any = [];
  cafeGroup: FormGroup;
  timeGroup: FormGroup;
  newFile: any;
  condition: boolean = true;
  cafe: any;
  workTime: string[];
  lat = '';
  lng = '';


  week: any = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];


  constructor(public route: ActivatedRoute,
              public router: Router,
              public fb: FormBuilder,
              public cafeService: CafeService,
              private translateService: TranslateService) {
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
    this.cafes = this.route.snapshot.data['data']['data'];
    // console.log(this.cafes);
    // this.getCafesId();
    this.cafeIdValue();
  }

  getCafe() {
    this.cafes.forEach(item => {
      item.edit = false;
    });
  }

  addPhoto(event) {
    this.newFile = event.target.files[0];
  }

  openEditCafe(cafe) {
    this.condition = !this.condition;
    cafe.edit = true;
    this.cafe = cafe;
    this.cafeGroup.patchValue({
      name: cafe.name,
      address: cafe.address,
      phone: cafe.phone
    });
    this.lat = cafe.position[0];
    this.lng = cafe.position[1];
    let patchWeeks = {};
    for (let key in cafe.workTime) {
      let weekDay = this.week[key];
      let val = cafe.workTime[key];

      if (val !== '-') {
        let times = val.split(' - ');

        patchWeeks[weekDay] = times[0];
        patchWeeks[`${weekDay}Close`] = times[1];
      }
    }
    this.timeGroup.patchValue(patchWeeks);
  }

  closeEditCafe() {
    this.condition = !this.condition;
    this.getCafe();
  }

  deleteCafes(id) {
    this.cafeService.deleteCafe(id)
      .subscribe(res => {

      });
  }

  updateCafe() {
    this.plusTime();
    this.cafeService.updateCafe(this.cafe.id, this.newPrepareFormDataDb())
      .subscribe(res => {
        console.log(res);
      });
  }

  newPrepareFormDataDb() {
    let fd = new FormData();
    console.log(this.cafeGroup.value);
    for (let prop in this.cafeGroup.value) {
      if (prop !== 'logo' && this.cafeGroup.value.hasOwnProperty(prop)) {
        fd.append(`${prop}`, this.cafeGroup.value[prop]);
      }
    }
    for (let day of this.workTime) {
      fd.append(`work_time[]`, day);
    }
    let position = this.cafeService.getPosition();
    fd.append('logo', this.newFile);
    fd.append('position[0]', this.lat );
    fd.append('position[1]', this.lng );
    console.log(fd);
    return fd;

  }

  plusTime() {
    this.workTime = [];
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


  onAutocompleteSelected(ev){
    console.log(ev);
    this.cafeGroup.patchValue({
      address: ev.name
    });
  }

  onLocationSelected(ev){

    console.log(ev);
    this.lat = ev.latitude;
    this.lng = ev.longitude;

    this.cafeService.setPosition(this.lat, this.lng);
  }

  cafeIdValue() {
    // this.cafes.forEach(item => {
    //   this.cafeId = item.id;
    //   console.log(this.cafeId);
    // });
  }

}
