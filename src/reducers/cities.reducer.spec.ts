import {Map, List} from 'immutable';

import {citiesReducer} from './cities.reducer';
import {
    CitiesActions, AddCityAction, RemoveCityAction,
    AddCityWeatherAction, AddYourCityWeatherAction, AddCachedCityAction
} from '../actions/cities.actions';
import {InitialCitiesState, CitiesState} from '../states/cities.state';
import {Weather} from '../app/core/weather';
import {City} from '../app/core/city';

describe('Cities Reducer Unit Tests', () => {
    let testInitialState: CitiesState,
        testCityName: string,
        testCachedCity: City;

    beforeEach(() => {
        testCityName = 'TestCity';
        testCachedCity = {
            name: testCityName,
            main: {pressure: 1000},
            wind: {speed: 10, deg: 5},
            weather: [{icon: 'testIcon', main: 'test'}]
        };
        testInitialState = Map({
            cities: List.of(
                'Minsk',
                'Zhdanovichy'),
            cityWeather: null,
            yourCityWeather: null,
            cachedCities: List<City>()
        });
    });

    it('should add city', () => {
        let addCityAction = new AddCityAction(testCityName),
            newState = citiesReducer(testInitialState, addCityAction),
            citiesState = newState.get('cities') as List<string>;

        expect(citiesState.size).toBe(3);
        expect(citiesState.last()).toBe(testCityName);
    });

    it('should remove city', () => {
        let addCachedCityAction = new AddCachedCityAction(testCachedCity),
            removeCityAction = new RemoveCityAction('Minsk'),
            newState = citiesReducer(testInitialState, addCachedCityAction),
            citiesState: List<string>,
            cachedCities: List<City>;

        newState = citiesReducer(testInitialState, removeCityAction);

        citiesState = newState.get('cities') as List<string>;
        cachedCities = newState.get('cachedCities') as List<City>;

        expect(citiesState.size).toBe(1);
        expect(citiesState.first()).toBe('Zhdanovichy');
        expect(cachedCities).toBeDefined();
        expect(cachedCities.size).toBe(0);
    });

    it('should add weather', () => {
        let newWeather = {temp: 10, pressure: 1000},
            addCityWeatherAction = new AddCityWeatherAction(newWeather),
            newState = citiesReducer(testInitialState, addCityWeatherAction),
            cityWeather = newState.get('cityWeather') as Weather;

        expect(cityWeather).toBeDefined();
        expect(cityWeather).toBe(newWeather);
    });

    it('should add your city weather', () => {
        let newCityWeather = {pressure: 1000},
            yourCityWeatherAction = new AddYourCityWeatherAction(newCityWeather),
            newState = citiesReducer(testInitialState, yourCityWeatherAction),
            yourCityWeather = newState.get('yourCityWeather') as Weather;

        expect(yourCityWeather).toBeDefined();
        expect(yourCityWeather).toBe(newCityWeather);
    });

    it('should add cached city', () => {
        let cachedCityAction = new AddCachedCityAction(testCachedCity),
            newState = citiesReducer(testInitialState, cachedCityAction),
            cachedCities = newState.get('cachedCities') as List<City>;

        expect(cachedCities).toBeDefined();
        expect(cachedCities.last()).toBe(testCachedCity);
    });

    it('should return the default initial state', () => {
        let initialState = citiesReducer(undefined, ({type: 'nonexistent type'} as CitiesActions));
        expect(initialState).toBeDefined();
        expect(initialState).toBe(InitialCitiesState);
    });
});
