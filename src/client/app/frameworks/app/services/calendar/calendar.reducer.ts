import {ActionReducer, Action} from "@ngrx/store";
import {CalendarEvent} from "./calendar.model";
import {ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT} from "./calendar.actions";

export const calendarReducer : ActionReducer<CalendarEvent[]> = (state : CalendarEvent[] = [], action: Action) => {
  switch(action.type) {
      case ADD_EVENT:
          return [
              ...state,
              action.payload
          ];
      
      case REMOVE_EVENT:
          return state.filter(event => event.id !== action.payload);
            
      case UPDATE_EVENT:
          return state.map(event => {
            if(event.id !== action.payload){
               return event;
            }
            return Object.assign({}, event, {
                title: event.title,
                start: event.start,
                duration: event.duration
            });
          });
          
      default:
          return state;
  }
};
