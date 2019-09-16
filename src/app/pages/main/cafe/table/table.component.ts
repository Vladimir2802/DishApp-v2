import {Component, OnInit} from '@angular/core';
import {TablesService} from '../../shared/services/table.service';
import {CafeService} from '../../shared/services/cafe.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  cafes: any = [];


  constructor(public tableService: TablesService,
              public cageService: CafeService,
              public route: ActivatedRoute,
              public router: Router) {
  }

  ngOnInit() {
   this.cafes = this.route.snapshot.data['data'];
    console.log(this.cafes);
    this.getAllTable();
this.cafeId();
  }


  getAllTable(){
    // this.tableService.getAll()
    //   .subscribe(res => {
    //     console.log(res);
    //   })
  }

  cafeId(){
    // this.cafes.forEach(item => {
    //   console.log(item);
    // })
  }



}
