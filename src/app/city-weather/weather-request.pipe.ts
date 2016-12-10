import {Pipe, PipeTransform} from "@angular/core";
import {URLSearchParams, Http, Response} from "@angular/http";
import {Observable} from "rxjs";

import commonConstants from "../common/common-constants";
import City from "../common/city";
import mockCityWeatherResponse from "./mock-city-weather-response";
import Weather from "../common/weather";

@Pipe({name: 'weatherRequest', pure: true})
export class WeatherRequestPipe implements PipeTransform {
    cachedCitiesWeather: City[] = [];

    constructor(private http: Http) {}

    transform(cityName: string): Promise<Weather> {
        let foundCachedCity = this.cachedCitiesWeather.find(city => {
            return city.name === cityName
        });

        return new Promise((resolve, reject) => {
            if (foundCachedCity) {
                resolve(foundCachedCity.main);
            } else {
                this.getCityWeather(cityName).subscribe(
                    newCity => {
                        this.cachedCitiesWeather.push(newCity);
                        resolve(newCity.main)
                    },
                    (error) => {
                        let mockedCity: City = {name: cityName, main: mockCityWeatherResponse.main};

                        console.log(`Request Failed: ${error}`);
                        this.cachedCitiesWeather.push(mockedCity);
                        resolve(mockedCity.main);
                    }
                );
            }
        });
    }

    //TODO: move it in service in future
    private getCityWeather(cityName: string): Observable<City> {
        let params: URLSearchParams = new URLSearchParams();
        params.set('q', cityName);
        params.set('lang', commonConstants.owm.lang);
        params.set('units', commonConstants.owm.units);
        params.set('APPID', commonConstants.owm.apiID);

        //Http request-
        return this.http.get(commonConstants.owm.cityUrl, {search: params})
            .map((resp: Response) => resp.json() as City)
            .catch((error) => {
                return Observable.throw(error || 'Server error');
            })

    }
}