import { Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { BaseComponent } from '../../frameworks/core/index';
import { NgGridItem, NgGridItemConfig, NgGridItemEvent } from 'angular2-grid';
import { CalendarHelper } from './calendar.helper';

@BaseComponent({
    selector: 'calendar-event',
    templateUrl: './app/components/calendar/calendar-event.component.html',
    directives: [NgGridItem]
})
export class CalendarEventComponent {

    @Input() eventData: any;
    @Input() config: NgGridItemConfig;
    @Input() calendarHelper: CalendarHelper;

    @Output() onChange: EventEmitter<NgGridItemEvent> = new EventEmitter<NgGridItemEvent>();

    private changing: boolean = false;
    private startTime: Date;
    private endTime: Date;

    constructor() { }

    startChanging = (event: NgGridItemEvent) => {
        this.changing = true;
    }

    stopChanging = (event: NgGridItemEvent) => {
        this.changing = false;
        this.onChange.next(event);
    }

    update = (event: NgGridItemEvent) => {
        this.startTime = this.calendarHelper.getTimeForRow(event.row);
        this.endTime = this.calendarHelper.getTimeForRow(event.row + event.sizey);
    }
}