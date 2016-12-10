import {Component, Input, OnChanges, Output, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import {URLSearchParams, Response, Http} from "@angular/http";

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

    constructor(private http: Http) {}

    ngOnChanges() {
        if (this.lat && this.long) {
            this.generateTable();
        }
    }

    unitSelected(selectedUnit: TemperatureUnit) {
        this.selectedTempUnit = selectedUnit;
    }

    private generateTable() {
        this.getRegionWeather().subscribe(
            (citiesWeather: City[]) => {
                this.cities = citiesWeather;
                this.tableReady.emit({error: null, isTableReady: true});
            },
            (error: Error) => {
                this.tableReady.emit({error: error, isTableReady: false});
            }
        );
    }

    //TODO: move it in service in future
    private getRegionWeather(): Observable<City[]> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('lat', this.lat.toString());
        params.set('lon', this.long.toString());
        params.set('cnt', commonConstants.owm.count.toString());
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        return this.http.get(commonConstants.owm.regionUrl, {search: params})
            .map((resp: Response) => resp.json().list as City[])
            .catch((error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                console.error(`Request Failed: ${error}`);
                return Observable.of(mockWeatherResponse);
            })

    }
}