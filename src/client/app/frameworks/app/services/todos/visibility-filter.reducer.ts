import {ActionReducer, Action} from "@ngrx/store";
import {Todo} from "./todo.model";
import {SHOW_COMPLETED, SHOW_ACTIVE, SHOW_ALL} from "./todos.actions";

export const visibilityFilter : ActionReducer<any> = (state : any = (t: Todo) => t, action : Action) => {
    switch(action.type){
        case SHOW_COMPLETED:
            return (todo: Todo) => todo.complete;
        
        case SHOW_ACTIVE:
            return (todo: Todo) => !todo.complete;
        
        case SHOW_ALL:
            return (todo: Todo) => todo;
            
        default:
            return state;
    }
};
