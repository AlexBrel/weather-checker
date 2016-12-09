import {Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";

import commonConstants from "../common/common-constants";
import City from "../common/city";
import mockWeatherResponse from "./mock-weather-response";
import TemperatureUnit from "../common/temperature-unit";


@Component({
    selector: "region-weather",
    templateUrl: "region-weather.component.html"

})
export class RegionWeatherComponent implements OnChanges {
    @Input() lat: number;
    @Input() long: number;
    @Output() tableReady = new EventEmitter();

    cities: City[];
    selectedTempUnit: TemperatureUnit;

    ngOnChanges() {
        if (this.lat && this.long) {
            this.generateTable();
        }
    }

    unitSelected(selectedUnit: TemperatureUnit) {
        this.selectedTempUnit = selectedUnit;
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
            $.getJSON(commonConstants.owm.regionUrl, {
                lat: this.lat,
                lon: this.long,
                cnt: commonConstants.owm.count,
                lang: commonConstants.owm.lang,
                units: commonConstants.owm.units,
                APPID: commonConstants.owm.apiID
            }).done(weather => {
                resolve(weather.list);
            }).fail((jqxhr, textStatus, error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                resolve(mockWeatherResponse);
                console.error("Request Failed: " + textStatus + ", " + error);
                // reject("Request Failed: " + textStatus + ", " + error);
            });
        });
    }
}