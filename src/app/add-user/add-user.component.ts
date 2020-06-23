import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private _service: LibraryService,
    private _fb: FormBuilder,
    private _toastr: ToastrService,
    private _router: Router) { }

  _userFormGroup: FormGroup;

  ngOnInit() {
    this._userFormGroup = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  onSave() {
    const user = this._userFormGroup.getRawValue();
    this._service.addUser(user).subscribe(
      (response) => {
        if (response.statusCode === 200) {
          this._toastr.success('User has been added Successfully');
          this._router.navigate(['/user']);
        } else {
          this._toastr.error(response.statusMsg);
        }
      }
    );
  }

}
