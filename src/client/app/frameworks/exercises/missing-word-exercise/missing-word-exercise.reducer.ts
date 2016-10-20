import { ActionReducer, Action } from '@ngrx/store';
import '@ngrx/core/add/operator/select';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

import * as _ from 'lodash';

import { MissingWordSentence, MissingWordAnswer } from './missing-word-exercise.model';
import { ADD_ANSWER, VALIDATE } from './missing-word-exercise.actions';

export interface MissingWordState {
    sentences_nums: String[];
    sentences: {
        [sentence_num: string]: MissingWordSentence;
    };
    answers: {
        [sentence_num: string]: MissingWordAnswer;
    };
    validated: boolean;
};

const initialState: MissingWordState = {
    sentences_nums: ['1', '2'],
    sentences: {
        '1': { words: ['waf', 'tagada', 'pif paf pouf', 'wef'], missing_words_positions: [1] },
        '2': { words: ['Il', 'était', 'une fois', 'trois', 'petits cochons'], missing_words_positions: [1, 3] }
    },
    answers: {
        '1': {},
        '2': {}
    },
    validated: false
};

export const missing_word_exercise_red: ActionReducer<any> = (state = initialState, action: Action) => {

    switch (action.type) {
        case ADD_ANSWER:
            let answer: { sentence_num: number, word_position: number, word: string } = action.payload;
            let sentence_answers = state.answers[answer.sentence_num];
            let new_sentence_answers = Object.assign({}, sentence_answers, { [answer.word_position]: { word: answer.word } });
            let new_answers = Object.assign({}, state.answers, { [answer.sentence_num]: new_sentence_answers });
            return Object.assign({}, state, { answers: new_answers });

        case VALIDATE:
            let validated_answers = _.transform(state.answers,
                (sentence_answers, sentence_answer, sentence_num) => sentence_answers[sentence_num] = _.transform(sentence_answer,
                    (word_answers, word_answer, word_index) => word_answers[word_index] = {
                        word: word_answer.word,
                        valid: state.sentences[sentence_num].words[+word_index] === word_answer.word
                    }
                )
            );
            console.log(validated_answers)
            return Object.assign({}, state, { answers: validated_answers, validated: true });
        default:
            return state;
    }
};

export function getMissingWordsNums(state: Observable<MissingWordState>) {
    return state.select(state => state.sentences_nums);
}
export function getMissingWordsSentences(state: Observable<MissingWordState>) {
    return state.select(state => state.sentences);
}
export function getMissingWordsAnswers(state: Observable<MissingWordState>) {
    return state.select(state => state.answers);
}
export function isValidated(state: Observable<MissingWordState>) {
    return state.select(state => state.validated);
}
export function getSentences(state: Observable<MissingWordState>) {
    return combineLatest<{ [id: string]: MissingWordSentence }, string[]>(
        state.let(getMissingWordsSentences),
        state.let(getMissingWordsNums)
    ).map(([entities, ids]) => ids.map(id => entities[id]));
}
export function getAnswers(state: Observable<MissingWordState>): Observable<MissingWordAnswer[]> {
    return combineLatest<{ [id: string]: MissingWordAnswer }, string[]>(
        state.let(getMissingWordsAnswers),
        state.let(getMissingWordsNums)
    ).map(([entities, ids]) => ids.map(id => entities[id]));
}
export function getMissingWords(state: Observable<MissingWordState>): Observable<String[]> {
    return combineLatest<MissingWordSentence[], MissingWordAnswer[]>(
        state.let(getSentences),
        state.let(getAnswers)
    ).map(([sentences, answers]) => [
        _.chain(sentences).map(
            sentence => sentence.words.filter(
                word => sentence.missing_words_positions.indexOf(sentence.words.indexOf(word)) >= 0
            )
        ).flatten().value() as String[],
        _.chain(answers).map(answer => _.values(answer)).flatten().map((answer: { word: String }) => answer.word).value()
    ]).map(([sentences, answers]) => { console.log(answers); return _.difference(sentences, answers) });
}
