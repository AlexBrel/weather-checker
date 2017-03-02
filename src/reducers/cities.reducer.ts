import {CitiesActions, CityActionTypes} from '../actions/cities.actions';
import {InitialCitiesState, CitiesState} from '../states/cities.state';
import {Weather} from '../app/core/weather';
import {List} from 'immutable';
import {City} from '../app/core/city';
import {State} from '../states/states';

export function citiesReducer(state = InitialCitiesState, action: CitiesActions): CitiesState {
    switch (action.type) {
        case CityActionTypes.Add: {
            return addCity(state, action.payload as string);
        }
        case CityActionTypes.Remove: {
            let cachedCities = state.get('cachedCities') as List<City>;

            state = state.set('cachedCities', cachedCities.filterNot(city => city.name === action.payload).toList());

            return removeCity(state, action.payload as string);
        }
        case CityActionTypes.AddWeather: {
            return state.set('cityWeather', action.payload as Weather);
        }
        case CityActionTypes.AddYourCityWeather: {
            return state.set('yourCityWeather', action.payload as City);
        }
        case CityActionTypes.AddCachedCity: {
            let cachedCities = state.get('cachedCities') as List<City>;

            return state.set('cachedCities', cachedCities.push(action.payload as City));
        }
        default:
            return state;
    }
}

export const getCities = (state: State) => state.cities.get('cities');
export const getCityWeather = (state: State) => state.cities.get('cityWeather') as Weather;
export const getYourCityWeather = (state: State) => state.cities.get('yourCityWeather') as City;
export const getCachedCities = (state: State) => state.cities.get('cachedCities') as List<City>;

function addCity(state: CitiesState, newCity: string): CitiesState {
    let cities = state.get('cities') as List<string>;

    return (cities.some(city => city === newCity))
        ? state
        : state.set('cities', cities.push(newCity));
}

function removeCity(state: CitiesState, removedCity: string): CitiesState {
    let cities = state.get('cities') as List<string>;

    return (cities.some(city => city === removedCity))
        ? state.set('cities', cities.filterNot(city => city === removedCity).toList())
        : state;
}