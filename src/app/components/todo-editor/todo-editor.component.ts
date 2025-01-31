import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { GeneralService } from '../../services/general.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-editor',
  standalone: false,
  templateUrl: './todo-editor.component.html',
  styleUrl: './todo-editor.component.scss',
})
export class TodoEditorComponent implements OnInit {
  generalService = inject(GeneralService);
  formBuidler = inject(FormBuilder);
  public formGroup: FormGroup = new UntypedFormGroup({});

  ngOnInit(): void {
    this.formGroup = this.formBuidler.group({
      title: new FormControl('', Validators.required),
      body: new FormControl(''),
    });
  }

  createTodo(): void {
    this.generalService.todos.unshift(this.formGroup.value as Todo);
    this.closeModal();
  }

  closeModal(): void {
    this.generalService.showCreate = false;
  }
}
