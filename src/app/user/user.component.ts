import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource, MatPaginator } from '@angular/material';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private _service: LibraryService) { }

  public filter = '';
  @ViewChild('paginatorUser') paginatorUser: MatPaginator;
  @ViewChild(MatSort) sortUser: MatSort;
  public dataSourceUser: MatTableDataSource<any>;
  public dataUser: any[];
  public issuedBook: any[];
  public displayedColumnsUser = ['name', 'phone', 'address', 'email', 'issuedBook'];

  ngOnInit() {
    this._service.getUsers().subscribe(response => {
      if (response.statusCode === 200) {
        this.dataUser = response.list;
        this.dataSourceUser = new MatTableDataSource(this.dataUser);
        this.dataSourceUser.paginator = this.paginatorUser;
        this.dataSourceUser.sort = this.sortUser;
      }

      this._service.getIssuedBooks().subscribe(res => {
        if (res.statusCode === 200) {
          this.issuedBook = res.list;
        }

        this.dataUser.forEach(user => {
          let issuedBooks = [] ;
          user.issuedBook = [];
          issuedBooks =  this.issuedBook.filter(b => b.userId === user.userId);
          user.issuedBook = issuedBooks;
        });

      });
    });
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSourceUser.filter = filterValue;
  }

}
