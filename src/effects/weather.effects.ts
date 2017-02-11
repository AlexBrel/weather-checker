import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs';
import {OpenWeatherMapService} from '../app/shared/open-weather-map.service';
import {
    AddCityWeatherAction, AddCachedCityAction, CityActionTypes,
    AddYourCityWeatherAction
} from '../actions/cities.actions';
import {City} from '../app/core/city';
import {AddRegionWeatherAction, RegionActionTypes} from '../actions/region-weather.actions';

@Injectable()
export class WeatherEffects {
    constructor(private actions$: Actions, private owmService: OpenWeatherMapService) {
    }

    @Effect() loadCityWeather$ = this.actions$
        .ofType(CityActionTypes.LoadWeather)
        .map(action => action.payload)
        .switchMap(city => this.owmService.getCityWeatherByName(city))
        .mergeMap((city: City) => Observable.from([
            new AddCachedCityAction(city),
            new AddCityWeatherAction(city.main)
        ]));

    @Effect() loadYourCityWeather$ = this.actions$
        .ofType(CityActionTypes.LoadYourCityWeather)
        .map(action => action.payload)
        .switchMap(coords => this.owmService.getCityWeatherByCoords(coords)
            .map(cityWeather => (new AddYourCityWeatherAction(cityWeather)))
        );

    @Effect() loadRegionWeather$ = this.actions$
        .ofType(RegionActionTypes.LoadWeather)
        .switchMap(action => this.owmService.getRegionWeather(action.payload.coords, action.payload.citiesCount)
            .map(regionWeather => (new AddRegionWeatherAction(regionWeather)))
        );
}
