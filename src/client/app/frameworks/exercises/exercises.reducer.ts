import '@ngrx/core/add/operator/select';
import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';

import { ActionReducer, Action, combineReducers }  from '@ngrx/store';

import * as fromMissingWord from './missing-word-exercise/missing-word-exercise.reducer';

export interface State {
  ids: String[];
  entities: {};
  selected_ex_id: number;
  selected_ex_type: number;
  selected_ex_data: fromMissingWord.MissingWordState;
};

const exercises: ActionReducer<any> = (state = {}, action: Action) => {
  return state;
};

export const exercisesReducer = combineReducers({
  exercises,
  selected_ex_data: fromMissingWord.missing_word_exercise_red
});

export function getExercisesState(state$: Observable<any>) {
  return state$.select(state => state.exercises);
}
export function getSelectedExerciseState(state$: Observable<State>) {
  return getExercisesState(state$).select(state => state.selected_ex_data);
}
