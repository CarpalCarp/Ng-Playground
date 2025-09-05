import { Component, Input, signal } from '@angular/core';
import { ToDoComponent } from './to-do/to-do.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  imports: [
    ToDoComponent,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  standalone: true
})
export class ToDoListComponent {
  title = 'To Do List';
  toDo = signal<string>('');
  listOfTodos: string[] = [];

  addToDo(todo: string) {
    this.listOfTodos.push(todo);
    this.toDo.set('');
  }

  removeItem($event: any) {
    this.listOfTodos.splice($event.index, 1);
  }
}
