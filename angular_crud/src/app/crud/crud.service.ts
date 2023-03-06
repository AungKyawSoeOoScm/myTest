import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Post } from './post';
@Injectable({
  providedIn: 'root'
})
export class CrudService {
  private apiServer = "https://jsonplaceholder.typicode.com";
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }
  create(post: any): Observable<Post> {
    return this.httpClient.post<Post>(this.apiServer + '/posts/', JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }
  getById(id: any): Observable<Post> {
    return this.httpClient.get<Post>(this.apiServer + '/posts/' + id)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getAll(): Observable<Post[]> {
    return this.httpClient.get<Post[]>(this.apiServer + '/posts/')
      .pipe(
        catchError(this.errorHandler)
      )
  }

  update(id: any, post: any): Observable<Post> {
    return this.httpClient.put<Post>(this.apiServer + '/posts/' + id, JSON.stringify(post), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  delete(id: any) {
    console.log(id);
    return this.httpClient.delete<Post>(this.apiServer + '/posts/' + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
