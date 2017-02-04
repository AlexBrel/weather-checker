import {Map, List} from 'immutable';
import {Observable} from 'rxjs';
import {Http, URLSearchParams, Response} from '@angular/http';
import {Injectable} from '@angular/core';

import {commonConstants} from '../core/common-constants';
import {City} from '../core/city';
import {mockCityWeatherResponse} from './mock-requests/city-weather-response.mock';
import {mockWeatherResponse} from './mock-requests/weather-response.mock';
import {LoggerService} from '../core/logger/logger.service';

@Injectable()
export class OpenWeatherMapService {
    constructor(private http: Http, private logger: LoggerService) {
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
                this.logger.error(error);
                return Observable.of({name: cityName, main: mockCityWeatherResponse.main});
            });
    }

    public getRegionWeather(coords: Map<string, number>, citiesCount: number): Observable<List<City>> {
        return this.http.get(commonConstants.owm.regionUrl, {search: this.createSearchParams(coords, citiesCount)})
            .map((resp: Response) => List.of(...resp.json().list))
            .catch((error) => {
                // TODO: change the next line to commented reject as soon as endpoint work stable
                this.logger.error(error);
                return Observable.of(List.of(...mockWeatherResponse));
            });
    }

    private createSearchParams(coords: Map<string, number>, citiesCount: number): URLSearchParams {
        let params = new URLSearchParams();

        params.set('lat', coords.get('lat').toString());
        params.set('lon', coords.get('long').toString());
        params.set('cnt', citiesCount.toString());
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        return params;
    }
}