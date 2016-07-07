import { NgGridConfig, NgGridItemConfig } from 'angular2-grid';

export class CalendarService {

    private _config: any = {
        rowToMin: 1,
        calStartTime: new Date(1970, 1, 1, 0, 0, 0, 0)
    };

    constructor(config: { rowToMin: number, calStartTime: Date }) {
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
export interface CalendarEvent {
    id: number;
    title: String;
    start: Date;
    duration: number;
}
