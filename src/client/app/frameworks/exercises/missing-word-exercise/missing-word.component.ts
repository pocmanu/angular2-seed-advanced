// angular
import { Input } from '@angular/core';

// app
import { BaseComponent } from '../../core/index';

@BaseComponent({
    moduleId: module.id,
    selector: 'sd-missing-word',
    templateUrl: 'missing-word.component.html'
})
export class MissingWordComponent {

    @Input() isAnswered: boolean;
    @Input() isValidated: boolean;
    @Input() isValid: boolean;
    @Input() answer: String;
}
