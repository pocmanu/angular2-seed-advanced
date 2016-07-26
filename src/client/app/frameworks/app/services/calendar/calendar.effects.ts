
import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { HoodieProvider } from '../hoodie-provider.service';
import { ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT } from './calendar.actions';
import { Store } from '@ngrx/store';


@Injectable()
export class HoodieEffects {

    private hoodieStore: any;

    constructor(private updates$: StateUpdates<any>, private hoodieProvider: HoodieProvider, private todoActions: TodoActions, private reduxstore: Store) {
        this.hoodieStore = hoodieProvider.getHoodie().store('todos');
        Observable.fromEvent(this.hoodieStore, 'add').subscribe((data) => {
            console.log(data);
            this.reduxstore.dispatch(this.todoActions.addEventFromDb(data));
        });
    }
}
