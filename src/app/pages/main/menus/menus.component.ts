import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.scss']
})
export class MenusComponent implements OnInit {

  // menus: any = [];
  // cafes: any = [];

  constructor(public route: ActivatedRoute,
              public router: Router) { }

  ngOnInit() {
    // this.menus = this.route.snapshot.data['data']['data'];
    // this.cafes = this.route.snapshot.data['data']['data'];
    // console.log(this.cafes);
  }

}
