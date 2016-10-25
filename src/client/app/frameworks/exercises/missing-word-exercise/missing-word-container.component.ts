// angular

// libs
import * as _ from 'lodash';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/map';

// app
import { BaseComponent } from '../../core/index';
import { MissingWordSentence, MissingWordAnswer } from './missing-word-exercise.model';
import { AddAnswerAction, ValidateAction } from './missing-word-exercise.actions';
import * as fromRoot from '../index';


@BaseComponent({
    moduleId: module.id,
    selector: 'sd-missing-word-page',
    templateUrl: 'missing-word-page.component.html'
})
export class MissingWordContainerComponent {

    sentences_nums: Observable<String[]>;
    sentences: Observable<{ [sentences_num: string]: MissingWordSentence }>;
    missing_words: Observable<String[]>;
    answers: Observable<{ [sentences_num: string]: MissingWordAnswer }>;
    validated: Observable<boolean>;

    constructor(private store: Store<any>) {
        this.sentences_nums = store.let(fromRoot.getSelectedExerciseSentencesNums);
        this.sentences = store.let(fromRoot.getSelectedExerciseSentences);
        this.missing_words = store.let(fromRoot.getSelectedExerciseMissingWords);
        this.answers = store.let(fromRoot.getSelectedExerciseMissingWordsAnswers);
        this.validated = store.let(fromRoot.isSelectedExerciseValidated);
    }

    onAnswer(answer: MissingWordAnswer) {
        this.store.dispatch(new AddAnswerAction(answer));
    }

    onValidate($event: any) {
        this.store.dispatch(new ValidateAction());
    }
}
