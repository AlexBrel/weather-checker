import Immutable = require('immutable');
import { Component, Input, OnChanges, Output, EventEmitter, ChangeDetectionStrategy,
    ChangeDetectorRef
} from '@angular/core';
import {Observable} from 'rxjs';
import {URLSearchParams, Response, Http} from '@angular/http';

import commonConstants from '../common/common-constants';
import City from '../common/city';
import mockWeatherResponse from './mock-weather-response';
import TemperatureUnit from '../common/temperature-unit';


@Component({
    selector: 'region-weather',
    templateUrl: 'region-weather.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionWeatherComponent implements OnChanges {
    @Input() coordinates: Immutable.Map<string, number>;
    @Output() tableReady = new EventEmitter();

    cities: Immutable.List<City>;
    selectedTempUnit: TemperatureUnit;

    constructor(private http: Http, private cd: ChangeDetectorRef) {}

    ngOnChanges() {
        if (this.coordinates) {
            this.generateTable();
        }
    }

    unitSelected(selectedUnit: TemperatureUnit) {
        this.selectedTempUnit = selectedUnit;
    }

    private generateTable() {
        this.getRegionWeather().subscribe(
            (citiesWeather: Immutable.List<City>) => {
                this.cities = citiesWeather;
                this.cd.markForCheck();
                this.tableReady.emit({error: null, isTableReady: true, isLoading: false});
            },
            (error: Error) => {
                this.tableReady.emit({error: error, isTableReady: false, isLoading: false});
            }
        );
    }

    // TODO: move it in service in future
    private getRegionWeather(): Observable<Immutable.List<City>> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('lat', this.coordinates.get('lat').toString());
        params.set('lon', this.coordinates.get('long').toString());
        params.set('cnt', commonConstants.owm.count.toString());
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        let request = this.http.get(commonConstants.owm.regionUrl, {search: params})
            .map((resp: Response) => resp.json().list as City[])
            .catch((error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                console.error(`Request Failed: ${error}`);
                return Observable.of(mockWeatherResponse);
            });

        return request.expand(() => {
            return Observable.timer(5000).concatMap(() => {
                this.tableReady.emit({error: null, isTableReady: true, isLoading: true});
                return request
            });
        });
    }
}