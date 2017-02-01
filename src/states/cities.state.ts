import {List, Map} from 'immutable';
import {Weather} from '../app/core/weather';
import {City} from '../app/core/city';

export type CitiesState = Map<string, List<string> | List<City> | Weather>;

export const InitialCitiesState: CitiesState = Map({
    cities: List.of(
        'Minsk',
        'Zhdanovichy',
        'Baravaya',
        'Navinki',
        'Serebryanka',
        'Ratamka',
        'Vostok',
        'Machulishchy',
        'Hatava',
        'Fanipol'),
    cityWeather: null,
    cachedCities: List<City>()
});
