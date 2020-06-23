import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private _httpClient: HttpClient) { }

  private _apiEndpoint = 'http://localhost:8080/api/library/';

  getUsers(): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + 'user/users');
  }

  addUser(input): Observable<any> {
      return this._httpClient.post<any>(this._apiEndpoint + 'user/adduser', input);
  }

  addBook(input): Observable<any> {
    return this._httpClient.post<any>(this._apiEndpoint + 'book/addbook', input);
  }

  issueBook(input): Observable<any> {
    return this._httpClient.post<any>(this._apiEndpoint + 'book/issuebook', input);
  }

  returnBook(input): Observable<any> {
    return this._httpClient.post<any>(this._apiEndpoint + 'book/returnbook', input);
  }

  getBooks(): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + 'book/books');
  }

  getIssuedBooks(): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + 'book/issuedbooks');
  }

  getCategories(): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + 'book/categories');
  }

  getAuthors(): Observable<any> {
    return this._httpClient.get(this._apiEndpoint + 'book/authors');
  }
}
