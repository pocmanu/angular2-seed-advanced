// angular
import { Input, Output, EventEmitter } from '@angular/core';

// libs
import * as _ from 'lodash';

// app
import { BaseComponent } from '../../core/index';
import { MissingWordSentence, MissingWordAnswer } from './missing-word-exercise.model';

@BaseComponent({
    moduleId: module.id,
    selector: 'sd-missing-word-exercise',
    templateUrl: 'missing-word-exercise.component.html'
})
export class MissingWordExerciseComponent {

    @Input() sentences_nums: String[];
    @Input() sentences: { [sentences_num: string]: MissingWordSentence };
    @Input() missing_words: String[];
    @Input() answers: { [sentences_num: string]: MissingWordAnswer };
    @Input() validated: boolean;

    @Output() answer: EventEmitter<any> = new EventEmitter<any>();
    @Output() validate: EventEmitter<any> = new EventEmitter<any>();

    getWords(sentence_num: number) {
        return this.sentences[String(sentence_num)].words;
    }

    isMissingWord(sentence_num: number, word_index: number) {
        return this.sentences[String(sentence_num)].missing_words_positions.indexOf(word_index) >= 0;
    }

    isAnswered(sentence_num: number, word_index: number) {
        return _.has(this.answers[String(sentence_num)], word_index);
    }

    getAnswerAt(sentence_num: number, word_index: number) {
        return this.isAnswered(sentence_num, word_index) ? this.answers[String(sentence_num)][String(word_index)].word : null;
    }

    isValid(sentence_num: number, word_index: number) {
        return this.validated ? this.answers[String(sentence_num)][String(word_index)].valid : null;
    }

    transferDataSuccess($event: any, sentence_index: number, word_index: number) {
        this.answer.emit({ sentence_num: sentence_index, word_position: word_index, word: $event.dragData });
    }

    onValidate($event: any) {
        this.validate.emit($event);
    }
}
