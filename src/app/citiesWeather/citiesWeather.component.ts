import {Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";

import commonConstants from "../commonConstants";
import City from "./city";
import mockWeatherResponse from "./mockWeatherResponse";
import OwmCity from "./owmCity";

@Component({
    selector: "cities-weather",
    templateUrl: "citiesWeather.component.html",
    styleUrls: ["citiesWeather.component.css"]

})
export class CitiesWeatherComponent implements OnChanges {
    @Input() lat: number;
    @Input() long: number;
    @Output() tableReady = new EventEmitter();

    cities: City[];

    ngOnChanges() {
        if (this.lat && this.long) {
            this.generateTable();
        }
    }

    private generateTable() {
        this.getCitiesWeather().then((citiesWeather: City[]) => {
            this.cities = citiesWeather;

            this.tableReady.emit();
        }).catch(error => {
            this.tableReady.emit(error);
        });
    }

    private getCitiesWeather(): Promise<City[]> {
        return new Promise(resolve => {
            $.getJSON(commonConstants.owm.url, {
                lat: this.lat,
                lon: this.long,
                cnt: commonConstants.owm.count,
                lang: commonConstants.owm.lang,
                units: commonConstants.owm.units,
                APPID: commonConstants.owm.apiID
            }).done(weather => {
                resolve(this.mapOwmResponseToCities(weather.list));
            }).fail((jqxhr, textStatus, error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                resolve(this.mapOwmResponseToCities(mockWeatherResponse));
                console.error("Request Failed: " + textStatus + ", " + error);
                // reject("Request Failed: " + textStatus + ", " + error);
            });
        });
    }

    private mapOwmResponseToCities(weather: OwmCity[]): City[] {
        return weather.map(cityWeather => {
            return new City(cityWeather.name, cityWeather.main);
        });
    }

}