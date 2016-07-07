import { Input, Output, EventEmitter, ChangeDetectionStrategy, ElementRef } from "@angular/core";
import { Date } from '@angular/';
import { BaseComponent } from '../../frameworks/core.framework/index';
import { NgGridItem, NgGridItemConfig } from 'angular2-grid';
import { CalendarService } from './calendar.service';

@BaseComponent({
    selector: 'calendar-event',
    templateUrl: './app/components/calendar/calendar-event.component.html',
    directives: [NgGridItem]
})
export class CalendarEventComponent {

    @Input() eventData: any;
    @Input() config: NgGridItemConfig;
    @Input() calendarService: CalendarService;

    private changing : boolean = false;
    private startTime: Date;
    private endTime: Date;

    constructor() {}

    startChanging = (event: any) => {
        this.changing = true;
    }

    stopChanging = (event: any) => {
        this.changing = false;
    }

    onChange = (event: {col: number, row: number, sizex: number, sizey: number}) => {
        this.startTime = this.calendarService.getTimeForRow(event.row);
        this.endTime = this.calendarService.getTimeForRow(event.row + event.sizey);
    }
}