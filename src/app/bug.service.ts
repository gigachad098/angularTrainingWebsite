import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Bug } from './shared/bug';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BugService {
  baseurl = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'applications/json',
    }),
  };
  CreateBug(data: any): Observable<Bug> {
    return this.http
      .post<Bug>(
        this.baseurl + '/bugtracking/',
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl));
  }
  GetIssue(id: string): Observable<Bug> {
    return this.http
      .get<Bug>(this.baseurl + '/bugtracking/' + id)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  GetIssues(): Observable<Bug> {
    return this.http
      .get<Bug>(this.baseurl + /bugtracking/)
      .pipe(retry(1), catchError(this.errorHandl));
  }
  UpdateBug(id: string, data: any): Observable<Bug> {
    return this.http
      .put<Bug>(
        this.baseurl + '/bugtracking/' + id,
        JSON.stringify(data),
        this.httpOptions
      )
      .pipe(retry(1), catchError(this.errorHandl))
  }
  DeleteBug(id: string) {
    return this.http
      .delete<Bug>(this.baseurl + '/bugtracking/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.errorHandl))
  }
  errorHandl(error: { error: { message: string; }; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = 'Error Code: ${error.status}\nMessage: ${error.message}';
    }
    console.log(errorMessage)
    return throwError(() => {
      return errorMessage;
    });
  }
}