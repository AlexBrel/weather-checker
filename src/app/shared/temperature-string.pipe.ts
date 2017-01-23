import {Pipe, PipeTransform} from '@angular/core';

import {Weather} from '../common/weather';

@Pipe({name: 'temperatureString'})
export class TemperatureStringPipe implements PipeTransform {
    transform(weather: Weather): string {
        if (!weather) {
            return null;
        }
        let minSymbol = this.getSymbol(weather.temp_min);

        if (weather.temp_min === weather.temp_max) {
            return `near ${minSymbol}${weather.temp_min}`;
        } else {
            let maxSymbol = this.getSymbol(weather.temp_max);

            return `${minSymbol}${weather.temp_min}...${maxSymbol}${weather.temp_max}`;
        }
    }

    private getSymbol(temp: number): string {
        return (temp < 0) ? '' : '+';
    }
}