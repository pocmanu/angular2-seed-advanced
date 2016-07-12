import { NgGridConfig, NgGridItemConfig } from 'angular2-grid';

import { CalendarService, CalendarEvent } from '../../frameworks/app/index';

export { CalendarEvent } from '../../frameworks/app/index';

export class CalendarHelper {

    private _config: {
        rowToMin: number,
        calStartTime: Date
    };

    constructor(config: { rowToMin: number, calStartTime: Date }, private calendarService: CalendarService) {
        this._config = config;
    }

    getTimeForRow(row: number): Date {
        let startTime = this._config.calStartTime.getTime();
        let minutes = (row - 1) * this._config.rowToMin;
        return new Date(startTime + minutes * 60 * 1000);
    }

    getConfig(event: {start: Date, duration: number}): NgGridItemConfig {
        let duration: number = event.duration;
        let settings: NgGridItemConfig = { row: 0, col: 0, sizex: 0, sizey: 0 };
        settings.col = Math.trunc((event.start.getTime() - this._config.calStartTime.getTime()) / (1000 * 60 * 60 * 24)) + 1;
        settings.row = Math.trunc((event.start.getTime() - this._config.calStartTime.getTime() - (settings.col - 1) * 1000 * 60 * 60 * 24) / (this._config.rowToMin * 1000 * 60)) + 1;
        settings.sizey = Math.trunc(duration / this._config.rowToMin);
        settings.sizex = 1;
        settings.draggable = true;
        return settings;
    }

    getEventData(config: NgGridItemConfig): {start: Date, duration: number} {
        let data = {start: this._config.calStartTime, duration: 0};
        data.duration = config.sizey * this._config.rowToMin;
        data.start = new Date(data.start.getTime() + (config.col - 1) * 1000 * 60 * 60 * 24 + (config.row - 1) * this._config.rowToMin * 1000 * 60);
        return data;
    }

    getConfigForTimeline(time: Date) {
        let config = this.getConfig({start: time, duration: 15});
        config.col = -1;
        config.draggable = false;
        return config;
    }

    getTimes(event: CalendarEvent) {
        let start = new Date(this._config.calStartTime.getTime());
        start.setHours(event.start.getHours());
        start.setMinutes(event.start.getMinutes());
        return [start, new Date(start.getTime() + event.duration * 60 * 1000)];
    }
}
