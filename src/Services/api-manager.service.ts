import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { Post } from 'src/Models/Post';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiManagerService {
  

  newsApiUrl = environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]>{
    var result =  this.http.get<Post[]>(this.newsApiUrl).pipe(
      tap(_ => this.log('fetched all Posts')),
      catchError(this.handleError<Post[]>('getHeroes', []))
    );
    return result;
  }

  addOrUpdate(post: Post) : Observable<Post>{
    var result: Observable<Post>;
    if (!post.id)
    {
       result = this.http.post<Post>(this.newsApiUrl, post).pipe(
        tap(_ => this.log('fetched all Posts')),
        catchError(this.handleError<Post>('getHeroes', undefined))
      );
    }else{
       result = this.http.put<Post>(this.newsApiUrl + `/${post.id}`, post).pipe(
        tap(_ => this.log('fetched all Posts')),
        catchError(this.handleError<Post>('getHeroes', undefined))
      );
    }

    return result;
  }

  deletePost(id: number): Observable<boolean> {
    var result =  this.http.delete<boolean>(this.newsApiUrl + "/"+ id).pipe(
      tap(_ => this.log('fetched all Posts')),
      catchError(this.handleError<boolean>('delete', undefined))
    );
    return result;
  }

  log(message: string): void {
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
