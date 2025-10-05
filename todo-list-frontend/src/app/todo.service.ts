import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { Todo } from './types/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private apiUrl: string;
  private http: HttpClient;

  constructor(http: HttpClient) {
    this.apiUrl = 'http://localhost:8099/api/';
    this.http = http;
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}`);
  }

  getFilteredMockData(searchTerm: string): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.apiUrl}search?task=${searchTerm}`);
  }

  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
