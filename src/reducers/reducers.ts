import {ActionReducer, combineReducers, Action} from '@ngrx/store';
import {compose} from '@ngrx/core/compose';
import {storeFreeze} from 'ngrx-store-freeze';

import {State} from '../states/states';
import {citiesReducer} from './cities.reducer';
import {regionWeatherReducer} from './region-weather.reducer';
import {geoLocationReducer} from './geo-location.reducer';

const reducers = {
    cities: citiesReducer,
    regionWeather: regionWeatherReducer,
    geoLocation: geoLocationReducer
};

const devReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const prodReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: State, action: Action) {
    if (process.env.ENV === 'development') {
        return devReducer(state, action);
    } else {
        return prodReducer(state, action);
    }
}
