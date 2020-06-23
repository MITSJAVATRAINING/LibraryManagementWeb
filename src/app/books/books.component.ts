import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { LibraryService } from '../library.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(private _service: LibraryService) { }

  public filter = '';
  @ViewChild('paginatorBook') paginatorBook: MatPaginator;
  @ViewChild(MatSort) sortBook: MatSort;
  public dataSourceBook: MatTableDataSource<any>;
  public dataBook: any[];
  public displayedColumnsBook = ['bookName', 'categoryName', 'authorName'];

  ngOnInit() {
    this._service.getBooks().subscribe(response => {
      if (response.statusCode === 200) {
        this.dataBook = response.list;
        this.dataSourceBook = new MatTableDataSource(this.dataBook);
        this.dataSourceBook.paginator = this.paginatorBook;
        this.dataSourceBook.sort = this.sortBook;
      }
    });
  }

  public applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSourceBook.filter = filterValue;
  }


}
