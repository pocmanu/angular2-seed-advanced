import { Component, ChangeDetectionStrategy } from '@angular/core';
import {Store} from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/combineLatest';
//import {LogMonitor} from '@ngrx/devtools'

import { TodoActions } from '../../frameworks/app.framework/index';

import {NewTodoInput} from './newTodo.component';
import {TodoList} from './todolist.component'

@Component({
    moduleId: module.id,
    selector: 'todos',
    templateUrl: 'todos.component.html',
    directives: [/*LogMonitor,*/ NewTodoInput, TodoList],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
  todos:Observable<any>;
  constructor(private store:Store<any>, private todoActions: TodoActions) {
    console.log(store.select('todos'));
    this.todos = store.select('todos')
      .combineLatest(store.select('visibilityFilter'), (todos, visibilityFilter) => {
        console.log(todos.entities)
        return todos.entities.filter(visibilityFilter)
      });
  }
  addTodo(newTodo){
    this.store.dispatch(this.todoActions.add(newTodo));
  }
/*  completeTodo(todo){
    this.store.dispatch({
      type: TodoActions.COMPLETE_TODO,
      payload: todo
    });
  }
  deleteTodo(todo){
    this.store.dispatch({
      type: TodoActions.DELETE_TODO,
      payload: todo
    });
  }
  show(filter){
    this.store.dispatch({
      type: TodoActions[filter]
    });
  }*/
}