import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CafeService} from './shared/services/cafe.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navBarHiden: boolean;
  addCafeButtonHiden: boolean;

  constructor(public router: Router,
              public cafeService: CafeService) { }

  ngOnInit() {
    this.router.events.subscribe(data => {
      switch (this.router.url) {
        case '/main/cafe': this.addCafeButtonHiden = false; break;
        case '/main/' + this.cafeService.getSelectedMenu() + '/categories': this.navBarHiden = true; break;
        default: this.addCafeButtonHiden = true; this.navBarHiden = false; break;
      }
      console.log(this.router.url);
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

}
