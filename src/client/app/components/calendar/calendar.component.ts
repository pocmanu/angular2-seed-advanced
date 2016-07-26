import { ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BaseComponent } from '../../frameworks/core/index';
import { CalendarService } from '../../frameworks/app/index';
import { NgGrid, NgGridItem, NgGridConfig, NgGridItemEvent } from 'angular2-grid';
import { CalendarEventComponent } from './calendar-event.component';
import { CalendarHelper, CalendarEvent } from './calendar.helper';
import * as _ from 'lodash';

@BaseComponent({
  selector: 'sd-calendar',
  templateUrl: './app/components/calendar/calendar.component.html',
  styleUrls: ['./app/components/calendar/calendar.component.css'],
  directives: [NgGrid, NgGridItem, CalendarEventComponent],
  encapsulation: ViewEncapsulation.None
})
export class CalendarComponent {

  private _config: any = {
    rowToMin: 5,
    calStartTime: new Date(1970, 1, 1, 8, 0, 0, 0)
  };

  private _eventTableConfig: NgGridConfig = {
    margins: [0, 0], min_cols: 1, max_cols: 5, max_rows: 102, min_height: 14,
    col_width: 130, row_height: 6, cascade: 'none'
  };

  private _titles: Array<any> = [
    { title: 'Lundi', config: { row: -2, col: 1, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Mardi', config: { row: -2, col: 2, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Mercredi', config: { row: -2, col: 3, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Jeudi', config: { row: -2, col: 4, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } },
    { title: 'Vendredi', config: { row: -2, col: 5, sizex: 1, sizey: 3, draggable: false, resizable: false, fixed: true } }
  ];

  private _events: Observable<Array<CalendarEvent>>;

  private events$: Observable<any>;

  private timeline: Observable<any[]>;

  private calendarHelper: CalendarHelper;

  constructor(private calendarService: CalendarService) {
    this.calendarHelper = new CalendarHelper(this._config, this.calendarService);
    this._events = calendarService.events;
    this.events$ = this._events.map(events => events.map((event) => Object.assign({}, event, { config: this.calendarHelper.getConfig(event) })));
    this.timeline = this._events.map(events => events.map(event => this.calendarHelper.getTimes(event)))
      .map(times => 
        _.uniqWith(_.flatten(times), _.isEqual)
        .map(time => Object.assign({}, {title:time}, { config: this.calendarHelper.getConfigForTimeline(time) }))
      );
  }

  updateEvent = (event: {id: number, newconfig: NgGridItemEvent}) => {
    console.log(event);
    let change = {id: event.id, start: new Date(), duration: 0};
    let newData = this.calendarHelper.getEventData(event.newconfig);
    change.start = newData.start;
    change.duration = newData.duration;
    this.calendarService.updateEvent(change);
  }

  undo() {
    this.calendarService.undo();
  }

  redo() {
    this.calendarService.redo();
  }

  stop(event: any) {
    console.log(event)
  }
}
