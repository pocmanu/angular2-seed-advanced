import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';

@Injectable()
export class TodoActions {

  static ADD = '[Todos] Add';
  add(newTodo: any): Action {
    return {
      type: TodoActions.ADD,
      payload: newTodo
    };
  }

  static SAVED_ADD = '[Todos] Saved Add';
  savedAdd(newTodo: any): Action {
    return {
      type: TodoActions.SAVED_ADD,
      payload: newTodo
    };
  }

  static ADD_EVENT_FROM_DB = '[Todos] Add event from DB';
  addEventFromDb(newTodo: any): Action {
    return {
      type: TodoActions.ADD_EVENT_FROM_DB,
      payload: newTodo
    };
  }

  static COMPLETE = '[Todos] Complete';
  complete(todo: any): Action {
    return {
      type: TodoActions.COMPLETE,
      payload: todo
    };
  }

  static DELETE = '[Todos] Delete';
  delete(todo: any): Action {
    return {
      type: TodoActions.DELETE,
      payload: todo
    };
  }
}
