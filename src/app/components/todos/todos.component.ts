import { Component, inject, OnInit } from '@angular/core';
import { Todo } from '../../models/todo';
import { GeneralService } from '../../services/general.service';

@Component({
  selector: 'app-todos',
  standalone: false,

  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  generalService = inject(GeneralService);

  ngOnInit(): void {
    this.generalService.fetchTodos();
  }
}
