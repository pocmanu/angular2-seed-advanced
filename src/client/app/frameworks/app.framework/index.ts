// libs
import {provideStore} from '@ngrx/store';

// app
import {nameListReducer} from './services/name-list.service';
import {MULTILINGUAL_PROVIDERS, MultilingualStateI, multilingualReducer} from '../i18n.framework/index';
import {counter} from '../../../app/components/counter/counter.component';
import * as todosServices from './services/todos.service';
import  todoReducer  from './services/todos/todos.reducer';
import { TodoActions } from './services/todos/todos.actions';
import { runEffects } from '@ngrx/effects';
import { HoodieEffects } from './services/hoodie.effect';
import { HoodieProvider } from './services/hoodie-provider.service';

// state definition
export interface AppStoreI {
  i18n: MultilingualStateI;
  names: Array<string>;
};

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  TodoActions,
  HoodieProvider,
  provideStore({ 
    i18n: multilingualReducer,
    names: nameListReducer,
    counter: counter,
    todos: todoReducer,
    visibilityFilter: todosServices.visibilityFilter
  }),
  runEffects([HoodieEffects])
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';
export * from './services/todos.service';
export * from './services/todos/todos.actions';
export * from './services/todos.service';
