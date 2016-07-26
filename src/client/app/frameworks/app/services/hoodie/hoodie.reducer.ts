import {ActionReducer, Action} from '@ngrx/store';
import {ADD_TODO} from '../todos/todos.actions';

export const HOODIE_ACTION_PREFIX = '[Hoodie]';

export function hoodie(reducer: ActionReducer<any>) {

    // intercept actions
    return function (state: any[] = [], action: Action) {
        if (!action.type.startsWith(HOODIE_ACTION_PREFIX)) {
            return state;
        }
        let trueAction = action.type.replace(HOODIE_ACTION_PREFIX, '');
        trueAction = ADD_TODO;
        console.log(trueAction)
        return reducer(state, {type: trueAction, payload: action.payload});
    };
}
