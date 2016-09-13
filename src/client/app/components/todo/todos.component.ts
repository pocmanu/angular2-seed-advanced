import {Component, ChangeDetectionStrategy} from '@angular/core';
import {TodoListComponent} from './todo-list.component';
import {TodoInputComponent} from './todo-input.component';
import {FilterSelectComponent} from './filter-select.component';
import {Store} from '@ngrx/store';
import {AppState, Todo, TodoModel} from '../../frameworks/app/services/todos/todo.model';
import {Observable} from 'rxjs/Observable';
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO, } from '../../frameworks/app/services/todos/todos.actions';
import {UNDO, REDO} from '../../frameworks/app/services/undoable/undoable.actions';
import 'rxjs/add/observable/combineLatest';

@Component({
	selector: `todos-cmp`,
	templateUrl: `./app/components/todo/todos.component.html`,
	styleUrls: [`./app/components/todo/todos.css`],
    directives: [TodoListComponent, TodoInputComponent, FilterSelectComponent],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TodosComponent {
	public todosModel$: Observable<TodoModel>;
	private id: number = 0;

	constructor(private _store: Store<AppState>) {
		const todos$ = _store.select<Observable<Todo[]>>('todos');
		todos$.subscribe(todos => console.log('todos', todos));
		const visibilityFilter$ = _store.select('visibilityFilter');

		this.todosModel$ = Observable
			.combineLatest(
			Observable.of(todos$),
			visibilityFilter$,
			({present = []}, visibilityFilter: any) => {
				return {
					filteredTodos: present.filter(visibilityFilter),
					totalTodos: present.length,
					completedTodos: present.filter((todo: Todo) => todo.complete).length
				};
			}
		);
	}

	addTodo(description: string) {
		this._store.dispatch({
			type: ADD_TODO, payload: {
				id: ''+ ++this.id,
				description,
				complete: false
			}
		});
	}

	removeTodo(id: number) {
		this._store.dispatch({ type: REMOVE_TODO, payload: id });
	}

	toggleTodo(id: number) {
		this._store.dispatch({ type: TOGGLE_TODO, payload: id });
	}

	updateFilter(filter: any) {
		this._store.dispatch({ type: filter });
	}

	undo() {
		this._store.dispatch({ type: UNDO });
	}

	redo() {
		this._store.dispatch({ type: REDO });
	}
}
