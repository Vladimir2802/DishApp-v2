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
    // this.table = this.route.snapshot.data['data'];
    // console.log(this.table);
    // this.tableData = this.table['data'];
    // this.tableValue();
    // console.log(this.tableValueAll);
    // this.www = this.route.snapshot.params.id;
    // console.log(this.www);
    // this.getAllHall();
  }

  // getAllHall() {
  //   this.hallService.getAll(1)
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }

  // tableValue() {
  //   this.tableData.forEach(item => {
  //     this.tableValueAll.push(item);
  //   });
  // }

  // deleteTable(id) {
  //   this.tableValueAll.forEach(item => {
  //     this.tableId = item.id;
  //     // console.log(this.tableId);
  //   });
  //   this.tableService.delete(this.tableId)
  //     .subscribe(res => {
  //       // console.log(res);
  //     });
  // }

  // addTable() {
  //   this.fd = new FormData();
  //   this.fd.append('cafe_id', this.route.snapshot.params.id);
  //   this.fd.append('number', this.tableGroup.controls.number.value);
  //   this.tableService.createTable(this.fd)
  //     .subscribe(res => {
  //       console.log(res);
  //     });
  // }

  initFormGroup() {
    this.tableGroup = this.fb.group({
      number: [''],
    });
  }

  // updateTable(id){
  //   this.tableService.updateTable(id, this.fd)
  //     .subscribe(res => {
  //       console.log(res);
  //     })
  //
  // }
}
