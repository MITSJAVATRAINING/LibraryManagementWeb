import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  public filter = '';
  @ViewChild('paginatorProvisionRequest') paginatorUser: MatPaginator;
  @ViewChild(MatSort) sortUser: MatSort;
  public dataSourceUser: MatTableDataSource<any>;
  public dataUser: any[];
  public displayedColumnsUser = ['name', 'phone'];

  ngOnInit() {
  }

}
