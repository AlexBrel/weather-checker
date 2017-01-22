import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

import {City} from '../common/city';
import {Weather} from '../common/weather';
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
            .catch(error => {
                console.error(`Request Failed: ${error}`);
                return Observable.throw(error);
            });

    }
}