import {Map, List} from 'immutable';
import {Observable} from 'rxjs';
import {Http, URLSearchParams, Response, Headers, RequestOptions, Request, RequestMethod} from '@angular/http';
import {Injectable} from '@angular/core';

import {commonConstants} from '../core/common-constants';
import {City} from '../core/city';
import {mockWeatherResponse} from './mock-requests/weather-response.mock';
import {LoggerService} from '../core/logger/logger.service';

@Injectable()
export class OpenWeatherMapService {
    constructor(private http: Http, private logger: LoggerService) {
    }

    public getCityWeatherByName(cityName: string): Observable<City> {
        let params: URLSearchParams = new URLSearchParams(),
            request: Request,
            headers = new Headers({
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.8'
            });

        params.set('q', cityName);
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        request = new Request({
            url: commonConstants.owm.cityUrl,
            method: RequestMethod.Get,
            search: params,
            headers
        });

        return this.http.request(request)
            .map((resp: Response) => resp.json() as City)
            .catch(error => {
                this.logger.error(error);
                throw error;
            });
    }

    public getCityWeatherByCoords(coords: Map<string, number>): Observable<City> {
        let params: URLSearchParams = new URLSearchParams(),
            requestOptions: RequestOptions;

        params.set('lat', coords.get('lat').toString());
        params.set('lon', coords.get('long').toString());
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        requestOptions = new RequestOptions();
        requestOptions.search = params;
        requestOptions.url = commonConstants.owm.cityUrl;

        return this.http.request(commonConstants.owm.cityUrl, requestOptions)
            .map((resp: Response) => resp.json() as City)
            .catch(error => {
                this.logger.error(error);
                throw error;
            });
    }

    public getRegionWeather(coords: Map<string, number>, citiesCount: number): Observable<List<City>> {
        let request: Request,
            headers = new Headers({
                'Accept': 'application/json, text/plain, */*',
                'Accept-Language': 'en-US,en;q=0.8'
            });

        request = new Request({
            url: commonConstants.owm.regionUrl,
            method: RequestMethod.Get,
            search: this.createSearchParams(coords, citiesCount),
            headers
        });

        return this.http.request(request)
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