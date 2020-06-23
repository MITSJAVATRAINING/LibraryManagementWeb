import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-book',
  templateUrl: './return-book.component.html',
  styleUrls: ['./return-book.component.css']
})
export class ReturnBookComponent implements OnInit {

  constructor(private _service: LibraryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router) { }

  _issueBookGroup: FormGroup;

  public issuedBook = [];
  public dataUser = [];
  public userIssuedBooks = [];

  ngOnInit() {

    this._issueBookGroup = this._fb.group({
      bookId: ['', Validators.required],
      userId: ['', Validators.required]
    });


    this._service.getUsers().subscribe(response => {
      if (response.statusCode === 200) {
        this.dataUser = response.list;
        this.dataUser = this.dataUser.filter(user => user.totalIssuedBook > 0);
      }
    });

    this._service.getIssuedBooks().subscribe(res => {
      if (res.statusCode === 200) {
        this.issuedBook = res.list;
      }
    });
  }

  userChange($event) {
      let issuedBooks = [];
      issuedBooks = this.issuedBook.filter(b => b.userId == this._issueBookGroup.get('userId').value);
      this.userIssuedBooks = issuedBooks;
  }

  onSave() {
    const issuedBook = this._issueBookGroup.getRawValue();
    this._service.returnBook(issuedBook).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this._toastr.success('Book has been returned Successfully');
          this._router.navigate(['/home']);
        } else {
          this._toastr.error(response.statusMsg);
        }
      }
    );
  }
}
