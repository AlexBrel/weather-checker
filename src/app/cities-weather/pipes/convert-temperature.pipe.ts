import {Pipe, PipeTransform} from "@angular/core";

import Weather from "../weather"

@Pipe({name: 'convertTemperature'})
export class ConvertTemperaturePipe implements PipeTransform {
    transform(weather: Weather, unit: string): Weather {
        switch (unit) {
            case "°F":
                return {
                    temp_min: this.convertCelsiusToFahrenheit(weather.temp_min),
                    temp_max: this.convertCelsiusToFahrenheit(weather.temp_max),
                    temp: this.convertCelsiusToFahrenheit(weather.temp),
                    pressure: weather.pressure
                };
            case "K":
                return {
                    temp_min: this.convertCelsiusToKelvin(weather.temp_min),
                    temp_max: this.convertCelsiusToKelvin(weather.temp_max),
                    temp: this.convertCelsiusToKelvin(weather.temp),
                    pressure: weather.pressure
                };
            default:
                return weather;
        }

    }

    private convertCelsiusToFahrenheit(value: number): number {
        return value * 1.8 + 32;
    }

    private convertCelsiusToKelvin(value: number): number {
        return value + 273.15;
    }

}