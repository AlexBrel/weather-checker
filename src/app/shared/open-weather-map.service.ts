import {Map, List} from 'immutable';
import {Observable, Subject} from 'rxjs';
import {Http, URLSearchParams, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import {commonConstants} from '../common/common-constants';
import {City} from '../common/city';
import {mockCityWeatherResponse} from './mock-requests/city-weather-response.mock';
import {mockWeatherResponse} from './mock-requests/weather-response.mock';

@Injectable()
export class OpenWeatherMapService {
    constructor(private http: Http) {
    }

    public getCityWeather(cityName: string): Observable<City> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('q', cityName);
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        return this.http.get(commonConstants.owm.cityUrl, {search: params})
            .map((resp: Response) => resp.json() as City)
            .catch(error => {
                console.error(`Request Failed: ${error}`);
                return Observable.of({name: cityName, main: mockCityWeatherResponse.main});
            });
    }

    public getRegionWeather(coords: Map<string, number>, $isWeatherUpdates: Subject<boolean>) {
        let $regionWeather = new Subject<List<City>>(),
            params: URLSearchParams = new URLSearchParams(),
            timePeriod = 5000;

        params.set('lat', coords.get('lat').toString());
        params.set('lon', coords.get('long').toString());
        params.set('cnt', commonConstants.owm.count.toString());
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        this.updatePeriodicallyRegionWeather($regionWeather, $isWeatherUpdates, timePeriod, params);
        return $regionWeather;
    }

    private updatePeriodicallyRegionWeather($regionWeather: Subject<List<City>>, $isWeatherUpdates: Subject<boolean>, timeToWait: number, params: URLSearchParams) {
        $isWeatherUpdates.next(true);

        this.http.get(commonConstants.owm.regionUrl, {search: params})
            .map((resp: Response) => List.of(...resp.json().list))
            .catch((error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                console.error(`Request Failed: ${error}`);
                return Observable.of(List.of(...mockWeatherResponse));
            })
            .subscribe(
                (regionWeather: List<City>) => {
                    $regionWeather.next(regionWeather);

                    setTimeout(() => {
                        this.updatePeriodicallyRegionWeather($regionWeather, $isWeatherUpdates, timeToWait, params);
                    }, timeToWait);
                },
                (err: Error) => {
                    $regionWeather.error(err);
                });
    }
}