//todos reducer

/*export const ADD_TODO = '[Todos] Add';
export const ADD_TODO_SAVED = '[Todos] Saved Add';
export const UPDATE_TODO = 'UPDATE_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const ADD_EVENT_FROM_DB = '[Todos] Add event from DB';

export const todos = (state = [], {type, payload}) => {
  console.log('ACTION:', type, payload);
  switch(type){
    case ADD_TODO:
    console.log('new todo added, payload = object from UI :', payload)
      return state.concat([Object.assign({}, payload, {id: state.length + 1})]);
    case UPDATE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, payload)
      });
    case COMPLETE_TODO:
      return state.map(todo => {
        return todo.id !== payload.id ?
          todo :
          Object.assign({}, todo, {completed: true})
      });
    case DELETE_TODO:
      return state.filter(todo => todo.id !== payload.id);
    case ADD_TODO_SAVED: {
      console.log('youhou ça devrait être dans hoodie');
      return state;
    }
    case ADD_EVENT_FROM_DB: {
      console.log("nous recevons une notif d'ajout de la part de hoodie");
      return state;
    }
    default:
      return state;
  }
}*/

export const ALL = 'ALL'
export const COMPLETE = 'COMPLETE'
export const PENDING = 'PENDING'

export const visibilityFilter = (state = (todo) => true, {type, payload}) => {
  switch(type){
    case ALL:
      return (todo) => true;
    case COMPLETE:
      return (todo) => todo.completed;
    case PENDING:
      return (todo) => !todo.completed;
    default:
      return state;
  }
}