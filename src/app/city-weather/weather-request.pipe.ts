import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

import {City} from '../core/city';
import {Weather} from '../core/weather';
import {OpenWeatherMapService} from '../shared/open-weather-map.service';

@Pipe({name: 'weatherRequest', pure: true})
export class WeatherRequestPipe implements PipeTransform {
    cachedCitiesWeather: City[] = [];

    constructor(private owmService: OpenWeatherMapService) {
    }

    transform(cityName: string): Observable<Weather> {
        let foundCachedCity = this.cachedCitiesWeather.find(city => {
            return city.name === cityName;
        });

        if (foundCachedCity) {
            return Observable.of(foundCachedCity.main);
        } else {
            return this.getCityWeather(cityName);
        }
    }

    private getCityWeather(cityName: string): Observable<Weather> {
        return this.owmService.getCityWeather(cityName)
            .map((newCity: City) => {
                this.cachedCitiesWeather.push(newCity);
                return newCity.main;
            })
            .catch((error: Error) => {
                console.error(`Request Failed: ${error}`);
                return Observable.throw(error);
            });

    }
}