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
      <input id="search" type="text" (input)="onTextChange($event)">
      <app-progress-bar *ngIf="isLoading"></app-progress-bar>
      <app-todo-item *ngFor="let todo of (filteredTodos$ ?? todos$) | async" [item]="todo"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly todos$: Observable<Todo[]>;
  filteredTodos$: Observable<Todo[]>;
  isLoading = true;
  subscription: Subscription;
  todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
    this.todos$ = todoService.getAll();
    this.filteredTodos$ = todoService.getAll();
    this.subscription = this.todos$.subscribe({
      complete: () => this.isLoading = false
    });
  }

  onTextChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filteredTodos$ = this.todoService.getFilteredMockData(input.value);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
