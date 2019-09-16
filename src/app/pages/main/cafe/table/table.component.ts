import {Component, OnInit} from '@angular/core';
import {TablesService} from '../../shared/services/table.service';
import {CafeService} from '../../shared/services/cafe.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  table: any = [];
  tableData: any = [];
  tableValueAll: any = [];
  tableId: any = [];
  tableGroup: FormGroup;


  constructor(public tableService: TablesService,
              public cageService: CafeService,
              public route: ActivatedRoute,
              public router: Router,
              public fb: FormBuilder) {
  }

  ngOnInit() {
    this.initFormGroup();
    this.table = this.route.snapshot.data['data'];
    this.tableData = this.table['data'];
    this.tableValue();
    // console.log(this.tableValueAll);
  }

  tableValue() {
    this.tableData.forEach(item => {
      this.tableValueAll.push(item);
    });
  }

  deleteTable(id){
    this.tableValueAll.forEach(item =>{
      this.tableId = item.id;
      // console.log(this.tableId);
    });
    this.tableService.delete(this.tableId)
      .subscribe(res => {
        // console.log(res);
      })
  }

  addTable() {
    this.tableService.createTable({
      number: this.tableGroup,
      cafe_id: this.route.snapshot.params.id
    })
      .subscribe(res => {
        console.log(res);
      })
  }

  initFormGroup(){
    this.tableGroup = this.fb.group({
      number: [''],
    })
  }


}
