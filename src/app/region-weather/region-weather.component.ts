import Immutable = require('immutable');
import {Component, Input, OnChanges, Output, EventEmitter, ChangeDetectorRef} from '@angular/core';
import {Observable} from 'rxjs';
import {URLSearchParams, Response, Http} from '@angular/http';

import commonConstants from '../common/common-constants';
import City from '../common/city';
import mockWeatherResponse from './weather-response.mock';


@Component({
    selector: 'region-weather',
    templateUrl: 'region-weather.component.html'
})
export class RegionWeatherComponent implements OnChanges {
    @Input() coordinates: Immutable.Map<string, number>;
    @Output() tableReady = new EventEmitter();

    cities: Immutable.List<City>;
    selectedTempUnit: string;

    constructor(private http: Http, private cd: ChangeDetectorRef) {
        this.cd.detach();
    }

    ngOnChanges() {
        if (this.coordinates) {
            this.generateTable();
        }
    }

    unitSelected(selectedUnit: string) {
        this.selectedTempUnit = selectedUnit;
    }

    private generateTable() {
        this.getRegionWeather().subscribe(
            (citiesWeather: Immutable.List<City>) => {
                this.cities = citiesWeather;
                this.tableReady.emit({error: null, isTableReady: true});
                this.cd.detectChanges();
            },
            (error: Error) => {
                this.tableReady.emit({error: error, isTableReady: false});
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
            .map((resp: Response) => Immutable.List.of(...resp.json().list))
            .catch((error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                console.error(`Request Failed: ${error}`);
                return Observable.of(Immutable.List.of(...mockWeatherResponse));
            });

        return request.expand(() => {
            return Observable.timer(5000).concatMap(() => {
                this.tableReady.emit({error: null, isTableReady: false});
                return request;
            });
        });
    }
}