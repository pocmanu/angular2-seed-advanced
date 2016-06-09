import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Action } from '@ngrx/store';

import { Todo } from './todo.model';
import { TodoActions } from './todos.actions';


export interface TodosState {
  ids: string[];
  entities: Todo[];
};

const initialState: TodosState = {
  ids: [],
  entities: []
};

export default function(state = initialState, action: Action): TodosState {
  switch (action.type) {
    case TodoActions.ADD_EVENT_FROM_DB: {
      console.log('youhou ça devrait être dans hoodie', action);
      const todo: Todo = action.payload;

      if (state.ids.includes(todo.id)) {
        return state;
      }

      return Object.assign({}, state, {
        ids: [ ...state.ids, todo.id ],
        entities: [ ...state.entities, todo]
      });
      //return state.concat([Object.assign({}, todo, {id: state.length + 1})]);
    }
    

    case TodoActions.ADD:
    default: {
      return state;
    }
  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */
/*export function getBookEntities() {
  return (state$: Observable<BooksState>) => state$
    .select(s => s.entities);
};

export function getBook(id: string) {
  return (state$: Observable<BooksState>) => state$
    .select(s => s.entities[id]);
}

export function getBooks(bookIds: string[]) {
  return (state$: Observable<BooksState>) => state$
    .let(getBookEntities())
    .map(entities => bookIds.map(id => entities[id]));
}

export function hasBook(id: string) {
  return (state$: Observable<BooksState>) => state$
    .select(s => s.ids.includes(id));
}*/