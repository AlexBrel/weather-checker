import {Pipe, PipeTransform} from '@angular/core';
import {Observable} from 'rxjs';

import {City} from '../core/city';
import {Weather} from '../core/weather';
import {Store} from '@ngrx/store';
import {State} from '../../states/states';
import {List} from 'immutable';
import {LoadCityWeatherAction} from '../../actions/cities.actions';
import {getCachedCities, getCityWeather} from '../../reducers/cities.reducer';

@Pipe({name: 'weatherRequest', pure: true})
export class WeatherRequestPipe implements PipeTransform {
    cachedCitiesWeather: List<City>;
    $cityWeather: Observable<Weather>;

    constructor(private store: Store<State>) {
        store.select(getCachedCities)
            .subscribe((cachedCities: List<City>) => {
                this.cachedCitiesWeather = cachedCities;
            });

        this.$cityWeather = store.select(getCityWeather);
    }

    transform(cityName: string): Observable<Weather> {
        let foundCachedCity = this.cachedCitiesWeather.find(city => {
            return city.name === cityName;
        });

        if (foundCachedCity) {
            return Observable.of(foundCachedCity.main);
        } else {
            this.store.dispatch(new LoadCityWeatherAction(cityName));

            return this.$cityWeather;
        }
    }
}