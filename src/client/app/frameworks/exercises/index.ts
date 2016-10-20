
import { compose } from '@ngrx/core/compose';

import * as fromMissingWord from './missing-word-exercise/missing-word-exercise.reducer';
import { getSelectedExerciseState } from './exercises.reducer';

export { ExercisesRoutes } from './exercises.routes';
export { ExercisesComponent } from './exercises.component';
export { exercisesReducer } from './exercises.reducer';

export const getSelectedExerciseSentences = compose(fromMissingWord.getMissingWordsSentences, getSelectedExerciseState);
export const getSelectedExerciseMissingWordsAnswers = compose(fromMissingWord.getMissingWordsAnswers, getSelectedExerciseState);
export const getSelectedExerciseSentencesNums = compose(fromMissingWord.getMissingWordsNums, getSelectedExerciseState);
export const getSelectedExerciseMissingWords = compose(fromMissingWord.getMissingWords, getSelectedExerciseState);
export const isSelectedExerciseValidated = compose(fromMissingWord.isValidated, getSelectedExerciseState);
