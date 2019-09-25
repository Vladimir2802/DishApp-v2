import {Component, OnInit} from '@angular/core';
import {TablesService} from '../../shared/services/table.service';
import {CafeService} from '../../shared/services/cafe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HallService} from '../../shared/services/hall.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  centered = false;
  disabled = false;
  unbounded = false;
  radius: number;
  color: string;

  table: any = [];
  tableData: any = [];
  tableValueAll: any = [];
  tableId: any = [];
  tableGroup: FormGroup;
  www: any;
  fd: any = [];
  hall: any = [];

  constructor(public tableService: TablesService,
              public cageService: CafeService,
              public route: ActivatedRoute,
              public router: Router,
              public fb: FormBuilder,
              public hallService: HallService) {
  }

  ngOnInit() {
    this.initFormGroup();
    this.hall = this.route.snapshot.data['data']['data'];
    console.log(this.hall);
  }

  deleteTable(id, indexHall, indexTable) {
    this.tableService.delete(id)
      .subscribe(res => {
        if (res['success']) {
          this.hall[indexHall].tables.splice(indexTable, 1);
        }
      })
  }

  getTableAll() {

  }

  initFormGroup() {
    this.tableGroup = this.fb.group({
      number: [''],
    });
  }
}
