import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mapTo';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/switchMapTo';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/fromEvent';

import { Injectable } from '@angular/core';
import { Effect, StateUpdates, toPayload } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';
import { HoodieProvider } from './hoodie-provider.service';
import { TodoActions } from './todos/todos.actions';
import {Store} from '@ngrx/store';


@Injectable()
export class HoodieEffects {
  private hoodieStore : any;
  constructor(private updates$: StateUpdates<any>, private hoodieProvider: HoodieProvider, private todoActions:TodoActions, private reduxstore:Store) { 
      this.hoodieStore = hoodieProvider.getHoodie().store('todos');
      Observable.fromEvent(this.hoodieStore, 'add').subscribe((data) => {
          console.log(data);
          this.reduxstore.dispatch(this.todoActions.addEventFromDb(data));
      });

      //setTimeout(()=>this.store.add({text:"waf"}), 10000);
      Observable.fromPromise(this.hoodieStore.findAll()).subscribe(todos => todos.forEach(element => {
          /*let todo:any = {};
          todo[element.id] = element;
          console.log(todo)*/
          let todo = element;
          this.reduxstore.dispatch(this.todoActions.addEventFromDb(todo));
      }));
  }

  @Effect() addInHoodie$ = this.updates$
    .whenAction(TodoActions.ADD)
    .map<any>(toPayload)
    .mergeMap(todo => Observable.fromPromise(this.hoodieStore.add(JSON.parse(JSON.stringify(todo))))
        .map((savedTodo: any) => this.todoActions.savedAdd(savedTodo)));

  //@Effect() hoodieAdd$ = Observable.fromEvent(this.store, 'add')
    //.subscribe((object: any) => this.reduxstore.dispatch(this.todoActions.addEventFromDb(object)))
    //.switchMap((object: any) => Observable.of(this.todoActions.addEventFromDb(object)));
}
