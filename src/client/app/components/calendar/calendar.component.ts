import {BaseComponent} from '../../frameworks/core.framework/index';
import {NgGrid, NgGridItem, NgGridConfig, NgGridItemConfig} from 'angular2-grid';

@BaseComponent({
  selector: 'sd-calendar',
  templateUrl: './app/components/calendar/calendar.component.html',
  styleUrls: ['./app/components/calendar/calendar.component.css'],
  directives: [NgGrid, NgGridItem]
})
export class CalendarComponent  {

  private _config: any = {
      rowToMin: 5,
      calStartTime: new Date(2016, 5, 20, 8, 0, 0, 0)
    };

  private _eventTableConfig: NgGridConfig = {margins: [0, 0], min_cols: 1, max_cols: 6, min_height: 14, 
                 col_width: 130, row_height:7, cascade:'none'};

  private _titles: Array<any> = [
      { title: 'Lundi',    config: { row: 1, col: 1, sizex: 1, sizey: 1, draggable: false, resizable: true, fixed: true } },
      { title: 'Mardi',    config: { row: 1, col: 2, sizex: 1, sizey: 1, draggable: false, resizable: false, fixed: true } },
      { title: 'Mercredi', config: { row: 1, col: 3, sizex: 1, sizey: 1, draggable: false, resizable: false, fixed: true } },
      { title: 'Jeudi',    config: { row: 1, col: 4, sizex: 1, sizey: 1, draggable: false, resizable: false, fixed: true } },
      { title: 'Vendredi', config: { row: 1, col: 5, sizex: 1, sizey: 1, draggable: false, resizable: false, fixed: true } }
  ];

  private _events: Array<CalendarEvent> = [
    { id: 1, title: 'Math', start: new Date(2016, 5, 20, 10, 0, 0), duration: 60 },
    { id: 2, title: 'Français', start: new Date(2016, 5, 21, 15, 0, 0), duration: 120 }
  ];

  onClick(box: NgGridItem) {
    console.log(box.config);
  }

  getConfig(event: CalendarEvent): NgGridItemConfig {
    let duration: number = event.duration;
		let settings: NgGridItemConfig = { row: 0, col: 0, sizex: 0, sizey: 0 };
		settings.col   = Math.trunc((event.start.getTime() - this._config.calStartTime.getTime()) / (1000 * 60 * 60 * 24)) + 1;
		settings.row   = Math.trunc((event.start.getTime() - this._config.calStartTime.getTime() - (settings.col - 1) * 1000 * 60 * 60 * 24) / (this._config.rowToMin * 1000 * 60)) + 1;
		settings.sizey = Math.trunc(duration / this._config.rowToMin);
		settings.sizex = 1;
		return settings;
  }
  
  updateEvent(event:any) {
    console.log(event);
  }
}
interface CalendarEvent {
  id: number;
  title: String;
  start: Date;
  duration: number;
}
