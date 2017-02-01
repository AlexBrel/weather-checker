import {CitiesState} from './cities.state';
import {RegionWeatherState} from './region-weather.state';
import {GeoLocationState} from './geo-location.state';

export interface State {
    cities: CitiesState;
    regionWeather: RegionWeatherState;
    geoLocation: GeoLocationState;
}