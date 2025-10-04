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
      <app-todo-item *ngFor="let todo of (filteredTodos$ ?? todos$) | async" [item]="todo" (click)="onTodoClick(todo)"></app-todo-item>
    </div>
  `,
  styleUrls: ['app.component.scss']
})
export class AppComponent {

  readonly todos$: Observable<Todo[]>;
  filteredTodos$: Observable<Todo[]>;
  todosAfterRemoval$: Observable<void>;
  currentSearchTerm: string;
  isLoading = true;
  originalTodosSubscription: Subscription;
  removedTodosSubscription: Subscription;
  todoService: TodoService;

  constructor(todoService: TodoService) {
    this.todoService = todoService;
    this.todos$ = todoService.getAll();
    this.filteredTodos$ = todoService.getAll();
    this.todosAfterRemoval$ = new Observable<void>();
    this.removedTodosSubscription = new Subscription();
    this.currentSearchTerm = '';
    this.originalTodosSubscription = this.todos$.subscribe({
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onTodoClick(todo: Todo) {
    this.isLoading = true;
    this.todosAfterRemoval$ = this.todoService.remove(todo.id);
    this.removedTodosSubscription = this.todosAfterRemoval$.subscribe({
      next: () => {
        this.filteredTodos$ = this.todoService.getFilteredMockData(this.currentSearchTerm);
      },
      error: (err) => {
        alert(`Failed to remove the item: ${err}\nPlease try again.`);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  onTextChange(event: Event) {
    this.currentSearchTerm = (event.target as HTMLInputElement).value;
    this.filteredTodos$ = this.todoService.getFilteredMockData(this.currentSearchTerm);
  }

  ngOnDestroy() {
    this.originalTodosSubscription.unsubscribe();
    this.removedTodosSubscription.unsubscribe();
  }
}
