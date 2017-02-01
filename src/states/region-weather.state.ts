import {City} from '../app/core/city';
import {List, Map} from 'immutable';

export type RegionWeatherState = Map<string, List<City>>;

export const InitialRegionWeatherState: RegionWeatherState = Map({
    regionWeather: List<City>()
});
