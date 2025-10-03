import {Component} from '@angular/core';
import {Todo, TodoService} from "./todo.service";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-root',
  template: `
    <div class="title">
      <h1>
        A list of TODOs
      </h1>
    </div>
    <div class="list">
      <label for="search">Search...</label>
      <input id="search" type="text">
      <app-progress-bar *ngIf="isLoading"></app-progress-bar>
      <app-todo-item *ngFor="let todo of todos$ | async" [item]="todo"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly todos$: Observable<Todo[]>;
  isLoading = true;
  subscription: Subscription;

  constructor(todoService: TodoService) {
    this.todos$ = todoService.getAll();
    this.subscription = this.todos$.subscribe({
      complete: () => this.isLoading = false
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
