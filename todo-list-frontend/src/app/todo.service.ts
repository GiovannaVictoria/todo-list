import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {delay} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export interface Todo {
  id: number;
  task: string;
  priority: 1 | 2 | 3;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  apiUrl: string;
  http: HttpClient;

  constructor(http: HttpClient) {
    this.apiUrl = 'http://localhost:8099/api/';
    this.http = http;
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}`).pipe(
      delay(2000) // Simulate network delay for demonstration of progress bar
    );
  }

  getFilteredMockData(searchTerm: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}search?task=${searchTerm}`);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
