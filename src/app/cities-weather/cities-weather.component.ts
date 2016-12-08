import {Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";

import commonConstants from "../common-constants";
import City from "./city";
import mockWeatherResponse from "./mock-weather-response";
import OwmCity from "./owm-city";
import TemperatureUnit from "./temperature-unit";


@Component({
    selector: "cities-weather",
    templateUrl: "cities-weather.component.html",
    styleUrls: ["cities-weather.component.css"]

})
export class CitiesWeatherComponent implements OnChanges {
    @Input() lat: number;
    @Input() long: number;
    @Output() tableReady = new EventEmitter();

    cities: City[];
    temperatureUnits = [TemperatureUnit.Celsius, TemperatureUnit.Fahrenheit, TemperatureUnit.Kelvin];
    temperatureUnitShortcuts = ["°C", "°F", "K"];
    selectedTempUnit = this.temperatureUnits[0];

    ngOnChanges() {
        if (this.lat && this.long) {
            this.generateTable();
        }
    }

    private generateTable() {
        this.getCitiesWeather().then((citiesWeather: City[]) => {
            this.cities = citiesWeather;
            this.tableReady.emit({error: null, isTableReady: true});
        }).catch(error => {
            this.tableReady.emit({error: error, isTableReady: false});
        });
    }

    private getCitiesWeather(): Promise<City[]> {
        return new Promise(resolve => {
            $.getJSON(commonConstants.owm.url, {
                lat: this.lat,
                lon: this.long,//
                cnt: commonConstants.owm.count,
                lang: commonConstants.owm.lang,
                units: commonConstants.owm.units,
                APPID: commonConstants.owm.apiID+ "dfefdev"
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