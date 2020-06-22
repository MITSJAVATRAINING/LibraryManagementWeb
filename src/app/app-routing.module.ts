import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { BooksComponent } from './books/books.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddBookComponent } from './add-book/add-book.component';

const ROUTES: Routes = [
  {
    path: '', component: HomeComponent
  },
  {
    path: 'home', component: HomeComponent
  },
  {
    path: 'user', component: UserComponent
  },
  {
    path: 'book', component: BooksComponent
  },
  {
    path: 'addUser', component: AddUserComponent
  },
  {
    path: 'addBook', component: AddBookComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES, { onSameUrlNavigation: 'reload' })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
