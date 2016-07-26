import { Injectable } from '@angular/core';
import { ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT, INIT_EVENT } from './calendar.actions';
import { UNDO, REDO } from '../undoable/undoable.actions';
import { UndoableState } from '../undoable/undoable.interface';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { CalendarEvent } from './calendar.model';

export { CalendarEvent } from './calendar.model';
export { calendarReducer } from './calendar.reducer';

@Injectable()
export class CalendarService {

    events: Observable<any>;

    constructor(private store: Store<any>) {
        this.events = store.select('events').map((state: UndoableState) => state.present);
        this.store.dispatch({ type: INIT_EVENT, payload: [
            { id: 1, title: 'Math', start: new Date(1970, 1, 1, 10, 0, 0), duration: 60 },
            { id: 2, title: 'Français', start: new Date(1970, 1, 2, 11, 0, 0), duration: 90 }
        ]});
    }

    addEvent(event: CalendarEvent) {
        this.store.dispatch({ type: ADD_EVENT, payload: event });
    }

    updateEvent(event: CalendarEvent) {
        this.store.dispatch({ type: UPDATE_EVENT, payload: event });
    }

    removeEvent(event: CalendarEvent) {
        this.store.dispatch({ type: REMOVE_EVENT, payload: event.id });
    }

    undo() {
        this.store.dispatch({type: UNDO});
    }

    redo() {
        this.store.dispatch({type: REDO});
    }
}
