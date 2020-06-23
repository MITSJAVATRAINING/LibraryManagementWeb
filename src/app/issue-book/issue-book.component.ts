import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-issue-book',
  templateUrl: './issue-book.component.html',
  styleUrls: ['./issue-book.component.css']
})
export class IssueBookComponent implements OnInit {

  constructor(private _service: LibraryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router) { }

  _issueBookGroup: FormGroup;
  public dataBook = [];
  public dataUser = [];

  ngOnInit() {

    this._issueBookGroup  = this._fb.group({
        bookId: ['', Validators.required],
        userId: ['', Validators.required]
      });

      this._service.getBooks().subscribe(response => {
        if (response.statusCode === 200) {
          this.dataBook = response.list;
          this.dataBook = this.dataBook.filter(book => book.availableBooks > 0);
        }
      });

      this._service.getUsers().subscribe(response => {
        if (response.statusCode === 200) {
          this.dataUser = response.list;
          this.dataUser = this.dataUser.filter(user => user.totalIssuedBook < 2);
        }
      });

  }

  onSave() {
    const issuedBook = this._issueBookGroup.getRawValue();
    this._service.issueBook(issuedBook).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this._toastr.success('Book has been issued Successfully');
          this._router.navigate(['/home']);
        } else {
          this._toastr.error(response.statusMsg);
        }
      }
    );
  }

}
