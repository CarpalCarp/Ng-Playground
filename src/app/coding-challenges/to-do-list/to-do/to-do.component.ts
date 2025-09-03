import { Component, Input, Output, EventEmitter } from '@angular/core';

interface RemovedObj {
  text: string,
  index: number
}

@Component({
  selector: 'to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
  standalone: true
})

export class ToDoComponent {
  @Input() singleTodo: string = '';
  @Input() indexOfTodo: number = 0;
  @Output() removedTodo = new EventEmitter<RemovedObj>();

  remove($event: any) {
    const removedObj = {
      text: $event.target.innerText,
      index: this.indexOfTodo
    }

    this.removedTodo.emit(removedObj);
  }
}
