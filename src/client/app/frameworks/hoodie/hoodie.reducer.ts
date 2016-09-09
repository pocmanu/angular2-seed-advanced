import { ActionReducer, Action } from "@ngrx/store";
import { INITIAL_STATUS, CONNECTED, DISCONNECTED } from './hoodie.actions';

export const hoodie : ActionReducer<any> = (state = {connected: true}, action: Action) => {
        console.log(action)
    switch (action.type) {
        case INITIAL_STATUS:
            return Object.assign({}, state, {connected: action.payload});

        case CONNECTED:
            return Object.assign({}, state, {connected: true});
            
        case DISCONNECTED:
            return Object.assign({}, state, {connected: false});
            
        default:
            return state;
    }
};
