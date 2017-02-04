import {AddRegionWeatherAction, RegionActionTypes} from '../actions/region-weather.actions';
import {InitialRegionWeatherState, RegionWeatherState} from '../states/region-weather.state';
import {State} from '../states/states';
import {List} from 'immutable';
import {City} from '../app/core/city';

export function regionWeatherReducer(state = InitialRegionWeatherState, action: AddRegionWeatherAction): RegionWeatherState {
    switch (action.type) {
        case RegionActionTypes.AddWeather: {
            return state.set('regionWeather', action.payload);
        }
        default:
            return state;
    }
}

export const getRegionWeather = (state: State) => state.regionWeather.get('regionWeather') as List<City>;