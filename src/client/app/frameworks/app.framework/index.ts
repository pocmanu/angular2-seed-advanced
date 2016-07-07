// libs
import {provideStore, combineReducers} from '@ngrx/store';
import {compose} from "@ngrx/core/compose";
import {storeLogger} from "ngrx-store-logger";

// app
import {nameListReducer} from './services/name-list.service';
import {MULTILINGUAL_PROVIDERS, MultilingualStateI, multilingualReducer} from '../i18n.framework/index';
import {counter} from '../../../app/components/counter/counter.component';
import { runEffects } from '@ngrx/effects';
import { HoodieEffects } from './services/hoodie.effect';
import { HoodieProvider } from './services/hoodie-provider.service';

import {todos} from "./services/todos/todos.reducer";
import {visibilityFilter} from "./services/todos/visibility-filter.reducer";
import {undoable} from "./services/undoable/undoable.reducer";

// state definition
export interface AppStoreI {
  i18n: MultilingualStateI;
  names: Array<string>;
};

export const APP_PROVIDERS: any[] = [
  MULTILINGUAL_PROVIDERS,
  HoodieProvider,
  provideStore(
    compose(storeLogger(), combineReducers)({ 
    i18n: multilingualReducer,
    names: nameListReducer,
    counter: counter,
    todos: undoable(todos),
    visibilityFilter: visibilityFilter
  })),
//  runEffects([HoodieEffects])
];

// services
export * from './services/app-config.service';
export * from './services/name-list.service';
export * from './services/todos/todos.actions';
