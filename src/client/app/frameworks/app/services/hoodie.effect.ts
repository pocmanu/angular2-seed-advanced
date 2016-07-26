import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload, StateUpdate } from '@ngrx/effects';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs/rx';
import * as _ from 'lodash';

import { HoodieProvider } from './hoodie-provider.service';
import * as TodoActions from './todos/todos.actions';

@Injectable()
export class HoodieEffects {

    private hoodie: any;

    private storesConfig: {name: string, addaction: string, updaction: string, delaction: string}[] = [];

    private addActions: Map<string, string> = new Map<string, string>();
    private updActions: Map<string, string> = new Map<string, string>();
    private delActions: Map<string, string> = new Map<string, string>();

    constructor(
        private updates$: StateUpdates<any>,
        private hoodieProvider: HoodieProvider,
        private store: Store<any>
    ) { 
        this.hoodie = hoodieProvider.hoodie;
        /*Observable.fromEvent(this.hoodie.store('todos'), 'add').subscribe((data) => {
          console.log(data);
          this.store.dispatch(this.todoActions.addEventFromDb(data));
      });*/
      Observable.fromEvent(this.hoodie.store, 'add').subscribe((data: {type: string}) => {
          console.log('===============');
          console.log(data);
          console.log('===============');
          let actiontype = '[Hoodie]' + _.find(this.storesConfig, config => config.name === data.type).addaction;
          this.store.dispatch({type: actiontype, payload: data});
      });
      //this.hoodie.store('test').add({}).then(data => this.hoodie.store('test').remove(data));
      this.register('todos', 'ADD_TODO', 'TOGGLE_TODO', '');
    }

    register(storeName: string, addAction: string, updAction: string, delAction: string) {
        this.storesConfig.push({name: storeName, addaction: addAction, updaction: updAction, delaction: delAction});
        this.addActions.set(addAction, storeName);
        this.updActions.set(updAction, storeName);
        this.delActions.set(delAction, storeName);
    };

    @Effect() add$ = this.updates$
        .filter(({ action }: StateUpdate<any>) => this.addActions.has(action.type))
        .mergeMap(({ action }: StateUpdate<any>) => this.hoodie.store(this.addActions.get(action.type)).add(action.payload));

    @Effect() update$ = this.updates$
        .filter(({ action }: StateUpdate<any>) => this.updActions.has(action.type))
        .mergeMap(({ action }: StateUpdate<any>) => this.hoodie.store(this.updActions.get(action.type)).add(action.payload));

    @Effect() delete$ = this.updates$
        .whenAction(TodoActions.REMOVE_TODO)
        .map<any>(toPayload)
        .mergeMap(birthday => this.hoodie.store('todos').delete(birthday));
}
