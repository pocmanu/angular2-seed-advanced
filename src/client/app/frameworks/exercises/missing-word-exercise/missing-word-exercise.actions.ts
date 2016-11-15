import { Action } from '@ngrx/store';
import { type } from '../../core/index';
 
export const ActionTypes = {
    ADD_ANSWER: type('[Missing word exercise] Add answer'),
    VALIDATE:   type('[Missing word exercise] Validate'),
};

export class AddAnswerAction implements Action {
    type = ActionTypes.ADD_ANSWER;

    constructor(public payload: { sentence_num: number, word_position: number, word: string }) { };
}

export class ValidateAction implements Action {
    type = ActionTypes.VALIDATE;
}

export type Actions
    = AddAnswerAction
    | ValidateAction;
