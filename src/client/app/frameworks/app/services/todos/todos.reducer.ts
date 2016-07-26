import {ActionReducer, Action} from "@ngrx/store";
import {Todo} from "./todo.model";
import {ADD_TODO, REMOVE_TODO, TOGGLE_TODO} from "./todos.actions";

export const todos : ActionReducer<Todo[]> = (state : Todo[] = [], action: Action) => {
    if (ADD_TODO == action.type) {
        console.log('pouf')
       return [
              ...state,
              action.payload
          ]; 
    }
  switch(action.type) {
      case ADD_TODO:
          return [
              ...state,
              action.payload
          ];
      
      case REMOVE_TODO:
          return state.filter(todo => todo.id !== action.payload);
            
      case TOGGLE_TODO:
          return state.map(todo => {
            if(todo.id !== action.payload){
               return todo;
            }
            return Object.assign({}, todo, {
                complete: !todo.complete
            });
          });
          
      default:
          return state;
  }
};
