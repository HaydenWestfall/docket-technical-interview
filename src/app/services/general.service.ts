import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  private _apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  showCreate = false;
  todos: Todo[] = [];

  constructor(private http: HttpClient) {}

  fetchTodos(): void {
    this.http.get<Todo[]>(this._apiUrl).subscribe({
      next: (data) => (this.todos = data),
      error: (error) => console.error('Error fetching posts:', error),
    });
  }
}
