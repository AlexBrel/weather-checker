import {Weather} from './weather';
import {Wind} from './wind';
import {WeatherConditions} from './weather-conditions';

export class City {
    name: string;
    main: Weather;
    wind: Wind;
    weather: WeatherConditions[];
}