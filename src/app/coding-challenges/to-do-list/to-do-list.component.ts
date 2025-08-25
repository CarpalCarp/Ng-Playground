import { Component, Input } from '@angular/core';

@Component({
    selector: 'to-do-list',
    templateUrl: './to-do-list.component.html',
    styleUrls: ['./to-do-list.component.css'],
    standalone: false
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
