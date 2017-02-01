import {Action} from '@ngrx/store';
import {City} from '../app/core/city';
import {List, Map} from 'immutable';

export const RegionActionTypes = {
    AddWeather: '[Region] AddWeather',
    LoadWeather: '[Region] LoadWeather'
};

export class LoadRegionWeatherAction implements Action {
    type = RegionActionTypes.LoadWeather;

    constructor(public payload: Map<string, number>) {
    }
}

export class AddRegionWeatherAction implements Action {
    type = RegionActionTypes.AddWeather;

    constructor(public payload: List<City>) {
    }
}
