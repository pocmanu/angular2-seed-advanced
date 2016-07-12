import {ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT} from "./calendar.actions";
import {Injectable} from '@angular/core';
import {Store, Action} from '@ngrx/store';
import {Observable} from 'rxjs/Rx';
import {CalendarEvent} from "./calendar.model";

export {CalendarEvent} from "./calendar.model";

@Injectable()
export class CalendarService {

    private events: Observable<any>;

    constructor(private store: Store<any>) {
        this.events = store.select('events');
    }

    addEvent(event: CalendarEvent) {
        this.store.dispatch({ type: ADD_EVENT, payload: event });
    }

    updateEvent(event: CalendarEvent) {
        this.store.dispatch({ type: UPDATE_EVENT, payload: event });
    }

    removeEvent(event: CalendarEvent) {
        this.store.dispatch({ type: UPDATE_EVENT, payload: event.id });
    }
}