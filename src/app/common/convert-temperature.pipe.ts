import {Pipe, PipeTransform} from '@angular/core';

import Weather from './weather';
import temperatureUnit from './temperature-unit';

@Pipe({name: 'convertTemperature'})
export class ConvertTemperaturePipe implements PipeTransform {
    transform(weather: Weather, unit: string): Weather {
        let convertFunction: (value: number) => number;

        if (!weather) {
            return null;
        }

        switch (unit) {
            case temperatureUnit.Fahrenheit:
                convertFunction = this.convertCelsiusToFahrenheit;
                break;
            case temperatureUnit.Kelvin:
                convertFunction = this.convertCelsiusToKelvin;
                break;
            default:
                return weather;
        }

        return {
            temp_min: convertFunction(weather.temp_min),
            temp_max: convertFunction(weather.temp_max),
            temp: convertFunction(weather.temp),
            pressure: weather.pressure
        };
    }

    private convertCelsiusToFahrenheit(value: number): number {
        return value * 1.8 + 32;
    }

    private convertCelsiusToKelvin(value: number): number {
        return value + 273.15;
    }

}