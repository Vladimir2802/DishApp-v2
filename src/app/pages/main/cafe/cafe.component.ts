import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-cafe',
  templateUrl: './cafe.component.html',
  styleUrls: ['./cafe.component.scss']
})
export class CafeComponent implements OnInit {
cafes: any = [];
  constructor(public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    this.cafes  = this.route.snapshot.data['data']['data'];
  }

}
