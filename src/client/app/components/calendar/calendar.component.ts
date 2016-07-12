import { ViewEncapsulation, ChangeDetectionStrategy, EventEmitter } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs/Rx';
import { BaseComponent } from '../../frameworks/core.framework/index';
import { NgGrid, NgGridItem, NgGridConfig, NgGridItemConfig, NgGridItemEvent } from 'angular2-grid';
import { CalendarEventComponent } from './calendar-event.component';
import { CalendarHelper, CalendarEvent } from './calendar.helper';
import * as _ from 'lodash';

@BaseComponent({
  selector: 'sd-calendar',
  templateUrl: './app/components/calendar/calendar.component.html',
  styleUrls: ['./app/components/calendar/calendar.component.css'],
  directives: [NgGrid, NgGridItem, CalendarEventComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent {

  private _config: any = {
    rowToMin: 5,
    calStartTime: new Date(1970, 1, 1, 8, 0, 0, 0)
  };

  private _eventTableConfig: NgGridConfig = {
    margins: [0, 0], min_cols: 1, max_cols: 6, min_height: 14,
    col_width: 130, row_height: 6, cascade: 'none'
  };

  private _titles: Array<any> = [
    { title: 'Lundi', config: { row: -2, col: 1, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Mardi', config: { row: -2, col: 2, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Mercredi', config: { row: -2, col: 3, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Jeudi', config: { row: -2, col: 4, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Vendredi', config: { row: -2, col: 5, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } }
  ];

  private _events: Observable<Array<CalendarEvent>> = Observable.of([
    { id: 1, title: 'Math', start: new Date(1970, 1, 1, 10, 0, 0), duration: 60 },
    { id: 2, title: 'Français', start: new Date(1970, 1, 2, 11, 0, 0), duration: 90 }
  ]);

  private events$: Observable<any>;

  private timeline: Observable<any[]>;

  private calendarHelper: CalendarHelper

  constructor() {
    this.calendarHelper = new CalendarHelper(this._config);
    this.events$ = this._events.map(events => events.map((event) => Object.assign({}, event, { config: this.calendarHelper.getConfig(event) })));
    this.timeline = this._events.map(events => events.map(event => this.calendarHelper.getTimes(event)))
      .map(times => 
        _.uniqWith(_.flatten(times), _.isEqual)
        .map(time => Object.assign({}, {title:time}, { config: this.calendarHelper.getConfigForTimeline(time) }))
      )
  }

  updateEvent = (event: NgGridItemEvent) => {
    console.log(event);
  }
}
