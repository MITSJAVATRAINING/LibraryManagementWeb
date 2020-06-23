import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {

  constructor(private _service: LibraryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router) { }

  _bookFormGroup: FormGroup;

  public authorList = [];
  public categoryList = [];

  ngOnInit() {

    this._bookFormGroup = this._fb.group({
      bookName: ['', Validators.required],
      categoryId: ['', Validators.required],
      authorId: ['', Validators.required],
      totalBooks: ['', Validators.required]
    });

    this._service.getAuthors().subscribe(response => {
      if (response.statusCode === 200) {
        this.authorList = response.list;
        this._bookFormGroup.get('authorId').setValue(this.authorList[0].id);
      }
    });

    this._service.getCategories().subscribe(response => {
      if (response.statusCode === 200) {
        this.categoryList = response.list;
        this._bookFormGroup.get('categoryId').setValue(this.categoryList[0].id);
      }
    });
  }

  onSave() {
    const book = this._bookFormGroup.getRawValue();
    this._service.addBook(book).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this._toastr.success('Book has been added Successfully');
          this._router.navigate(['/book']);
        } else {
          this._toastr.error(response.statusMsg);
        }
      }
    );
  }



}
