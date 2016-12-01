import {Component, Input, OnChanges, Output, EventEmitter} from '@angular/core';

import commonConstants from '../commonConstants';
import CityWeather from './cityWeather';
import mockWeather from './mockWeather';

@Component({
    selector: 'weather-table',
    templateUrl: './weatherTable.component.html',
    styleUrls: ['./weatherTable.component.css']

})
export class WeatherTableComponent implements OnChanges {
    @Input() lat: number;
    @Input() long: number;
    @Output() tableReady = new EventEmitter();

    cities: CityWeather[];

    ngOnChanges() {
        if (this.lat && this.long) {
            this.generateTable();
        }
    }

    private generateTable() {
        this.getCitiesWeather().then((citiesWeather: CityWeather[]) => {
            this.cities = citiesWeather;

            this.tableReady.emit();
        }).catch(error => {
            this.tableReady.emit(error);
        });
    }

    private getCitiesWeather(): Promise<CityWeather[]> {
        return new Promise((resolve, reject) => {
            $.getJSON(commonConstants.owm.url, {
                lat: this.lat,
                lon: this.long,
                cnt: commonConstants.owm.count,
                lang: commonConstants.owm.lang,
                units: commonConstants.owm.units,
                APPID: commonConstants.owm.apiID
            }).done((weather) => {
                resolve(this.mapWeatherToCitiesWeather(weather));
            }).fail((jqxhr, textStatus, error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                resolve(this.mapWeatherToCitiesWeather(mockWeather));
                // reject("Request Failed: " + textStatus + ", " + error);
            });
        });
    }

    private mapWeatherToCitiesWeather(weather: Object): CityWeather[] {
        let citiesWeather: CityWeather[] = [];

        for (let i = 0; i < mockWeather.list.length; i++) {
            citiesWeather.push(new CityWeather(mockWeather.list[i].name, mockWeather.list[i].main));
        }

        return citiesWeather;
    }

}