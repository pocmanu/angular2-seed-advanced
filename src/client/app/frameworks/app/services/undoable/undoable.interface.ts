import {ActionReducer} from '@ngrx/store';

export interface UndoableState {
    past: any[];
    present: ActionReducer<any>;
    future: any[];
}
