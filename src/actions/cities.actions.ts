import {Action} from '@ngrx/store';
import {Map} from 'immutable';

import {Weather} from '../app/core/weather';
import {City} from '../app/core/city';

export const CityActionTypes = {
    AddCachedCity: '[City] AddCachedCity',
    RemoveCachedCity: '[City] RemoveCachedCity',
    Add: '[City] Add',
    Remove: '[City] Remove',
    AddWeather: '[City] AddWeather',
    LoadWeather: '[City] LoadWeather',
    AddYourCityWeather: '[City] AddYourCityWeather',
    LoadYourCityWeather: '[City] LoadYourCityWeather'
};

export class AddCityAction implements Action {
    type = CityActionTypes.Add;

    constructor(public payload: string) {
    }
}

export class RemoveCityAction implements Action {
    type = CityActionTypes.Remove;

    constructor(public payload: string) {
    }
}

export class LoadCityWeatherAction implements Action {
    type = CityActionTypes.LoadWeather;

    constructor(public payload: string) {
    }
}

export class AddCityWeatherAction implements Action {
    type = CityActionTypes.AddWeather;

    constructor(public payload: Weather) {
    }
}

export class LoadYourCityWeatherAction implements Action {
    type = CityActionTypes.LoadYourCityWeather;

    constructor(public payload: Map<string, number>) {
    }
}

export class AddYourCityWeatherAction implements Action {
    type = CityActionTypes.AddYourCityWeather;

    constructor(public payload: Weather) {
    }
}

export class AddCachedCityAction implements Action {
    type = CityActionTypes.AddCachedCity;

    constructor(public payload: City) {
    }
}

export class RemoveCachedCityAction implements Action {
    type = CityActionTypes.RemoveCachedCity;

    constructor(public payload: string) {
    }
}

export type CitiesActions = AddCityAction
    | RemoveCityAction
    | LoadCityWeatherAction
    | AddCityWeatherAction
    | AddCachedCityAction
    | RemoveCachedCityAction;
