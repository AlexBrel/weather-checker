import Immutable = require('immutable');
import {
    Component, Input, Output, EventEmitter, ChangeDetectorRef,
    ChangeDetectionStrategy
} from '@angular/core';
import {Observable, Scheduler} from 'rxjs';
import {URLSearchParams, Response, Http} from '@angular/http';

import commonConstants from '../common/common-constants';
import City from '../common/city';
import mockWeatherResponse from './weather-response.mock';


@Component({
    selector: 'region-weather',
    templateUrl: 'region-weather.component.html',
    styleUrls: ['region-weather.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegionWeatherComponent {
    private coords: Immutable.Map<string, number>;

    @Input() set coordinates(coords: Immutable.Map<string, number>) {
        if (coords) {
            this.coords = coords;
            this.generateTable();
        }
    };

    @Output() tableReady = new EventEmitter();

    cities: Immutable.List<City>;
    selectedTempUnit: string;

    constructor(private http: Http, private cd: ChangeDetectorRef) {
    }

    selectUnit(selectedUnit: string) {
        this.selectedTempUnit = selectedUnit;
    }

    private generateTable() {
        this.getRegionWeather().subscribe(
            (citiesWeather: Immutable.List<City>) => {
                this.cities = citiesWeather;
                this.tableReady.emit({error: null, isTableReady: true});
                this.cd.markForCheck();
            },
            (error: Error) => {
                this.tableReady.emit({error: error, isTableReady: false});
            }
        );
    }

    // TODO: move it in service in future
    private getRegionWeather(): Observable<Immutable.List<City>> {
        let params: URLSearchParams = new URLSearchParams(),
            $weatherThread: Observable<Immutable.List<City>>;

        params.set('lat', this.coords.get('lat').toString());
        params.set('lon', this.coords.get('long').toString());
        params.set('cnt', commonConstants.owm.count.toString());
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        $weatherThread = this.http.get(commonConstants.owm.regionUrl, {search: params})
            .map((resp: Response) => Immutable.List.of(...resp.json().list))
            .catch((error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                console.error(`Request Failed: ${error}`);
                return Observable.of(Immutable.List.of(...mockWeatherResponse));
            })
            .observeOn(Scheduler.async);

        return $weatherThread.expand(() => {
            return Observable.timer(5000).concatMap(() => {
                this.tableReady.emit({error: null, isTableReady: false});
                return $weatherThread;
            });
        });
    }
}