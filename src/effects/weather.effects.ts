import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {OpenWeatherMapService} from '../app/shared/open-weather-map.service';
import {AddCityWeatherAction, AddCachedCityAction, CityActionTypes} from '../actions/cities.actions';
import {} from '../actions/action-types';
import {City} from '../app/core/city';
import {AddRegionWeatherAction, RegionActionTypes} from '../actions/region-weather.actions';

@Injectable()
export class WeatherEffects {
    constructor(private actions$: Actions, private owmService: OpenWeatherMapService) {
    }

    @Effect() loadCityWeather$ = this.actions$
        .ofType(CityActionTypes.LoadWeather)
        .map(action => action.payload)
        .switchMap(city => this.owmService.getCityWeather(city))
        .mergeMap((city: City) => Observable.from([
            new AddCachedCityAction(city),
            new AddCityWeatherAction(city.main)
        ]));

    @Effect() loadRegionWeather$ = this.actions$
        .ofType(RegionActionTypes.LoadWeather)
        .map(action => action.payload)
        .switchMap(coords => this.owmService.getRegionWeather(coords)
            .map(regionWeather => (new AddRegionWeatherAction(regionWeather)))
        );
}
