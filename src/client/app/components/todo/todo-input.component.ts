import {Component, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'todo-input',
    template: `
      <div class="pure-control-group">
        <label for="name">Todo Description:</label>
        <input #todo type="text" placeholder="Enter Todo...">
      </div>
      <button class="pure-button pure-button-primary" (click)="add(todo)">Add Todo</button>
    `
})
export class TodoInputComponent {
    @Output() addTodo : EventEmitter<string> = new EventEmitter<string>();

    add(todoInput: {value: string}) {
        this.addTodo.emit(todoInput.value);
        todoInput.value = '';
    }
}
