import { Component, Input } from '@angular/core';
import { ToDoComponent } from './to-do/to-do.component';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css'],
  imports: [
    ToDoComponent,
    MatIconModule,
    FormsModule,
    MatFormFieldModule
  ],
  standalone: true
})
export class ToDoListComponent {
  @Input() title: string = '';
  public toDo: string = '';
  public listOfTodos: string[] = [];

  addToDo(todo: string) {
    this.listOfTodos.push(todo);
    this.toDo = '';
  }

  removeItem($event: any) {
    this.listOfTodos.splice($event.index, 1);
  }
}
