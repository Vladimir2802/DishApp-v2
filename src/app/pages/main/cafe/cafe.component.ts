import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CafeService} from '../shared/services/cafe.service';
import {log} from 'util';

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
  cafeId: any;

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
    this.cafes = this.route.snapshot.data['data']['data'];
  }

  getCafe(){
    this.cafes.forEach(item => {
      item.edit = false;
    })
  }

  addPhoto(event) {
    this.newFile = event.target.files[0];
  }

  openEditCafe(cafe){
    this.condition = !this.condition;
    cafe.edit = true;
  }

  closeEditCafe(){
    this.condition = !this.condition;
    this.getCafe();
  }

  // setTimeWork(){
  //   this.timeGroup.patchValue({
  //
  //   })
  // }



}
