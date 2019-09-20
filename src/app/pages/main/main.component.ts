import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {CafeService} from './shared/services/cafe.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  navBarHiden: boolean;
  addCafeButtonHiden: boolean;

  constructor(public router: Router,
              public cafeService: CafeService,
              public translateService: TranslateService) { }

  ngOnInit() {
    this.translateService.setDefaultLang('en'); this.setLang();

    this.router.events.subscribe(data => {
      switch (this.router.url) {
        case '/main/cafe': this.addCafeButtonHiden = false;  this.navBarHiden = false; break;
        case '/main/' + this.cafeService.getSelectedMenu() + '/categories': this.navBarHiden = true; break;
        default: this.addCafeButtonHiden = true; this.navBarHiden = false; break;
      }
      // console.log(this.router.url);
    });
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['auth']);
  }

  setLang(lang?){
    if (lang) {
      this.translateService.use(lang);
      localStorage.setItem('lang', JSON.stringify(lang));
    } else {
      if (localStorage.getItem('lang')) {
        this.translateService.use(JSON.parse(localStorage.getItem('lang')));
      }
    }
  }

}
